// routes/PayrollComponent.routes.ts
// * Using kebab-case as routes naming convention

import { Router, Request, Response } from 'express'
//
import { SchemaValidator } from '../middleware';
import { DocController,PayrollComponentController } from '../controllers'  
//
const router = Router() 
//
/** 
 * * Routers for "view"
 */
router.get([
  '/earnings/:dbname/:docid',
  '/deductions/:dbname/:docid'
], (req: Request, res: Response) => {
  DocController.action_view(req).then(val=>{res.send(val)})
  return;
})
//
/**
 * * Routers for "view many", "view all" and "paginated view"
 */
router.get('/earnings/:dbname', (req: Request, res: Response) => {
  if (req.query.hasOwnProperty("docs")) {
    PayrollComponentController.action_viewmany_earnings(req).then(val=>{res.send(val)})
  } else if (!req.query.startkey) {
    PayrollComponentController.action_viewall_earnings(req).then(val=>{res.send(val)})
  } else {
    PayrollComponentController.action_viewpag_earnings(req).then(val=>{res.send(val)})
  }
  return;
})
router.get('/deductions/:dbname', (req: Request, res: Response) => {
  if (req.query.hasOwnProperty("docs")) {
    PayrollComponentController.action_viewmany_deductions(req).then(val=>{res.send(val)})
  } else if (!req.query.startkey) {
    PayrollComponentController.action_viewall_deductions(req).then(val=>{res.send(val)})
  } else {
    PayrollComponentController.action_viewpag_deductions(req).then(val=>{res.send(val)})
  }
  return;
})
//
/**
 * * Routers for "create"
 */
router.post('/earnings/:dbname', (req: Request, res: Response) => {
  PayrollComponentController.action_create_earnings(req).then(val=>{res.send(val)})
  return;
})
router.post('/deductions/:dbname', (req: Request, res: Response) => {
  PayrollComponentController.action_create_deductions(req).then(val=>{res.send(val)})
  return;
})
//
/**
 * * Routers for "update"
 */
router.put('/earnings/:dbname/:docid', (req: Request, res: Response) => {
  PayrollComponentController.action_update_earnings(req).then(val=>{res.send(val)})
  return;
})
router.put('/deductions/:dbname/:docid', (req: Request, res: Response) => {
  PayrollComponentController.action_update_deductions(req).then(val=>{res.send(val)})
  return;
})
//
/**
 * * Routers for "destroy"
 */
router.delete([
  'earnings/:dbname/:docid',
  'deductions/:dbname/:docid'
], (req: Request, res: Response) => {
  DocController.action_destroy(req).then(val=>{res.send(val)})
  return;
})
//
export default router