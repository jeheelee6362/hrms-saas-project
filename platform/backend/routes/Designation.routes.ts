// routes/Designation.routes.ts
// * Using kebab-case as routes naming convention

import { Router, Request, Response } from 'express'
//
import { SchemaValidator } from '../middleware';
import { DocController,DesignationController } from '../controllers'  
//
const router = Router() 
//
/** 
 * * Routers for "view"
 */
router.get('/:dbname/:docid', (req: Request, res: Response) => {
  DocController.action_view(req).then(val=>{res.send(val)})
  return;
})
//
/**
 * * Routers for "view many", "view all" and "paginated view"
 */
router.get('/:dbname', (req: Request, res: Response) => {
  if (req.query.hasOwnProperty("docs")) {
    DesignationController.action_viewmany_designation(req).then(val=>{res.send(val)})
  } else if (!req.query.startkey) {
    DesignationController.action_viewall_designation(req).then(val=>{res.send(val)})
  } else {
    DesignationController.action_viewpag_designation(req).then(val=>{res.send(val)})
  }
  return;
})
router.get('/:dbname/view/by-name', (req: Request, res: Response) => {
  if (req.query.hasOwnProperty("docs")) {
    DesignationController.action_viewmany_designation_by_name(req).then(val=>{res.send(val)})
  } else if (!req.query.startkey) {
    DesignationController.action_viewall_designation_by_name(req).then(val=>{res.send(val)})
  } else {
    DesignationController.action_viewpag_designation_by_name(req).then(val=>{res.send(val)})
  }
  return;
})
//
/**
 * * Routers for "create"
 */
router.post('/:dbname', (req: Request, res: Response) => {
  DesignationController.action_create_designation(req).then(val=>{res.send(val)})
  return;
})
//
/**
 * * Routers for "update"
 */
router.put('/:dbname/:docid', (req: Request, res: Response) => {
  DesignationController.action_update_designation(req).then(val=>{res.send(val)})
  return;
})
//
/**
 * * Routers for "destroy"
 */
router.delete('/:dbname/:docid', (req: Request, res: Response) => {
  DocController.action_destroy(req).then(val=>{res.send(val)})
  return;
})
//
export default router