// controllers/Employer.controller.ts
// * Controller orders as: view => destroy
// * Using snake_case as controller naming convention
// * controller names begin with "action_"

import { Request } from 'express'
import { getErrorMessage } from '../middleware'
import { IDocURL } from '../models'
//
import DocService from '../services/Doc.Service'
const DocServiceInstance = new DocService.DocService()
// 
/** 
 * * ---------------------------------------- view ----------------------------------------
 */
const action_view = async (req:Request) => { 
    try {
      const dt = {
        dbName: req.params.dbname,
        docId: req.params.docid
      } as IDocURL
      const res = await DocServiceInstance.view(dt)
      return res
    } catch (err) {
      return getErrorMessage(err)
    }
  }
/** 
 * * ---------------------------------------- destroy ----------------------------------------
 */
const action_destroy = async (req:Request) => { 
    try {
      const _dt = {
        dbName: req.params.dbname,
        docId: req.params.docid
      } as IDocURL
      const _res = await DocServiceInstance.view(_dt)
      const dt = {
        dbName: req.params.dbname,
        docId: req.params.docid,
        rev: _res.body._rev
      } as IDocURL
      const res = await DocServiceInstance.destroy(dt)
      return res
    } catch (err) {
      return getErrorMessage(err)
    }
  }
  //
  export {
    action_view,
    //
    action_destroy
  }