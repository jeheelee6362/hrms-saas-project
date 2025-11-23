// routes/Shift.routes.ts
// * Using kebab-case as routes naming convention

import { Router, Request, Response } from 'express'
//
import { SchemaValidator } from '../middleware';
import { DocController,ShiftController } from '../controllers'  
//
const router = Router() 
//
/** 
 * * Routers for "view"
 */
router.get([
  '/regular-shifts/:dbname/:docid',
  '/flexible-shifts/:dbname/:docid'
], (req: Request, res: Response) => {
  DocController.action_view(req).then(val=>{res.send(val)})
  return;
})
//
/**
 * * Routers for "view many", "view all" and "paginated view"
 */
router.get('/regular-shifts/:dbname', (req: Request, res: Response) => {
  if (req.query.hasOwnProperty("docs")) {
    ShiftController.action_viewmany_regularshift(req).then(val=>{res.send(val)})
  } else if (!req.query.startkey) {
    ShiftController.action_viewall_regularshift(req).then(val=>{res.send(val)})
  } else {
    ShiftController.action_viewpag_regularshift(req).then(val=>{res.send(val)})
  }
  return;
})
router.get('/flexible-shifts/:dbname', (req: Request, res: Response) => {
  if (req.query.hasOwnProperty("docs")) {
    ShiftController.action_viewmany_flexibleshift(req).then(val=>{res.send(val)})
  } else if (!req.query.startkey) {
    ShiftController.action_viewall_flexibleshift(req).then(val=>{res.send(val)})
  } else {
    ShiftController.action_viewpag_flexibleshift(req).then(val=>{res.send(val)})
  }
  return;
})
//
/**
 * * Routers for "create"
 */
router.post('/regular-shifts/:dbname', (req: Request, res: Response) => {
  ShiftController.action_create_regularshift(req).then(val=>{res.send(val)})
  return;
})
router.post('/flexible-shifts/:dbname', (req: Request, res: Response) => {
  ShiftController.action_create_flexibleshift(req).then(val=>{res.send(val)})
  return;
})
//
/**
 * * Routers for "update"
 */
router.put('/regular-shifts/:dbname/:docid', (req: Request, res: Response) => {
  ShiftController.action_update_regularshift(req).then(val=>{res.send(val)})
  return;
})
router.put('/flexible-shifts/:dbname/:docid', (req: Request, res: Response) => {
  ShiftController.action_update_flexibleshift(req).then(val=>{res.send(val)})
  return;
})
//
/**
 * * Routers for "destroy"
 */
router.delete([
  'regular-shifts/:dbname/:docid',
  'flexible-shifts/:dbname/:docid'
], (req: Request, res: Response) => {
  DocController.action_destroy(req).then(val=>{res.send(val)})
  return;
})
//
export default router