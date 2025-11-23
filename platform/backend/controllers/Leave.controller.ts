// controllers/Leave.controller.ts
// * Controller orders as: viewmany => viewall => viewpag => create => update
// * Using snake_case as controller naming convention
// * controller names begin with "action_"

import { Request } from 'express'
import { getErrorMessage } from '../middleware'
import { IDBURL,IDdocPagination,IDocURL,IDocsURL,ILeaveRequest,ILeavePolicy } from '../models'
import getUUIDv5 from '../utils/uuid'
//
import LeaveService from '../services/Leave.service'
import DocService from '../services/Doc.Service'
const DocServiceInstance = new DocService.DocService()
const LeaveRequestServiceInstance = new LeaveService.LeaveRequestService()
const LeavePolicyServiceInstance = new LeaveService.LeavePolicyService()
//
/** 
 * * ---------------------------------------- viewmany ----------------------------------------
 */
const action_viewmany_leaverequest = async (req:Request) => { // leave request
  try {
    const dt = {
      dbName: req.params.dbname,
      docs: req.query.docs,
      view: "fetch_all"
    } as IDocsURL
    const res = await LeaveRequestServiceInstance.viewMany(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewmany_leavepolicy = async (req:Request) => { // leave policy
    try {
      const dt = {
        dbName: req.params.dbname,
        docs: req.query.docs,
        view: "fetch_all"
      } as IDocsURL
      const res = await LeavePolicyServiceInstance.viewMany(dt)
      return res
    } catch (err) {
      return getErrorMessage(err)
    }
}
const action_viewmany_leavepolicy_by_name = async (req:Request) => { // leave policy
  try {
    const dt = {
      dbName: req.params.dbname,
      docs: req.query.docs,
      view: "by_name"
    } as IDocsURL
    const res = await LeavePolicyServiceInstance.viewMany(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewmany_leavepolicy_by_details_entitlement = async (req:Request) => { // leave policy
  try {
    const dt = {
      dbName: req.params.dbname,
      docs: req.query.docs,
      view: "by_details_entitlement"
    } as IDocsURL
    const res = await LeavePolicyServiceInstance.viewMany(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
//
/** 
 * * ---------------------------------------- viewall ----------------------------------------
 */
const action_viewall_leaverequest = async (req:Request) => { // leave request
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "fetch_all"
    } as IDBURL
    const res = await LeaveRequestServiceInstance.viewAll(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewall_leavepolicy = async (req:Request) => { // leave policy
    try {
      const dt = {
        dbName: req.params.dbname,
        view: "fetch_all"
      } as IDBURL
      const res = await LeavePolicyServiceInstance.viewAll(dt)
      return res
    } catch (err) {
      return getErrorMessage(err)
    }
}
const action_viewall_leavepolicy_by_name = async (req:Request) => { // leave policy
    try {
      const dt = {
        dbName: req.params.dbname,
        view: "by_name"
      } as IDBURL
      const res = await LeavePolicyServiceInstance.viewAll(dt)
      return res
    } catch (err) {
      return getErrorMessage(err)
    }
}
const action_viewall_leavepolicy_by_details_entitlement = async (req:Request) => { // leave policy
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "by_details_entitlement"
    } as IDBURL
    const res = await LeavePolicyServiceInstance.viewAll(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
//
/** 
 * * ---------------------------------------- viewpag ----------------------------------------
 */
const action_viewpag_leaverequest = async (req:Request) => { // leave request
  const [assignee, leavePolicy, leaveStatus, dateFrom, dateTo] = JSON.parse(req.query.startkey! as string);
  try {
    const dt = {
      dbName: req.params.dbname, 
      startKey: req.query.startkey,
    } as IDdocPagination
    const res = await LeaveRequestServiceInstance.viewPag(dt)

    const leaveRequestRows = await Promise.all(res.body.map(async (leaveRequest: any) => {
      const dtLeavePolicy = { dbName: req.params.dbname, docId: leaveRequest.leavePolicy } as IDocURL;
      const dtAssignee = { dbName: req.params.dbname, docId: leaveRequest.assignee } as IDocURL;

      const resLeavePolicy = await DocServiceInstance.view(dtLeavePolicy);
      const resAssignee = await DocServiceInstance.view(dtAssignee);

      return {
        id: leaveRequest._id,
        key: leaveRequest._id,
        value: {
          requestId: leaveRequest.requestId,
          leavePolicy: resLeavePolicy.body.name,
          assignee: resAssignee.body.name,
          leaveSchedule: leaveRequest.leaveSchedule,
          reason: leaveRequest.reason,
          status: leaveRequest.status,
          attachment: leaveRequest.attachment
        }
      };
    }));

    return {
      success: true,
      body: {
        total_rows: leaveRequestRows.length,
        offset: 80,
        rows: leaveRequestRows
      }
    };

  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewpag_leavepolicy = async (req:Request) => { // leave policy
    try {
      const dt = {
        dbName: req.params.dbname,
        view: "fetch_all",
        startKey: req.query.startkey,
        limit: Number(req.query.limit)
      } as IDdocPagination
      const res = await LeavePolicyServiceInstance.viewPag(dt)
      return res
    } catch (err) {
      return getErrorMessage(err)
    }
}
const action_viewpag_leavepolicy_by_name = async (req:Request) => { // leave policy
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "by_name",
      startKey: req.query.startkey,
      limit: Number(req.query.limit)
    } as IDdocPagination
    const res = await LeavePolicyServiceInstance.viewPag(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewpag_leavepolicy_by_details_entitlement = async (req:Request) => { // leave policy
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "by_details_entitlement",
      startKey: req.query.startkey,
      limit: Number(req.query.limit)
    } as IDdocPagination
    const res = await LeavePolicyServiceInstance.viewPag(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
//
/** 
 * * ---------------------------------------- create ----------------------------------------
 */
const action_create_leaverequest = async (req:Request) => { // leave request
  try {
    const dt1 = {
      dbName: req.params.dbname,
      docId: getUUIDv5.static("leave"+req.body.requestId),
    } as IDocURL
    const dt2 = {
      docType: "leave",
      requestId: req.body.requestId,
      leavePolicy: req.body.leavePolicy,                  
      assignee: req.body.assignee,                     
      leaveSchedule: req.body.leaveSchedule,
      reason: req.body.reason,
      status: req.body.status,
      attachment: req.body.attachment
    } as ILeaveRequest
    const res = await LeaveRequestServiceInstance.store(dt1,dt2)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_create_leavepolicy = async (req:Request) => { // leave policy
  try {
    const dt1 = {
      dbName: req.params.dbname,
      docId: getUUIDv5.static("leavepolicy"+req.body.policyId),
    } as IDocURL
    const dt2 = {
      docType: "leavepolicy", 
      policyId: req.body.policyId,
      name: req.body.name,
      isPaid: req.body.isPaid,
      isAuto: req.body.isAuto,
      unit: req.body.unit,
      validPeriod: req.body.validPeriod,
      entitlements: req.body.entitlements,
      applyProfile: req.body.applyProfile,
      exemptProfile: req.body.exemptProfile,
      ruleExceedBalance: {
          define: req.body.ruleExceedBalance.define,
          treat: req.body.ruleExceedBalance.treat 
      },
      ruleSandwich: {
          define: req.body.ruleSandwich.define,
          considerDaysWeekend: req.body.ruleSandwich.considerDaysWeekend,
          daysWeekend: req.body.ruleSandwich.daysWeekend,
          considerDaysHoliday: req.body.ruleSandwich.considerDaysHoliday,
          daysHoliday: req.body.ruleSandwich.daysHoliday
      },
      noClubbingWith: req.body.noClubbingWith,
      docRequired: req.body.docRequired,
      daysDocRequired: req.body.daysDocRequired,
      allowPastRequest: req.body.allowPastRequest,
      specifyDaysPastRequest: req.body.specifyDaysPastRequest,
      daysPastRequest: req.body.daysPastRequest,
      allowFutureRequest: req.body.allowFutureRequest,
      specifyDaysFutureRequest: req.body.specifyDaysFutureRequest,
      daysBeforeRequest: req.body.daysBeforeRequest,
      allowAdminOnly: req.body.allowAdminOnly,
      defineMinDays: req.body.defineMinDays,
      minDaysPerRequest: req.body.minDaysPerRequest,
      defineMaxDays: req.body.defineMaxDays,
      maxDaysPerRequest: req.body.maxDaysPerRequest,
      defineMaxConsecutive: req.body.defineMaxConsecutive,
      maxDaysConsecutive: req.body.maxDaysConsecutive,
      defineGapDays: req.body.defineGapDays,
      minGapDaysBetweenRequest: req.body.minGapDaysBetweenRequest,
      maxRequestsPerPeriod: req.body.maxRequestsPerPeriod, 
      perPeriod: req.body.perPeriod
    } as ILeavePolicy
    const res = await LeavePolicyServiceInstance.store(dt1,dt2)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
//
/** 
 * * ---------------------------------------- update ----------------------------------------
 */
const action_update_leaverequest = async (req:Request) => { // leave request
  try {
    const dt1 = {
      dbName: req.params.dbname,
      docId: req.params.docid,
    } as IDocURL
    const _res = await DocServiceInstance.view(dt1)
    const dt2 = {
      _rev: _res.body._rev,
      docType: "leave",
      requestId: req.body.requestId,
      leavePolicy: req.body.leavePolicy,                  
      assignee: req.body.assignee,                     
      leaveSchedule: req.body.leaveSchedule,
      reason: req.body.reason,
      status: req.body.status,
      attachment: req.body.attachment
    } as ILeaveRequest
    const res = await LeaveRequestServiceInstance.store(dt1,dt2)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_update_leavepolicy = async (req:Request) => { // leave policy
  try {
    const dt1 = {
      dbName: req.params.dbname,
      docId: req.params.docid,
    } as IDocURL
    const _res = await DocServiceInstance.view(dt1)
    const dt2 = {
      _rev: _res.body._rev,
      docType: "leavepolicy",
      policyId: req.body.policyId,
      name: req.body.name,
      isPaid: req.body.isPaid,
      isAuto: req.body.isAuto,
      unit: req.body.unit,
      validPeriod: req.body.validPeriod,
      entitlements: req.body.entitlements,
      applyProfile: req.body.applyProfile,
      exemptProfile: req.body.exemptProfile,
      ruleExceedBalance: {
          define: req.body.ruleExceedBalance.define,
          treat: req.body.ruleExceedBalance.treat 
      },
      ruleSandwich: {
          define: req.body.ruleSandwich.define,
          considerDaysWeekend: req.body.ruleSandwich.considerDaysWeekend,
          daysWeekend: req.body.ruleSandwich.daysWeekend,
          considerDaysHoliday: req.body.ruleSandwich.considerDaysHoliday,
          daysHoliday: req.body.ruleSandwich.daysHoliday
      },
      noClubbingWith: req.body.noClubbingWith,
      docRequired: req.body.docRequired,
      daysDocRequired: req.body.daysDocRequired,
      allowPastRequest: req.body.allowPastRequest,
      specifyDaysPastRequest: req.body.specifyDaysPastRequest,
      daysPastRequest: req.body.daysPastRequest,
      allowFutureRequest: req.body.allowFutureRequest,
      specifyDaysFutureRequest: req.body.specifyDaysFutureRequest,
      daysBeforeRequest: req.body.daysBeforeRequest,
      allowAdminOnly: req.body.allowAdminOnly,
      defineMinDays: req.body.defineMinDays,
      minDaysPerRequest: req.body.minDaysPerRequest,
      defineMaxDays: req.body.defineMaxDays,
      maxDaysPerRequest: req.body.maxDaysPerRequest,
      defineMaxConsecutive: req.body.defineMaxConsecutive,
      maxDaysConsecutive: req.body.maxDaysConsecutive,
      defineGapDays: req.body.defineGapDays,
      minGapDaysBetweenRequest: req.body.minGapDaysBetweenRequest,
      maxRequestsPerPeriod: req.body.maxRequestsPerPeriod, 
      perPeriod: req.body.perPeriod
    } as ILeavePolicy
    const res = await LeavePolicyServiceInstance.store(dt1,dt2)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
//
export {
  action_viewmany_leaverequest,
  action_viewmany_leavepolicy,
  action_viewmany_leavepolicy_by_name,
  action_viewmany_leavepolicy_by_details_entitlement,
  //
  action_viewall_leaverequest,
  action_viewall_leavepolicy,
  action_viewall_leavepolicy_by_name,
  action_viewall_leavepolicy_by_details_entitlement,
  //
  action_viewpag_leaverequest,
  action_viewpag_leavepolicy,
  action_viewpag_leavepolicy_by_name,
  action_viewpag_leavepolicy_by_details_entitlement,
  //
  action_create_leaverequest,
  action_create_leavepolicy,
  //
  action_update_leaverequest,
  action_update_leavepolicy
}