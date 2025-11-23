// routes/Leave.routes.ts
// * Using kebab-case as routes naming convention

import { Router, Request, Response } from 'express'
//
import { SchemaValidator } from '../middleware';
import { DocController,LeaveController } from '../controllers'  
//
const router = Router()
//
/** 
 * * Routers for "view"
 */
router.get([
  '/leave-requests/:dbname/:docid',
  '/leave-policies/:dbname/:docid'
], (req: Request, res: Response) => {
  DocController.action_view(req).then(val=>{res.send(val)})
  return;
})
//
/**
 * * Routers for "view all" and "paginated view"
 */
router.get('/leave-requests/:dbname', (req: Request, res: Response) => {
  if (req.query.hasOwnProperty("docs")) {
    LeaveController.action_viewmany_leaverequest(req).then(val=>{res.send(val)})
  } else if (!req.query.startkey) {
    LeaveController.action_viewall_leaverequest(req).then(val=>{res.send(val)})
  } else {
    LeaveController.action_viewpag_leaverequest(req).then(val=>{res.send(val)})
  }
  return;
})
router.get('/leave-policies/:dbname', (req: Request, res: Response) => {
  if (req.query.hasOwnProperty("docs")) {
    LeaveController.action_viewmany_leavepolicy(req).then(val=>{res.send(val)})
  } else if (!req.query.startkey) {
    LeaveController.action_viewall_leavepolicy(req).then(val=>{res.send(val)})
  } else {
    LeaveController.action_viewpag_leavepolicy(req).then(val=>{res.send(val)})
  }
  return;
})
router.get('/leave-policies/:dbname/view/by-name', (req: Request, res: Response) => {
  if (req.query.hasOwnProperty("docs")) {
    LeaveController.action_viewmany_leavepolicy_by_name(req).then(val=>{res.send(val)})
  } else if (!req.query.startkey) {
    LeaveController.action_viewall_leavepolicy_by_name(req).then(val=>{res.send(val)})
  } else {
    LeaveController.action_viewpag_leavepolicy_by_name(req).then(val=>{res.send(val)})
  }
  return;
})
router.get('/leave-policies/:dbname/view/by-details-entitlement', (req: Request, res: Response) => {
  if (req.query.hasOwnProperty("docs")) {
    LeaveController.action_viewmany_leavepolicy_by_details_entitlement(req).then(val=>{res.send(val)})
  } else if (!req.query.startkey) {
    LeaveController.action_viewall_leavepolicy_by_details_entitlement(req).then(val=>{res.send(val)})
  } else {
    LeaveController.action_viewpag_leavepolicy_by_details_entitlement(req).then(val=>{res.send(val)})
  }
  return;
})
//
/**
 * * Routers for "create"
 */
router.post('/leave-requests/:dbname', (req: Request, res: Response) => {
  LeaveController.action_create_leaverequest(req).then(val=>{res.send(val)})
  return;
})
router.post('/leave-policies/:dbname', (req: Request, res: Response) => {
  LeaveController.action_create_leavepolicy(req).then(val=>{res.send(val)})
  return;
})
//
/**
 * * Routers for "update"
 */
router.put('/leave-requests/:dbname/:docid', (req: Request, res: Response) => {
  LeaveController.action_update_leaverequest(req).then(val=>{res.send(val)})
  return;
})
router.put('/leave-policies/:dbname/:docid', (req: Request, res: Response) => {
  LeaveController.action_update_leavepolicy(req).then(val=>{res.send(val)})
  return;
})
//
/**
 * * Routers for "destroy"
 */
router.delete([
  '/leave-requests/:dbname/:docid',
  '/leave-policies/:dbname/:docid'], (req: Request, res: Response) => {
  DocController.action_destroy(req).then(val=>{res.send(val)})
  return;
})
//
export default router