// controllers/Employer.controller.ts
// * Controller orders as: viewmany => viewall => viewpag => create => update
// * Using snake_case as controller naming convention
// * controller names begin with "action_"

import { Request } from 'express'
import { getErrorMessage } from '../middleware'
import { IDBURL,IDdocPagination,IDocURL,IDocsURL,IEmployee } from '../models'
import getUUIDv5 from '../utils/uuid'
//
import EmployeeService from '../services/Employee.service'
import DocService from '../services/Doc.Service'
const DocServiceInstance = new DocService.DocService()
const EmployeeServiceInstance = new EmployeeService.EmployeeService()
//
// view many
const action_viewmany_employee = async (req:Request) => {
  try {
    const dt = {
      dbName: req.params.dbname,
      docs: req.query.docs,
      view: "fetch_all"
    } as IDocsURL
    const res = await EmployeeServiceInstance.viewMany(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewmany_employee_by_name = async (req:Request) => {
  try {
    const dt = {
      dbName: req.params.dbname,
      docs: req.query.docs,
      view: "by_name"
    } as IDocsURL
    const res = await EmployeeServiceInstance.viewMany(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewmany_employee_by_name_joindate_designation = async (req:Request) => {
  try {
    const dt = {
      dbName: req.params.dbname,
      docs: req.query.docs,
      view: "by_name_joindate_designation"
    } as IDocsURL
    const res = await EmployeeServiceInstance.viewMany(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewmany_employee_for_table_row = async (req:Request) => {
  try {
    const dt = {
      dbName: req.params.dbname,
      docs: req.query.docs,
      view: "for_table_row"
    } as IDocsURL
    const res = await EmployeeServiceInstance.viewMany(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
//
// view all
const action_viewall_employee = async (req:Request) => {
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "fetch_all"
    } as IDBURL
    const res = await EmployeeServiceInstance.viewAll(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewall_employee_by_name = async (req:Request) => {
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "by_name"
    } as IDBURL
    const res = await EmployeeServiceInstance.viewAll(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewall_employee_by_name_joindate_designation = async (req:Request) => {
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "by_name_joindate_designation"
    } as IDBURL
    const res = await EmployeeServiceInstance.viewAll(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewall_employee_for_table_row = async (req:Request) => {
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "for_table_row"
    } as IDBURL
    const res = await EmployeeServiceInstance.viewAll(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
//
// viewpag
const action_viewpag_employee = async (req:Request) => {
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "fetch_all",
      startKey: req.query.startkey,
      limit: Number(req.query.limit)
    } as IDdocPagination
    const res = await EmployeeServiceInstance.viewPag(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewpag_employee_by_name = async (req:Request) => {
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "by_name",
      startKey: req.query.startkey,
      limit: Number(req.query.limit)
    } as IDdocPagination
    const res = await EmployeeServiceInstance.viewPag(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewpag_employee_by_name_joindate_designation = async (req:Request) => {
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "by_name_joindate_designation",
      startKey: req.query.startkey,
      limit: Number(req.query.limit)
    } as IDdocPagination
    const res = await EmployeeServiceInstance.viewPag(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewpag_employee_for_table_row = async (req:Request) => {
  const [idFilter, nameFilter, contactFilter, designationFilter] = JSON.parse(req.query.startkey! as string);
  try {
    const dt = { 
      dbName: req.params.dbname,
      startKey: [idFilter,nameFilter,contactFilter,designationFilter],
    } as IDdocPagination
    const res = await EmployeeServiceInstance.viewPag(dt)

    const employeeRows = await Promise.all(res.body.map(async (employee: any) => {
      const dtDesignation = { dbName: req.params.dbname, docId: employee.designation } as IDocURL;
      const dtDepartment = { dbName: req.params.dbname, docId: employee.department } as IDocURL;

      const resDesignation = await DocServiceInstance.view(dtDesignation);
      const resDepartment = await DocServiceInstance.view(dtDepartment);

      return {
        id: employee._id,
        key: employee._id,
        value: {
          employeeId: employee.employeeId,
          givenName: employee.givenName,
          middleName: employee.middleName,
          surname: employee.surname,
          joinDate: employee.joinDate,
          designation: resDesignation.body.name,
          department: resDepartment.body.name,
          emailAddress: employee.emailAddress,
          mobileNumber: employee.mobileNumber
        }
      };
    }));

    return {
      success: true,
      body: {
        total_rows: employeeRows.length,
        offset: 0,
        rows: employeeRows
      }
    };
  } catch (err) {
    return getErrorMessage(err)
  }
}
//
// create
const action_create_employee = async (req:Request) => {
  try {
    const dt1 = {
      dbName: req.params.dbname,
      docId: getUUIDv5.static("employee"+req.body.employeeId),
    } as IDocURL
    const dt2 = {
      docType: "employee",
      employeeId: req.body.employeeId,
      givenName: req.body.givenName,
      middleName: req.body.middleName,
      surname: req.body.surname,
      chineseName: req.body.chineseName,
      suffix: req.body.suffix,
  
      employeePayType: req.body.employeePayType,
      amountPerPayCycle: req.body.amountPerPayCycle,
      payPeriod: req.body.payPeriod,
      joinDate: req.body.joinDate,
      endDate: req.body.endDate,
      shift: req.body.shift,
      designation: req.body.designation,
      department: req.body.department,
  
      hkidCardNumber: req.body.hkidCardNumber,
      passportNumber: req.body.passportNumber,
      passportPlaceOfIssue: req.body.passportPlaceOfIssue,
      emailAddress: req.body.emailAddress,
      mobileNumber: req.body.mobileNumber,
      birthDate: req.body.birthDate,
      residentialAddress: req.body.residentialAddress,
      postalAddress: req.body.postalAddress,
      marritalStatus: {
              isMarried: req.body.marritalStatus.isMarried,
              spouseFullName: req.body.marritalStatus.spouseFullName,
              identityNumber: req.body.marritalStatus.identityNumber,
              passportPlaceOfIssue: req.body.marritalStatus.passportPlaceOfIssue,
          },
      emergencyContacts: {
              primary: req.body.emergencyContacts.primary,
              secondary: req.body.emergencyContacts.secondary
          },
      educationRecord: req.body.educationRecord,
      experienceRecord: req.body.experienceRecord,
      payment: {
              method: req.body.payment.method,
              bankName: req.body.payment.bankName,
              bankCode: req.body.payment.bankCode,
              bankAccountNumber: req.body.payment.bankAccountNumber,
              swiftCode: req.body.payment.swiftCode
          }
    } as IEmployee
    const res = await EmployeeServiceInstance.store(dt1,dt2)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
//
// update
const action_update_employee = async (req:Request) => {
  try {
    const dt1 = {
      dbName: req.params.dbname,
      docId: req.params.docid,
    } as IDocURL
    const _res = await DocServiceInstance.view(dt1)
    const dt2 = {
      _rev: _res.body._rev,
      docType: "employee",
      employeeId: req.body.employeeId,
      givenName: req.body.givenName,
      middleName: req.body.middleName,
      surname: req.body.surname,
      chineseName: req.body.chineseName,
      suffix: req.body.suffix,
  
      employeePayType: req.body.employeePayType,
      amountPerPayCycle: req.body.amountPerPayCycle,
      payPeriod: req.body.payPeriod,
      joinDate: req.body.joinDate,
      endDate: req.body.endDate,
      shift: req.body.shift,
      designation: req.body.designation,
      department: req.body.department,
  
      hkidCardNumber: req.body.hkidCardNumber,
      passportNumber: req.body.passportNumber,
      passportPlaceOfIssue: req.body.passportPlaceOfIssue,
      emailAddress: req.body.emailAddress,
      mobileNumber: req.body.mobileNumber,
      birthDate: req.body.birthDate,
      residentialAddress: req.body.residentialAddress,
      postalAddress: req.body.postalAddress,
      marritalStatus: {
              isMarried: req.body.marritalStatus.isMarried,
              spouseFullName: req.body.marritalStatus.spouseFullName,
              identityNumber: req.body.marritalStatus.identityNumber,
              passportPlaceOfIssue: req.body.marritalStatus.passportPlaceOfIssue,
          },
      emergencyContacts: {
              primary: req.body.emergencyContacts.primary,
              secondary: req.body.emergencyContacts.secondary
          },
      educationRecord: req.body.educationRecord,
      experienceRecord: req.body.experienceRecord,
      payment: {
              method: req.body.payment.method,
              bankName: req.body.payment.bankName,
              bankCode: req.body.payment.bankCode,
              bankAccountNumber: req.body.payment.bankAccountNumber,
              swiftCode: req.body.payment.swiftCode
          }
    } as IEmployee
    const res = await EmployeeServiceInstance.store(dt1,dt2)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
//
export {
  action_viewmany_employee,
  action_viewmany_employee_by_name,
  action_viewmany_employee_by_name_joindate_designation,
  action_viewmany_employee_for_table_row,
  //
  action_viewall_employee,
  action_viewall_employee_by_name,
  action_viewall_employee_by_name_joindate_designation,
  action_viewall_employee_for_table_row,
  //
  action_viewpag_employee,
  action_viewpag_employee_by_name,
  action_viewpag_employee_by_name_joindate_designation,
  action_viewpag_employee_for_table_row,
  //
  action_create_employee,
  action_update_employee
}