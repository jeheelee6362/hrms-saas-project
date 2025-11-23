import { Router, Request, Response } from 'express'
//
import { SchemaValidator } from '../middleware';
import { UserController } from '../controllers'  
import getUUIDv5 from '../utils/uuid'
//
const router = Router()
//
//
router.get('/', (req: Request, res: Response) => {
  UserController.action_viewAll_user().then(val=>{res.send(val)})
  return;
})
router.get('/:email', (req: Request, res: Response) => {
  UserController.action_view_user(getUUIDv5.static(req.params.email)).then(val=>{res.send(val)})
  return;
})
router.get('/:email/email', (req: Request, res: Response) => {
  UserController.action_view_user_email(getUUIDv5.static(req.params.email)).then(val=>{res.send(val)})
  return;
})
router.get('/:email/tel', (req: Request, res: Response) => {
  UserController.action_view_user_tel(getUUIDv5.static(req.params.email)).then(val=>{res.send(val)})
  return;
})
router.get('/:email/type', (req: Request, res: Response) => {
  UserController.action_view_user_type(getUUIDv5.static(req.params.email)).then(val=>{res.send(val)})
  return;
})
//
router.post('/', SchemaValidator("/user"), (req: Request, res: Response) => {
  UserController.action_create_user(req).then(val=>{res.send(val)})
  return;
})
//
router.put('/:email/password', SchemaValidator("/user/password"), (req: Request, res: Response) => {
  UserController.action_update_user_password(getUUIDv5.static(req.params.email),req).then(val=>{res.send(val)})
  return;
})
router.put('/:email/tel', SchemaValidator("/user/tel"), (req: Request, res: Response) => {
  UserController.action_update_user_tel(getUUIDv5.static(req.params.email),req).then(val=>{res.send(val)})
  return;
})
//
router.delete('/:email', (req: Request, res: Response) => {
  UserController.action_destroy(getUUIDv5.static(req.params.email)).then(val=>{res.send(val)})
  return;
})

export default router