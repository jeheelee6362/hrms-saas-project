// routes/Attendance.routes.ts
// * Using kebab-case as routes naming convention

import { Router, Request, Response } from 'express'
//
import { SchemaValidator } from '../middleware';
import { DocController,AttendanceController } from '../controllers'  
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
 * * Routers for "view all" and "paginated view"
 */
router.get('/:dbname', (req: Request, res: Response) => {
  if (req.query.hasOwnProperty("docs")) {
    AttendanceController.action_viewmany_attendance(req).then(val=>{res.send(val)})
  } else if (!req.query.startkey) {
    AttendanceController.action_viewall_attendance(req).then(val=>{res.send(val)})
  }
  return;
})
router.get('/:dbname/view/by-timesheet', (req: Request, res: Response) => {
  AttendanceController.action_viewall_timesheet(req).then(val=>{res.send(val)})
  return;
})
//
/**
 * * Routers for "create"
 */
router.post('/:dbname', (req: Request, res: Response) => {
  AttendanceController.action_create_attendance(req).then(val=>{res.send(val)})
  return;
})
//
/**
 * * Routers for "update"
 */
router.put('/:dbname/:docid', (req: Request, res: Response) => {
  AttendanceController.action_update_attendance(req).then(val=>{res.send(val)})
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