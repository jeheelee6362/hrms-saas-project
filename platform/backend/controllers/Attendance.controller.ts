// controllers/Attendance.controller.ts
// * Controller orders as: viewmany => viewall => viewpag => create => update
// * Using snake_case as controller naming convention
// * controller names begin with "action_"

import { Request } from 'express'
import { getErrorMessage } from '../middleware'
import { IDdocPagination,IDocURL,IDocsURL,IAttendance,IDBURL } from '../models'
import getUUIDv5 from '../utils/uuid'
//
import AttendanceService from '../services/Attendance.service'
import DocService from '../services/Doc.Service'
const DocServiceInstance = new DocService.DocService()
const AttendanceServiceInstance = new AttendanceService.AttendanceService()
// 
/** 
 * * ---------------------------------------- viewmany ----------------------------------------
 */
const action_viewmany_attendance = async (req:Request) => { 
  try {
    const dt = {
      dbName: req.params.dbname,
      docs: req.query.docs,
      view: "fetch_all"
    } as IDocsURL
    const res = await AttendanceServiceInstance.viewMany(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
/** 
 * * ---------------------------------------- viewall ----------------------------------------
 */
const action_viewall_attendance = async (req:Request) => { 
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "fetch_all"
    } as IDBURL
    const attendanceRes = await AttendanceServiceInstance.viewAll(dt)

    const attendanceByEmployee: { [key: string]: any[] } = {};

    attendanceRes.body.rows.forEach((row: { key: string, value: any }) => {
      const employeeId = row.value.attendee;
      if (!attendanceByEmployee[employeeId]) {
          attendanceByEmployee[employeeId] = [];
      } 
      const attendanceStatus = row.value.clockLog.length === 0 ? false : true;
      attendanceByEmployee[employeeId].push({
        date: row.value.date,
        status: attendanceStatus
      });
  });

    const attendancePromises = Object.keys(attendanceByEmployee).map(async (employeeId) => {
    const dtEmployee = { dbName: req.params.dbname, docId: employeeId } as IDocURL;
    const employeeDetails = await DocServiceInstance.view(dtEmployee);
    
      return {
          attendee: employeeDetails.body.givenName + " " + employeeDetails.body.surname,
          attendance: attendanceByEmployee[employeeId]
      };
  });
  const rows = await Promise.all(attendancePromises);

  const res = {
      success: true,
      body: {
          rows
      }
  };
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewall_timesheet = async (req: Request) => {
  try {
      const dt = {
          dbName: req.params.dbname,
          view: "by_attendee_time"
      } as IDBURL;
      const attendanceRes = await AttendanceServiceInstance.viewAll(dt);

      const hoursByEmployee: { [key: string]: number } = {};

      // Aggregate total hours for each employee
      attendanceRes.body.rows.forEach((row: { key: string, value: number }) => {
          const employeeId = row.key[0];
          if (!hoursByEmployee[employeeId]) {
              hoursByEmployee[employeeId] = 0;
          }
          hoursByEmployee[employeeId] += row.value;
      });

      const calculateMonthlyAssignedHours = (shift: any): number => {
          if (shift.shiftType === "regular") {
              const [start, end] = shift.schedule.map((time: string) => {
                  const [hours, minutes] = time.split(':').map(Number);
                  return hours + minutes / 60;
              });

              const dailyWorkHours = end - start;

              const totalBreakHours = shift.break.reduce((total: number, [breakStart, breakEnd]: [string, string]) => {
                  if (breakStart && breakEnd) {
                      const [breakStartHours, breakStartMinutes] = breakStart.split(':').map(Number);
                      const [breakEndHours, breakEndMinutes] = breakEnd.split(':').map(Number);
                      const breakStartTotal = breakStartHours + breakStartMinutes / 60;
                      const breakEndTotal = breakEndHours + breakEndMinutes / 60;
                      return total + (breakEndTotal - breakStartTotal);
                  }
                  return total;
              }, 0);

              const netDailyHours = dailyWorkHours - totalBreakHours;
              const weeklyHours = netDailyHours * shift.appliedDays.length;
              return weeklyHours * 4; // Monthly hours
          } else if (shift.shiftType === "flexible") {
              const assignedHours = Number(shift.assignedHours);
              switch (shift.assignedHoursPeriod.toLowerCase()) {
                  case "weekly":
                      return assignedHours * 4;
                  case "biweekly":
                  case "semi-monthly":
                      return assignedHours * 2;
                  case "monthly":
                      return assignedHours;
                  default:
                      return 0;
              }
          }
          return 0;
      };

      let totalAssignedHours = 0;
      let totalHoursWorked = 0;
      let totalMissingHours = 0;

      const employeePromises = Object.keys(hoursByEmployee).map(async (employeeId) => {
          const dtEmployee = { dbName: req.params.dbname, docId: employeeId } as IDocURL;
          const employeeDetails = await DocServiceInstance.view(dtEmployee);

          const dtDesignation = { dbName: req.params.dbname, docId: employeeDetails.body.designation } as IDocURL;
          const dtDepartment = { dbName: req.params.dbname, docId: employeeDetails.body.department } as IDocURL;
          const dtShift = { dbName: req.params.dbname, docId: employeeDetails.body.shift } as IDocURL;

          const designationDetails = await DocServiceInstance.view(dtDesignation);
          const departmentDetails = await DocServiceInstance.view(dtDepartment);
          const shiftDetails = await DocServiceInstance.view(dtShift);

          const assignedHoursInMonth = calculateMonthlyAssignedHours(shiftDetails.body);
          totalAssignedHours += assignedHoursInMonth;
          const totalHours = hoursByEmployee[employeeId];
          totalHoursWorked += totalHours;

          const missingHours = Math.max(0, assignedHoursInMonth - totalHours);
          totalMissingHours += missingHours;

          return {
              givenName: employeeDetails.body.givenName,
              surname: employeeDetails.body.surname,
              designation: designationDetails.body.name,
              shift: shiftDetails.body.name,
              department: departmentDetails.body.name,
              totalHours,
              assignedHoursInMonth,
              missingHours
          };
      });

      const rows = await Promise.all(employeePromises);

      const res = {
          success: true,
          body: {
              title: {
                  totalAssignedHours,
                  totalHoursWorked,
                  totalMissingHours
              },
              rows
          }
      };

      return res;
  } catch (err) {
      return getErrorMessage(err);
  }
};
/** 
 * * ---------------------------------------- create ----------------------------------------
 */
const action_create_attendance = async (req:Request) => {
  try {
    const dt1 = {
      dbName: req.params.dbname,
      docId: getUUIDv5.static("attendance"+req.body.attendanceId),
    } as IDocURL
    const dt2 = {
      docType: "attendance",
      attendanceId: req.body.attendanceId,
      attendee: req.body.attendee,
      date: req.body.date,
      clockLog: req.body.clockLog
    } as IAttendance
    const res = await AttendanceServiceInstance.store(dt1,dt2)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
/** 
 * * ---------------------------------------- update ----------------------------------------
 */
const action_update_attendance = async (req:Request) => { 
  try {
    const dt1 = {
      dbName: req.params.dbname,
      docId: req.params.docid,
    } as IDocURL
    const _res = await DocServiceInstance.view(dt1)
    const dt2 = {
      _rev: _res.body._rev,
      docType: "attendance",
      attendanceId: req.body.attendanceId,
      attendee: req.body.attendee,
      date: req.body.date,
      clockLog: req.body.clockLog
    } as IAttendance
    const res = await AttendanceServiceInstance.store(dt1,dt2)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
//
export {
  action_viewmany_attendance,
  action_viewall_attendance,
  action_viewall_timesheet,
  action_create_attendance,
  action_update_attendance,
}