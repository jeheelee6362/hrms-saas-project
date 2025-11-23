// api/Leave.api.ts
// * API orders as: get => getMany => getAll => getPag => create => update => remove
// * Using camelCase as api methods naming convention

import HttpService from "./template";
import { APIModel,DocModel,LeaveModel } from '../models';

const http = new HttpService();
//
/** 
 * * ---------------------------------------- get ----------------------------------------
 */
const getLeaveRequest = async (params:DocModel.IDocURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/leaves/leave-requests/${params.dbname}/${params.docid}`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const getLeavePolicy = async (params:DocModel.IDocURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/leaves/leave-policies/${params.dbname}/${params.docid}`);
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
const getManyLeaveRequest = async (params:DocModel.IDocsURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/leaves/leave-requests/${params.dbname}`,
  {
    docs: params.docs
  });
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e); 
  }
}
const getManyLeavePolicy = async (params:DocModel.IDocsURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/leaves/leave-policies/${params.dbname}`,
  {
    docs: params.docs
  });
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const getManyLeavePolicyByName = async (params:DocModel.IDocsURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/leaves/leave-policies/${params.dbname}/view/by-name`,
  {
    docs: params.docs
  });
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const getManyLeavePolicyByDetailsEntitlement = async (params:DocModel.IDocsURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/leaves/leave-policies/${params.dbname}/view/by-details-entitlement`,
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
const getAllLeaveRequest = async (params:DocModel.IDBURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/leaves/leave-requests/${params.dbname}`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const getAllLeavePolicy = async (params:DocModel.IDBURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/leaves/leave-policies/${params.dbname}`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const getAllLeavePolicyByName = async (params:DocModel.IDBURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/leaves/leave-policies/${params.dbname}/view/by-name`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const getAllLeavePolicyByDetailsEntitlement = async (params:DocModel.IDBURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/leaves/leave-policies/${params.dbname}/view/by-details-entitlement`);
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
const getPagLeaveRequest = async (params:DocModel.IDdocPagination) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/leaves/leave-requests/${params.dbname}`,
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
const getPagLeavePolicy = async (params:DocModel.IDdocPagination) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/leaves/leave-policies/${params.dbname}`,
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
const getPagLeavePolicyByName = async (params:DocModel.IDdocPagination) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/leaves/leave-policies/${params.dbname}/view/by-name`,
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
const getPagLeavePolicyByDetailsEntitlement = async (params:DocModel.IDdocPagination) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/leaves/leave-policies/${params.dbname}/view/by-details-entitlement`,
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
const createLeaveRequest = async (params1:DocModel.IDBURL,params2:LeaveModel.ILeaveRequest) => {
  try {
    const res = await http.service().push<APIModel.IParams[],LeaveModel.ILeaveRequest>(http.getBaseURL()+`/api/v1/leaves/leave-requests/${params1.dbname}`,
    {     
      requestId: params2.requestId,
      leavePolicy: params2.leavePolicy,
      assignee: params2.assignee,
      leaveSchedule: params2.leaveSchedule,
      reason: params2.reason,
      status: params2.status,
      attachment: params2.attachment
    });
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const createLeavePolicy = async (params1:DocModel.IDBURL,params2:LeaveModel.ILeavePolicy) => {
  try {
    const res = await http.service().push<APIModel.IParams[],LeaveModel.ILeavePolicy>(http.getBaseURL()+`/api/v1/leaves/leave-policies/${params1.dbname}`,
  {
    policyId: params2.policyId,
    name: params2.name,
    isPaid: params2.isPaid,
    isAuto: params2.isAuto,
    unit: params2.unit,
    validPeriod: params2.validPeriod,
    entitlements: params2.entitlements,
    applyProfile: params2.applyProfile,
    exemptProfile: params2.exemptProfile,
    ruleExceedBalance: {
        define: params2.ruleExceedBalance.define,
        treat: params2.ruleExceedBalance.treat 
    },
    ruleSandwich: {
      define: params2.ruleSandwich.define,
      considerDaysWeekend: params2.ruleSandwich.considerDaysWeekend,
      daysWeekend: params2.ruleSandwich.daysWeekend,
      considerDaysHoliday: params2.ruleSandwich.considerDaysHoliday,
      daysHoliday: params2.ruleSandwich.daysHoliday
    },
    noClubbingWith: params2.noClubbingWith,
    docRequired: params2.docRequired,
    daysDocRequired: params2.daysDocRequired,
    allowPastRequest: params2.allowPastRequest,
    specifyDaysPastRequest: params2.specifyDaysPastRequest,
    daysPastRequest: params2.daysPastRequest,
    allowFutureRequest: params2.allowFutureRequest,
    specifyDaysFutureRequest: params2.specifyDaysFutureRequest,
    daysBeforeRequest: params2.daysBeforeRequest,
    allowAdminOnly: params2.allowAdminOnly,
    defineMinDays: params2.defineMinDays,
    minDaysPerRequest: params2.minDaysPerRequest,
    defineMaxDays: params2.defineMaxDays,
    maxDaysPerRequest: params2.maxDaysPerRequest,
    defineMaxConsecutive: params2.defineMaxConsecutive,
    maxDaysConsecutive: params2.maxDaysConsecutive,
    defineGapDays: params2.defineGapDays,
    minGapDaysBetweenRequest: params2.minGapDaysBetweenRequest,
    maxRequestsPerPeriod: params2.maxRequestsPerPeriod, 
    perPeriod: params2.perPeriod
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
const updateLeaveRequest = async (params1:DocModel.IDocURL,params2:LeaveModel.ILeaveRequest) => {
  try {
    const res = await http.service().update<APIModel.IParams[],LeaveModel.ILeaveRequest>(http.getBaseURL()+`/api/v1/leaves/leave-requests/${params1.dbname}/${params1.docid}`,
    {               
      requestId: params2.requestId,
      leavePolicy: params2.leavePolicy,
      assignee: params2.assignee,
      leaveSchedule: params2.leaveSchedule,
      reason: params2.reason,
      status: params2.status,
      attachment: params2.attachment
    });
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const updateLeavePolicy = async (params1:DocModel.IDocURL,params2:LeaveModel.ILeavePolicy) => {
  try {
    const res = await http.service().update<APIModel.IParams[],LeaveModel.ILeavePolicy>(http.getBaseURL()+`/api/v1/leaves/leave-policies/${params1.dbname}/${params1.docid}`,
  {
    policyId: params2.policyId,
    name: params2.name,
    isPaid: params2.isPaid,
    isAuto: params2.isAuto,
    unit: params2.unit,
    validPeriod: params2.validPeriod,
    entitlements: params2.entitlements,
    applyProfile: params2.applyProfile,
    exemptProfile: params2.exemptProfile,
    ruleExceedBalance: {
        define: params2.ruleExceedBalance.define,
        treat: params2.ruleExceedBalance.treat 
    },
    ruleSandwich: {
      define: params2.ruleSandwich.define,
      considerDaysWeekend: params2.ruleSandwich.considerDaysWeekend,
      daysWeekend: params2.ruleSandwich.daysWeekend,
      considerDaysHoliday: params2.ruleSandwich.considerDaysHoliday,
      daysHoliday: params2.ruleSandwich.daysHoliday
    },
    noClubbingWith: params2.noClubbingWith,
    docRequired: params2.docRequired,
    daysDocRequired: params2.daysDocRequired,
    allowPastRequest: params2.allowPastRequest,
    specifyDaysPastRequest: params2.specifyDaysPastRequest,
    daysPastRequest: params2.daysPastRequest,
    allowFutureRequest: params2.allowFutureRequest,
    specifyDaysFutureRequest: params2.specifyDaysFutureRequest,
    daysBeforeRequest: params2.daysBeforeRequest,
    allowAdminOnly: params2.allowAdminOnly,
    defineMinDays: params2.defineMinDays,
    minDaysPerRequest: params2.minDaysPerRequest,
    defineMaxDays: params2.defineMaxDays,
    maxDaysPerRequest: params2.maxDaysPerRequest,
    defineMaxConsecutive: params2.defineMaxConsecutive,
    maxDaysConsecutive: params2.maxDaysConsecutive,
    defineGapDays: params2.defineGapDays,
    minGapDaysBetweenRequest: params2.minGapDaysBetweenRequest,
    maxRequestsPerPeriod: params2.maxRequestsPerPeriod, 
    perPeriod: params2.perPeriod
  });
    console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
//
/** 
 * * ---------------------------------------- remove ----------------------------------------
 */
const removeLeaveRequest = async (params:DocModel.IDocURL) => {
  try {
    const res = await http.service().remove<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/leaves/leave-requests/${params.dbname}/${params.docid}`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const removeLeavePolicy = async (params:DocModel.IDocURL) => {
  try {
    const res = await http.service().remove<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/leaves/leave-policies/${params.dbname}/${params.docid}`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
//
export default {
  getLeaveRequest,
  getLeavePolicy,
  //
  getManyLeaveRequest,
  getManyLeavePolicy,
  getManyLeavePolicyByName,
  getManyLeavePolicyByDetailsEntitlement,
  //
  getAllLeaveRequest,
  getAllLeavePolicy,
  getAllLeavePolicyByName,
  getAllLeavePolicyByDetailsEntitlement,
  //
  getPagLeaveRequest,
  getPagLeavePolicy,
  getPagLeavePolicyByName,
  getPagLeavePolicyByDetailsEntitlement,
  //
  createLeaveRequest,
  createLeavePolicy,
  //
  updateLeaveRequest,
  updateLeavePolicy,
  //
  removeLeaveRequest,
  removeLeavePolicy
} 