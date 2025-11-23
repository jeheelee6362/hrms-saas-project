// controllers/PayrollComponent.controller.ts
// * Controller orders as: viewmany => viewall => viewpag => create => update
// * Using snake_case as controller naming convention
// * controller names begin with "action_"

import { Request } from 'express'
import { getErrorMessage } from '../middleware'
import { IDdocPagination,IDocURL,IDocsURL,IPayrollComponent,IDBURL } from '../models'
import getUUIDv5 from '../utils/uuid'
//
import PayrollComponentService from '../services/PayrollComponent.service'
import DocService from '../services/Doc.Service'
const DocServiceInstance = new DocService.DocService()
const EarningsComponentServiceInstance = new PayrollComponentService.EarningsComponentService()
const DeductionsComponentServiceInstance = new PayrollComponentService.DeductionsComponentService()
// 
/** 
 * * ---------------------------------------- viewmany ----------------------------------------
 */
const action_viewmany_earnings = async (req:Request) => { // Earnings component
  try {
    const dt = {
      dbName: req.params.dbname,
      docs: req.query.docs,
      view: "fetch_all_earnings"
    } as IDocsURL
    const res = await EarningsComponentServiceInstance.viewMany(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewmany_deductions = async (req:Request) => { // Deductions component
  try {
    const dt = {
      dbName: req.params.dbname,
      docs: req.query.docs,
      view: "fetch_all_deductions"
    } as IDocsURL
    const res = await DeductionsComponentServiceInstance.viewMany(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
/** 
 * * ---------------------------------------- viewall ----------------------------------------
 */
const action_viewall_earnings = async (req:Request) => { // Earnings component
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "fetch_all_earnings"
    } as IDBURL
    const res = await EarningsComponentServiceInstance.viewAll(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewall_deductions = async (req:Request) => { // Deductions component
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "fetch_all_deductions"
    } as IDBURL
    const res = await DeductionsComponentServiceInstance.viewAll(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
/** 
 * * ---------------------------------------- viewpag ----------------------------------------
 */
const action_viewpag_earnings = async (req:Request) => { // Earnings component
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "fetch_all_earnings",
      startKey: req.query.startkey,
      limit: Number(req.query.limit)
    } as IDdocPagination
    const res = await EarningsComponentServiceInstance.viewPag(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewpag_deductions = async (req:Request) => { // Deductions component
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "fetch_all_deductions",
      startKey: req.query.startkey,
      limit: Number(req.query.limit)
    } as IDdocPagination
    const res = await DeductionsComponentServiceInstance.viewPag(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
/** 
 * * ---------------------------------------- create ----------------------------------------
 */
const action_create_earnings = async (req:Request) => { // Earnings component
  try {
    const dt1 = {
      dbName: req.params.dbname,
      docId: getUUIDv5.static("earnings"+req.body.componentId),
    } as IDocURL
    const dt2 = {
      docType: "payrollcomponent",
      componentType: 'earnings',
      componentId: req.body.componentId,
      name: req.body.name,
      unit: req.body.unit,
      rate: req.body.rate,
      type: req.body.type
    } as IPayrollComponent
    const res = await EarningsComponentServiceInstance.store(dt1,dt2)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_create_deductions = async (req:Request) => { // Deductions component
  try {
    const dt1 = {
      dbName: req.params.dbname,
      docId: getUUIDv5.static("deductions"+req.body.componentId),
    } as IDocURL
    const dt2 = {
      docType: "payrollcomponent",
      componentType: 'deductions',
      componentId: req.body.componentId,
      name: req.body.name,
      unit: req.body.unit,
      rate: req.body.rate,
      type: req.body.type
    } as IPayrollComponent
    const res = await DeductionsComponentServiceInstance.store(dt1,dt2)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
/** 
 * * ---------------------------------------- update ----------------------------------------
 */
const action_update_earnings = async (req:Request) => { // Earnings component
  try {
    const dt1 = {
      dbName: req.params.dbname,
      docId: req.params.docid,
    } as IDocURL
    const _res = await DocServiceInstance.view(dt1)
    const dt2 = {
      _rev: _res.body._rev,
      docType: "payrollcomponent",
      componentType: 'earnings',
      componentId: req.body.componentId,
      name: req.body.name,
      unit: req.body.unit,
      rate: req.body.rate,
      type: req.body.type
    } as IPayrollComponent
    const res = await EarningsComponentServiceInstance.store(dt1,dt2)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_update_deductions = async (req:Request) => { // Deductions component
  try {
    const dt1 = {
      dbName: req.params.dbname,
      docId: req.params.docid,
    } as IDocURL
    const _res = await DocServiceInstance.view(dt1)
    const dt2 = {
      _rev: _res.body._rev,
      docType: "payrollcomponent",
      componentType: 'deductions',
      componentId: req.body.componentId,
      name: req.body.name,
      unit: req.body.unit,
      rate: req.body.rate,
      type: req.body.type
    } as IPayrollComponent
    const res = await DeductionsComponentServiceInstance.store(dt1,dt2)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
//
export {
  action_viewmany_earnings,
  action_viewmany_deductions,
  //
  action_viewall_earnings,
  action_viewall_deductions,
  //
  action_viewpag_earnings,
  action_viewpag_deductions,
  //
  action_create_earnings,
  action_create_deductions,
  //
  action_update_earnings,
  action_update_deductions
}