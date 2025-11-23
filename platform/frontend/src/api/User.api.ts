import HttpService from "./template";
import { APIModel,EmployeeModel } from '../models';

const http = new HttpService();

const getUser = async () => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+'/api/v1/users');
    console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}

export default {
  getUser
} 