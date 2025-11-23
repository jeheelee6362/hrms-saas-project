// routes/Employee.routes.ts
// * Using kebab-case as routes naming convention

import { Router, Request, Response } from 'express'
//
import { SchemaValidator } from '../middleware';
import { DocController,EmployeeController } from '../controllers'  
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
    EmployeeController.action_viewmany_employee(req).then(val=>{res.send(val)})
  } else if (!req.query.startkey) {
    EmployeeController.action_viewall_employee(req).then(val=>{res.send(val)})
  } else {
    EmployeeController.action_viewpag_employee(req).then(val=>{res.send(val)})
  }
  return;
})
router.get('/:dbname/view/by-name', (req: Request, res: Response) => {
  if (req.query.hasOwnProperty("docs")) {
    EmployeeController.action_viewmany_employee_by_name(req).then(val=>{res.send(val)})
  } else if (!req.query.startkey) {
    EmployeeController.action_viewall_employee_by_name(req).then(val=>{res.send(val)})
  } else {
    EmployeeController.action_viewpag_employee_by_name(req).then(val=>{res.send(val)})
  }
  return;
})
router.get('/:dbname/view/by-name-joindate-designation', (req: Request, res: Response) => {
  if (req.query.hasOwnProperty("docs")) {
    EmployeeController.action_viewmany_employee_by_name_joindate_designation(req).then(val=>{res.send(val)})
  } else if (!req.query.startkey) {
    EmployeeController.action_viewall_employee_by_name_joindate_designation(req).then(val=>{res.send(val)})
  } else {
    EmployeeController.action_viewpag_employee_by_name_joindate_designation(req).then(val=>{res.send(val)})
  }
  return;
})
router.get('/:dbname/view/for-table-row', (req: Request, res: Response) => {
  if (req.query.hasOwnProperty("docs")) {
    EmployeeController.action_viewmany_employee_for_table_row(req).then(val=>{res.send(val)})
  } else if (!req.query.startkey) {
    EmployeeController.action_viewall_employee_for_table_row(req).then(val=>{res.send(val)})
  } else {
    EmployeeController.action_viewpag_employee_for_table_row(req).then(val=>{res.send(val)})
  }
  return;
})
//
/**
 * * Routers for "create"
 */
router.post('/:dbname', (req: Request, res: Response) => {
  EmployeeController.action_create_employee(req).then(val=>{res.send(val)})
  return;
})
//
/**
 * * Routers for "update"
 */
router.put('/:dbname/:docid', (req: Request, res: Response) => {
  EmployeeController.action_update_employee(req).then(val=>{res.send(val)})
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