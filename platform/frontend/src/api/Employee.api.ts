// api/Employee.api.ts
// * API orders as: get => getMany => getAll => getPag => create => update => remove
// * Using camelCase as api methods naming convention

import HttpService from "./template";
import { APIModel,DocModel,EmployeeModel } from '../models';

const http = new HttpService();
//
/** 
 * * ---------------------------------------- get ----------------------------------------
 */
const getEmployee = async (params:DocModel.IDocURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/employees/${params.dbname}/${params.docid}`);
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
const getManyEmployee = async (params:DocModel.IDocsURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/employees/${params.dbname}`,
  {
    docs: params.docs
  });
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e); 
  }
}
const getManyEmployeeByName = async (params:DocModel.IDocsURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/employees/${params.dbname}/view/by-name`,
  {
    docs: params.docs
  });
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e); 
  }
}
const getManyEmployeeByNameJoindateDesignation = async (params:DocModel.IDocsURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/employees/${params.dbname}/view/by-name-joindate-designation`,
  {
    docs: params.docs
  });
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e); 
  }
}
const getManyEmployeeForTableRow = async (params:DocModel.IDocsURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/employees/${params.dbname}/view/for-table-row`,
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
const getAllEmployee = async (params:DocModel.IDBURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/employees/${params.dbname}`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const getAllEmployeeByName = async (params:DocModel.IDBURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/employees/${params.dbname}/view/by-name`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const getAllEmployeeByNameJoindateDesignation = async (params:DocModel.IDBURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/employees/${params.dbname}/view/by-name-joindate-designation`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const getAllEmployeeForTableRow = async (params:DocModel.IDBURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/employees/${params.dbname}/view/for-table-row`);
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
const getPagEmployee = async (params:DocModel.IDdocPagination) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/employees/${params.dbname}`,
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
const getPagEmployeeByName = async (params:DocModel.IDdocPagination) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/employees/${params.dbname}/view/by-name`,
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
const getPagEmployeeByNameJoindateDesignation = async (params:DocModel.IDdocPagination) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/employees/${params.dbname}/view/by-name-joindate-designation`,
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
const getPagEmployeeForTableRow = async (params:DocModel.IDdocPagination) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/employees/${params.dbname}/view/for-table-row`,
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
const createEmployee = async (params1:DocModel.IDBURL,params2:EmployeeModel.IEmployee) => {
  try {
    const res = await http.service().push<APIModel.IParams[],EmployeeModel.IEmployee>(http.getBaseURL()+`/api/v1/employees/${params1.dbname}`,
    {     
      employeeId: params2.employeeId,     
      givenName: params2.givenName,
      middleName: params2.middleName,
      surname: params2.surname,
      chineseName: params2.chineseName,
      suffix: params2.suffix,
  
      employeePayType: params2.employeePayType,
      amountPerPayCycle: params2.amountPerPayCycle,
      payPeriod: params2.payPeriod,
      joinDate: params2.joinDate,
      endDate: params2.endDate,
      shift: params2.shift,
      designation: params2.designation,
      department: params2.department,
  
      hkidCardNumber: params2.hkidCardNumber,
      passportNumber: params2.passportNumber,
      passportPlaceOfIssue: params2.passportPlaceOfIssue,
      emailAddress: params2.emailAddress,
      mobileNumber: params2.mobileNumber,
      birthDate: params2.birthDate,
      residentialAddress: params2.residentialAddress,
      postalAddress: params2.postalAddress,
      marritalStatus: {
              isMarried: params2.marritalStatus.isMarried,
              spouseFullName: params2.marritalStatus.spouseFullName,
              identityNumber: params2.marritalStatus.identityNumber,
              passportPlaceOfIssue: params2.marritalStatus.passportPlaceOfIssue
          },
          emergencyContacts: {
            primary: params2.emergencyContacts.primary,
            secondary: params2.emergencyContacts.secondary
        },
    educationRecord: params2.educationRecord,
    experienceRecord: params2.experienceRecord,
      payment: {
              method: params2.payment.method,
              bankName: params2.payment.bankName,
              bankCode: params2.payment.bankCode,
              bankAccountNumber: params2.payment.bankAccountNumber,
              swiftCode: params2.payment.swiftCode
          }
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
const updateEmployee = async (params1:DocModel.IDocURL,params2:EmployeeModel.IEmployee) => {
  try {
    const res = await http.service().update<APIModel.IParams[],EmployeeModel.IEmployee>(http.getBaseURL()+`/api/v1/employees/${params1.dbname}/${params1.docid}`,
    {               
      employeeId: params2.employeeId,     
      givenName: params2.givenName,
      middleName: params2.middleName,
      surname: params2.surname,
      chineseName: params2.chineseName,
      suffix: params2.suffix,
  
      employeePayType: params2.employeePayType,
      amountPerPayCycle: params2.amountPerPayCycle,
      payPeriod: params2.payPeriod,
      joinDate: params2.joinDate,
      endDate: params2.endDate,
      shift: params2.shift,
      designation: params2.designation,
      department: params2.department,
  
      hkidCardNumber: params2.hkidCardNumber,
      passportNumber: params2.passportNumber,
      passportPlaceOfIssue: params2.passportPlaceOfIssue,
      emailAddress: params2.emailAddress,
      mobileNumber: params2.mobileNumber,
      birthDate: params2.birthDate,
      residentialAddress: params2.residentialAddress,
      postalAddress: params2.postalAddress,
      marritalStatus: {
              isMarried: params2.marritalStatus.isMarried,
              spouseFullName: params2.marritalStatus.spouseFullName,
              identityNumber: params2.marritalStatus.identityNumber,
              passportPlaceOfIssue: params2.marritalStatus.passportPlaceOfIssue
          },
          emergencyContacts: {
            primary: params2.emergencyContacts.primary,
            secondary: params2.emergencyContacts.secondary
        },
    educationRecord: params2.educationRecord,
    experienceRecord: params2.experienceRecord,
      payment: {
              method: params2.payment.method,
              bankName: params2.payment.bankName,
              bankCode: params2.payment.bankCode,
              bankAccountNumber: params2.payment.bankAccountNumber,
              swiftCode: params2.payment.swiftCode
          }
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
const removeEmployee = async (params:DocModel.IDocURL) => {
  try {
    const res = await http.service().remove<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/employees/${params.dbname}/${params.docid}`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
//
export default {
  getEmployee,
  getManyEmployee,
  getManyEmployeeByName,
  getManyEmployeeByNameJoindateDesignation,
  getManyEmployeeForTableRow,
  getAllEmployee,
  getAllEmployeeByName,
  getAllEmployeeByNameJoindateDesignation,
  getAllEmployeeForTableRow,
  getPagEmployee,
  getPagEmployeeByName,
  getPagEmployeeByNameJoindateDesignation,
  getPagEmployeeForTableRow,
  createEmployee,
  updateEmployee,
  removeEmployee
} 