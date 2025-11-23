// api/Holiday.api.ts
// * API orders as: get => getMany => getAll => getPag => create => update => remove
// * Using camelCase as api methods naming convention

import HttpService from "./template";
import { APIModel,DocModel,EmployerModel} from '../models';

const http = new HttpService(); 
//
/** 
 * * ---------------------------------------- get ----------------------------------------
 */
const getHoliday = async (params:DocModel.IDocURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/holidays/${params.dbname}/${params.docid}`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
//
/** 
 * * ---------------------------------------- getMany ----------------------------------------
 * @description Get many queried results of the type.
 */
const getManyHoliday = async (params:DocModel.IDocsURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/holidays/${params.dbname}`,
  {
    docs: params.docs
  });
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
//
/** 
 * * ---------------------------------------- getAll ----------------------------------------
 * @description Get all results of the type.
 */
const getAllHoliday = async (params:DocModel.IDBURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/holidays/${params.dbname}`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
//
/** 
 * * ---------------------------------------- getPag ----------------------------------------
 * @description Get paginated results of the type.
 */ 
const getPagHoliday = async (params:DocModel.IDdocPagination) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/holidays/${params.dbname}`,
    {
      startkey: params.startkey !== null ? params.startkey : null,
      endkey: params.endkey !== null ? params.endkey : null,
        limit: params.limit !== null ? params.limit : null
    });
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
//
/** 
 * * ---------------------------------------- create ----------------------------------------
 */
const createHoliday = async (params1:DocModel.IDBURL,params2:EmployerModel.IHoliday) => {
  try {
    const res = await http.service().push<APIModel.IParams[],EmployerModel.IHoliday>(http.getBaseURL()+`/api/v1/holidays/${params1.dbname}`,
    {          
      holidayId: params2.holidayId,
      name: params2.name,
      date: params2.date 
    });
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
//
/** 
 * * ---------------------------------------- update ----------------------------------------
 */
const updateHoliday = async (params1:DocModel.IDocURL,params2:EmployerModel.IHoliday) => {
  try {
    const res = await http.service().update<APIModel.IParams[],EmployerModel.IHoliday>(http.getBaseURL()+`/api/v1/holidays/${params1.dbname}/${params1.docid}`,
    {      
      holidayId: params2.holidayId,         
      name: params2.name,
      date: params2.date
    });
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
//
/** 
 * * ---------------------------------------- remove ----------------------------------------
 */
const removeHoliday = async (params:DocModel.IDocURL) => {
  try {
    const res = await http.service().remove<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/holidays/${params.dbname}/${params.docid}`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
//
export default {
  getHoliday,
  getManyHoliday,
  getAllHoliday,
  getPagHoliday,
  createHoliday,
  updateHoliday,
  removeHoliday
}