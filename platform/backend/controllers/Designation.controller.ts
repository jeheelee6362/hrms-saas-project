// controllers/Designation.controller.ts
// * Controller orders as: viewmany => viewall => viewpag => create => update
// * Using snake_case as controller naming convention
// * controller names begin with "action_"

import { Request } from 'express'
import { getErrorMessage } from '../middleware'
import { IDdocPagination,IDocURL,IDocsURL,IDesignation,IDBURL } from '../models'
import getUUIDv5 from '../utils/uuid'
//
import DesignationService from '../services/Designation.service'
import DocService from '../services/Doc.Service'
const DocServiceInstance = new DocService.DocService()
const DesignationServiceInstance = new DesignationService.DesignationService()
// 
/** 
 * * ---------------------------------------- viewmany ----------------------------------------
 */
const action_viewmany_designation = async (req:Request) => { 
  try {
    const dt = {
      dbName: req.params.dbname,
      docs: req.query.docs,
      view: "fetch_all"
    } as IDocsURL
    const res = await DesignationServiceInstance.viewMany(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewmany_designation_by_name = async (req:Request) => { 
  try {
    const dt = {
      dbName: req.params.dbname,
      docs: req.query.docs,
      view: "by_name"
    } as IDocsURL
    const res = await DesignationServiceInstance.viewMany(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
/** 
 * * ---------------------------------------- viewall ----------------------------------------
 */
const action_viewall_designation = async (req:Request) => { 
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "fetch_all"
    } as IDBURL
    const res = await DesignationServiceInstance.viewAll(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewall_designation_by_name = async (req:Request) => { 
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "by_name"
    } as IDBURL
    const res = await DesignationServiceInstance.viewAll(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
/** 
 * * ---------------------------------------- viewpag ----------------------------------------
 */
const action_viewpag_designation = async (req:Request) => { 
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "fetch_all",
      startKey: req.query.startkey,
      limit: Number(req.query.limit)
    } as IDdocPagination
    const res = await DesignationServiceInstance.viewPag(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewpag_designation_by_name = async (req:Request) => { 
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "by_name",
      startKey: req.query.startkey,
      limit: Number(req.query.limit)
    } as IDdocPagination
    const res = await DesignationServiceInstance.viewPag(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
/** 
 * * ---------------------------------------- create ----------------------------------------
 */
const action_create_designation = async (req:Request) => { 
  try {
    const dt1 = {
      dbName: req.params.dbname,
      docId: getUUIDv5.static("designation"+req.body.designationId),
    } as IDocURL
    const dt2 = {
      docType: "designation",
      designationId: req.body.designationId,
      name: req.body.name,
      department: req.body.department
    } as IDesignation
    const res = await DesignationServiceInstance.store(dt1,dt2)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
/** 
 * * ---------------------------------------- update ----------------------------------------
 */
const action_update_designation = async (req:Request) => {
  try {
    const dt1 = {
      dbName: req.params.dbname,
      docId: req.params.docid
    } as IDocURL
    const _res = await DocServiceInstance.view(dt1)
    const dt2 = {
      _rev: _res.body._rev,
      docType: "designation",
      designationId: req.body.designationId,
      name: req.body.name,
      department: req.body.department
    } as IDesignation
    const res = await DesignationServiceInstance.store(dt1,dt2)
    return _res
  } catch (err) {
    return getErrorMessage(err)
  }
}
//
export {
  action_viewmany_designation,
  action_viewmany_designation_by_name,
  //
  action_viewall_designation,
  action_viewall_designation_by_name,
  //
  action_viewpag_designation,
  action_viewpag_designation_by_name,
  //
  action_create_designation,
  //
  action_update_designation
}