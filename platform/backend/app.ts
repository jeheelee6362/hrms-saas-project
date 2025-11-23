import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import router from './routes'
import { PORT } from './config'
import { json } from 'body-parser';
//
// 
const app = express();
//
app.use(cors())

app.use(json())

app.use(cookieParser())
//
app.use(router);
//
app.use((err: Error, req: Request, res:Response, next: NextFunction) => {
    res.status(500).json({message: err.message});
  });
//
app.listen(PORT, () => {
  //console.log(`Server running on http://localhost:${PORT}`)
});