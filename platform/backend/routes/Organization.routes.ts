// routes/Organization.routes.ts
// * Using kebab-case as routes naming convention

import { Router, Request, Response } from 'express'
//
import { SchemaValidator } from '../middleware';
import { DocController,OrganizationController } from '../controllers'  
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
    OrganizationController.action_viewmany_organization(req).then(val=>{res.send(val)})
  } else if (!req.query.startkey) {
    OrganizationController.action_viewall_organization(req).then(val=>{res.send(val)})
  } else {
    OrganizationController.action_viewpag_organization(req).then(val=>{res.send(val)})
  }
  return;
})
router.get('/:dbname/view/by-name', (req: Request, res: Response) => {
  if (req.query.hasOwnProperty("docs")) {
    OrganizationController.action_viewmany_organization_by_name(req).then(val=>{res.send(val)})
  } else if (!req.query.startkey) {
    OrganizationController.action_viewall_organization_by_name(req).then(val=>{res.send(val)})
  } else {
    OrganizationController.action_viewpag_organization_by_name(req).then(val=>{res.send(val)})
  }
  return;
})
//
/**
 * * Routers for "create"
 */
router.post('/:dbname', (req: Request, res: Response) => {
  OrganizationController.action_create_organization(req).then(val=>{res.send(val)})
  return;
})
//
/**
 * * Routers for "update"
 */
router.put('/:dbname/:docid', (req: Request, res: Response) => {
  OrganizationController.action_update_organization(req).then(val=>{res.send(val)})
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