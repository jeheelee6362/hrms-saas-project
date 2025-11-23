// api/Designation.api.ts
// * API orders as: get => getMany => getAll => getPag => create => update => remove
// * Using camelCase as api methods naming convention

import HttpService from "./template";
import { APIModel,DocModel,EmployerModel } from '../models';

const http = new HttpService(); 
//
/** 
 * * ---------------------------------------- get ----------------------------------------
 */
const getDesignation = async (params:DocModel.IDocURL) => {
    try {
      const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/designations/${params.dbname}/${params.docid}`);
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
const getManyDesignation = async (params:DocModel.IDocsURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/designations/${params.dbname}`,
  {
    docs: params.docs
  });
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const getManyDesignationByName = async (params:DocModel.IDocsURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/designations/${params.dbname}/view/by-name`,
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
const getAllDesignation = async (params:DocModel.IDBURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/designations/${params.dbname}`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const getAllDesignationByName = async (params:DocModel.IDBURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/designations/${params.dbname}/view/by-name`);
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
const getPagDesignation = async (params:DocModel.IDdocPagination) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/designations/${params.dbname}`,
    {
      startkey: params.startkey,
        limit: params.limit
    });
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const getPagDesignationByName = async (params:DocModel.IDdocPagination) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/designations/${params.dbname}/view/by-name`,
    {
      startkey: params.startkey,
        limit: params.limit
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
const createDesignation = async (params1:DocModel.IDBURL,params2:EmployerModel.IDesignation) => {
  try {
    const res = await http.service().push<APIModel.IParams[],EmployerModel.IDesignation>(http.getBaseURL()+`/api/v1/designations/${params1.dbname}`,
  {
    designationId: params2.designationId,
    name: params2.name,
    department: params2.department
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
const updateDesignation = async (params1:DocModel.IDocURL,params2:EmployerModel.IDesignation) => {
  try {
    const res = await http.service().update<APIModel.IParams[],EmployerModel.IDesignation>(http.getBaseURL()+`/api/v1/designations/${params1.dbname}/${params1.docid}`,
  {
    designationId: params2.designationId,
    name: params2.name,
    department: params2.department
  });
    console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
//
/** 
 * * ---------------------------------------- remove ----------------------------------------
 */
const removeDesignation = async (params:DocModel.IDocURL) => {
  try {
    const res = await http.service().remove<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/designations/${params.dbname}/${params.docid}`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
//
export default {
  getDesignation,
  getManyDesignation,
  getManyDesignationByName,
  getAllDesignation,
  getAllDesignationByName,
  getPagDesignation,
  getPagDesignationByName,
  createDesignation,
  updateDesignation,
  removeDesignation
}