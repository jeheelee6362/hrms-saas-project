// api/Attendance.api.ts
// * API orders as: get => getMany => getAll => getPag => create => update => remove
// * Using camelCase as api methods naming convention

import HttpService from "./template";
import { APIModel,DocModel,AttendanceModel } from '../models';

const http = new HttpService();
//
/** 
 * * ---------------------------------------- get ----------------------------------------
 */
const getEmployeeAttendance = async (params:DocModel.IDocURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/attendances/${params.dbname}/${params.docid}`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
//
/** 
 * * ---------------------------------------- getMany ----------------------------------------
 * @description Get many queried results of the type.
 */
const getManyEmployeeAttendance = async (params:DocModel.IDocsURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/attendances/${params.dbname}`,
  {
    docs: params.docs
  });
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e); 
  }
}
//
/** 
 * * ---------------------------------------- getAll ----------------------------------------
 * @description Get all results of the type.
 */
const getAllEmployeeAttendance = async (params:DocModel.IDBURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/attendances/${params.dbname}`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const getAllEmployeeAttendanceByTimesheet = async (params:DocModel.IDBURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/attendances/${params.dbname}/view/by-timesheet`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
//
/** 
 * * ---------------------------------------- getPag ----------------------------------------
 * @description Get paginated results of the type.
 */ 
const getPagEmployeeAttendance = async (params:DocModel.IDdocPagination) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/attendances/${params.dbname}`,
    {
      startkey: params.startkey,
        limit: params.limit
    });
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
//
/** 
 * * ---------------------------------------- create ----------------------------------------
 */
const createEmployeeAttendance = async (params1:DocModel.IDBURL,params2:AttendanceModel.IAttendance) => {
  try {
    const res = await http.service().push<APIModel.IParams[],AttendanceModel.IAttendance>(http.getBaseURL()+`/api/v1/attendances/${params1.dbname}`,
    {     
      attendanceId: params2.attendanceId,
      attendee: params2.attendee,
      date: params2.date,
      clockLog: params2.clockLog
    });
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
//
/** 
 * * ---------------------------------------- update ----------------------------------------
 */
const updateEmployeeAttendance = async (params1:DocModel.IDocURL,params2:AttendanceModel.IAttendance) => {
  try {
    const res = await http.service().update<APIModel.IParams[],AttendanceModel.IAttendance>(http.getBaseURL()+`/api/v1/attendances/${params1.dbname}/${params1.docid}`,
    {               
      attendanceId: params2.attendanceId,
      attendee: params2.attendee,
      date: params2.date,
      clockLog: params2.clockLog
    });
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
//
/** 
 * * ---------------------------------------- remove ----------------------------------------
 */
const removeEmployeeAttendance = async (params:DocModel.IDocURL) => {
  try {
    const res = await http.service().remove<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/attendances/${params.dbname}/${params.docid}`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
//
export default {
  getEmployeeAttendance,
  getManyEmployeeAttendance,
  getAllEmployeeAttendance,
  getAllEmployeeAttendanceByTimesheet,
  getPagEmployeeAttendance,
  createEmployeeAttendance,
  updateEmployeeAttendance,
  removeEmployeeAttendance
} 