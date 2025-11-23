// controllers/Organization.controller.ts
// * Controller orders as: viewmany => viewall => viewpag => create => update
// * Using snake_case as controller naming convention
// * controller names begin with "action_"

import { Request } from 'express'
import { getErrorMessage } from '../middleware'
import { IDdocPagination,IDocURL,IDocsURL,IOrganization,IDBURL } from '../models'
import getUUIDv5 from '../utils/uuid'
//
import OrganizationService from '../services/Organization.service'
import DocService from '../services/Doc.Service'
const DocServiceInstance = new DocService.DocService()
const OrganizationServiceInstance = new OrganizationService.OrganizationService()
// 
/** 
 * * ---------------------------------------- viewmany ----------------------------------------
 */
const action_viewmany_organization = async (req:Request) => { 
  try {
    const dt = {
      dbName: req.params.dbname,
      docs: req.query.docs,
      view: "fetch_all"
    } as IDocsURL
    const res = await OrganizationServiceInstance.viewMany(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewmany_organization_by_name = async (req:Request) => { 
  try {
    const dt = {
      dbName: req.params.dbname,
      docs: req.query.docs,
      view: "by_name"
    } as IDocsURL
    const res = await OrganizationServiceInstance.viewMany(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
/** 
 * * ---------------------------------------- viewall ----------------------------------------
 */
const action_viewall_organization = async (req:Request) => { 
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "fetch_all"
    } as IDBURL
    const res = await OrganizationServiceInstance.viewAll(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewall_organization_by_name = async (req:Request) => { 
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "by_name"
    } as IDBURL
    const res = await OrganizationServiceInstance.viewAll(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
/** 
 * * ---------------------------------------- viewpag ----------------------------------------
 */
const action_viewpag_organization = async (req:Request) => { 
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "fetch_all",
      startKey: req.query.startkey,
      limit: Number(req.query.limit)
    } as IDdocPagination
    const res = await OrganizationServiceInstance.viewPag(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_viewpag_organization_by_name = async (req:Request) => { 
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "by_name",
      startKey: req.query.startkey,
      limit: Number(req.query.limit)
    } as IDdocPagination
    const res = await OrganizationServiceInstance.viewPag(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
/** 
 * * ---------------------------------------- create ----------------------------------------
 */
const action_create_organization = async (req:Request) => { // Organization
  try {
    const dt1 = {
      dbName: req.params.dbname,
      docId: getUUIDv5.static("organization"+req.body.organizationId),
    } as IDocURL
    const dt2 = {
      docType: "organization",
      organizationId: req.body.organizationId,
      name: req.body.name,
      dateCreated: req.body.dateCreated,
      pic: req.body.pic,
      description: req.body.description,
      dir: req.body.dir,
      members: req.body.members
    } as IOrganization
    const res = await OrganizationServiceInstance.store(dt1,dt2)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
/** 
 * * ---------------------------------------- update ----------------------------------------
 */
const action_update_organization = async (req:Request) => { 
  try {
    const dt1 = {
      dbName: req.params.dbname,
      docId: req.params.docid,
    } as IDocURL
    const _res = await DocServiceInstance.view(dt1)
    const dt2 = {
      _rev: _res.body._rev,
      docType: "organization",
      organizationId: req.body.organizationId,
      name: req.body.name,
      dateCreated: req.body.dateCreated,
      pic: req.body.pic,
      description: req.body.description,
      dir: req.body.dir,
      members: req.body.members
    } as IOrganization
    const res = await OrganizationServiceInstance.store(dt1,dt2)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
//
export {
  action_viewmany_organization,
  action_viewmany_organization_by_name,
  //
  action_viewall_organization,
  action_viewall_organization_by_name,
  //
  action_viewpag_organization,
  action_viewpag_organization_by_name,
  //
  action_create_organization,
  action_update_organization
}