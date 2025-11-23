import { Router, Request, Response } from 'express'
//
import { SchemaValidator } from '../middleware';
import { AuthController } from '../controllers'  
//
const router = Router()
//
//
router.post('/login', SchemaValidator('/user/login'), (req: Request, res: Response) => {
  AuthController.action_login(req).then(val=>{res.send(val)})
  return;
})
//
router.post('/register', SchemaValidator('/user'), (req: Request, res: Response) => {
  AuthController.action_register(req).then(val=>{res.send(val)})
  return;
})


export default router