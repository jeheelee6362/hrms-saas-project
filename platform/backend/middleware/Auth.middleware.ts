import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
//
import { SECRET_ACCESS_TOKEN } from '../config'
//
//
export interface CustomRequest extends Request {
 token: string | JwtPayload;
}
//
export const auth = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '');

   if (!token) {
     throw new Error();
   }

   const decoded = jwt.verify(token, SECRET_ACCESS_TOKEN!);
   (req as CustomRequest).token = decoded;

   next();
 } catch (err) {
   res.status(401).send('Please authenticate');
 }
}
//
export const getToken = (_user:string,_role:string) => {
  const token = jwt.sign({user:_user, role:_role},SECRET_ACCESS_TOKEN!,{expiresIn: '2 days'})
  return { account: { _user, _role }, token: token }
}
