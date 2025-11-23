// routes/Holiday.routes.ts
// * Using kebab-case as routes naming convention

import { Router, Request, Response } from 'express'
//
import { SchemaValidator } from '../middleware';
import { DocController,HolidayController } from '../controllers'  
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
    HolidayController.action_viewmany_holiday(req).then(val=>{res.send(val)})
  } else if (!req.query) {
    HolidayController.action_viewall_holiday(req).then(val=>{res.send(val)})
  } else {
    HolidayController.action_viewpag_holiday(req).then(val=>{res.send(val)})
  }
  return;
})
//
/**
 * * Routers for "create"
 */
router.post('/:dbname', (req: Request, res: Response) => {
  HolidayController.action_create_holiday(req).then(val=>{res.send(val)})
  return;
})
//
/**
 * * Routers for "update"
 */
router.put('/:dbname/:docid', (req: Request, res: Response) => {
  HolidayController.action_update_holiday(req).then(val=>{res.send(val)})
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