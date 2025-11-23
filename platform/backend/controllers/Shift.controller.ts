// controllers/Shift.controller.ts
// * Controller orders as: viewmany => viewall => viewpag => create => update
// * Using snake_case as controller naming convention
// * controller names begin with "action_"

import { Request } from 'express'
import { getErrorMessage } from '../middleware'
import { IDdocPagination,IDocURL,IDocsURL,IRegularShift,IFlexibleShift,IDBURL } from '../models'
import getUUIDv5 from '../utils/uuid'
//
import ShiftService from '../services/Shift.service'
import DocService from '../services/Doc.Service'
const DocServiceInstance = new DocService.DocService()
const RegularShiftServiceInstance = new ShiftService.RegularShiftService()
const FlexibleShiftServiceInstance = new ShiftService.FlexibleShiftService()
// 
/** 
 * * ---------------------------------------- viewmany ----------------------------------------
 */
const action_viewmany_regularshift = async (req:Request) => { // Regular shift
  try {
    const dt = {
      dbName: req.params.dbname,
      docs: req.query.docs,
      view: "fetch_all_regular"
    } as IDocsURL
    const res = await RegularShiftServiceInstance.viewMany(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewmany_flexibleshift = async (req:Request) => { // Flexible shift
  try {
    const dt = {
      dbName: req.params.dbname,
      docs: req.query.docs,
      view: "fetch_all_flexible"
    } as IDocsURL
    const res = await FlexibleShiftServiceInstance.viewMany(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
/** 
 * * ---------------------------------------- viewall ----------------------------------------
 */
const action_viewall_regularshift = async (req:Request) => { // Regular shift
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "fetch_all_regular"
    } as IDBURL
    const res = await RegularShiftServiceInstance.viewAll(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewall_flexibleshift = async (req:Request) => { // Flexible shift
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "fetch_all_flexible"
    } as IDBURL
    const res = await FlexibleShiftServiceInstance.viewAll(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
/** 
 * * ---------------------------------------- viewpag ----------------------------------------
 */
const action_viewpag_regularshift = async (req:Request) => { // Regular shift
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "fetch_all_regular",
      startKey: req.query.startkey,
      limit: Number(req.query.limit)
    } as IDdocPagination
    const res = await RegularShiftServiceInstance.viewPag(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewpag_flexibleshift = async (req:Request) => { // Flexible shift
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "fetch_all_flexible",
      startKey: req.query.startkey,
      limit: Number(req.query.limit)
    } as IDdocPagination
    const res = await FlexibleShiftServiceInstance.viewPag(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
/** 
 * * ---------------------------------------- create ----------------------------------------
 */
const action_create_regularshift = async (req:Request) => { // Regular shift
  try {
    const dt1 = {
      dbName: req.params.dbname,
      docId: getUUIDv5.static("regularshift"+req.body.shiftId),
    } as IDocURL
    const dt2 = {
      docType: "shift",
      shiftType: "regular",            
      shiftId: req.body.shiftId,
      name: req.body.name,
      schedule: req.body.schedule,
      break: req.body.break,
      appliedDays: req.body.appliedDays  
    } as IRegularShift
    const res = await RegularShiftServiceInstance.store(dt1,dt2)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_create_flexibleshift = async (req:Request) => { // Flexible shift
  try {
    const dt1 = {
      dbName: req.params.dbname,
      docId: getUUIDv5.static("flexibleshift"+req.body.shiftId),
    } as IDocURL
    const dt2 = {
      docType: "shift",
      shiftType: "flexible",
      shiftId: req.body.shiftId,
      name: req.body.name,
      assignedHours: req.body.assignedHours,
      assignedHoursPeriod: req.body.assignedHoursPeriod
    } as IFlexibleShift
    const res = await FlexibleShiftServiceInstance.store(dt1,dt2)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
/** 
 * * ---------------------------------------- update ----------------------------------------
 */
const action_update_regularshift = async (req:Request) => { // Regular shift
  try {
    const dt1 = {
      dbName: req.params.dbname,
      docId: req.params.docid,
    } as IDocURL
    const _res = await DocServiceInstance.view(dt1)
    const dt2 = {
      _rev: _res.body._rev,
      docType: "shift",
      shiftType: "regular",    
      shiftId: req.body.shiftId,        
      name: req.body.name,
      schedule: req.body.schedule,
      break: req.body.break,
      appliedDays: req.body.appliedDays  
    } as IRegularShift
    const res = await RegularShiftServiceInstance.store(dt1,dt2)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_update_flexibleshift = async (req:Request) => { // Flexible shift
  try {
    const dt1 = {
      dbName: req.params.dbname,
      docId: req.params.docid,
    } as IDocURL
    const _res = await DocServiceInstance.view(dt1)
    const dt2 = {
      _rev: _res.body._rev,
      docType: "shift",
      shiftType: "flexible",
      shiftId: req.body.shiftId,
      name: req.body.name,
      assignedHours: req.body.assignedHours,
      assignedHoursPeriod: req.body.assignedHoursPeriod
    } as IFlexibleShift
    const res = await FlexibleShiftServiceInstance.store(dt1,dt2)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
//
export {
  action_viewmany_regularshift,
  action_viewmany_flexibleshift,
  //
  action_viewall_regularshift,
  action_viewall_flexibleshift,
  //
  action_viewpag_regularshift,
  action_viewpag_flexibleshift,
  //
  action_create_regularshift,
  action_create_flexibleshift,
  //
  action_update_regularshift,
  action_update_flexibleshift
}