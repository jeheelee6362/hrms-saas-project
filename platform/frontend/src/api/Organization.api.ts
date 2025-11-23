// api/Organization.api.ts
// * API orders as: get => getMany => getAll => getPag => create => update => remove
// * Using camelCase as api methods naming convention

import HttpService from "./template";
import { APIModel,DocModel,EmployerModel } from '../models';

const http = new HttpService(); 
//
/** 
 * * ---------------------------------------- get ----------------------------------------
 */
const getOrganization = async (params:DocModel.IDocURL) => {
    try {
      const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/organizations/${params.dbname}/${params.docid}`);
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
const getManyOrganization = async (params:DocModel.IDocsURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/organizations/${params.dbname}`,
  {
    docs: params.docs
  });
    //console.log(res)
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const getManyOrganizationByName = async (params:DocModel.IDocsURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/organizations/${params.dbname}/view/by-name`,
  {
    docs: params.docs
  });
    //console.log(res)
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
const getAllOrganization = async (params:DocModel.IDBURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/organizations/${params.dbname}`);
    //console.log(res)
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const getAllOrganizationByName = async (params:DocModel.IDBURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/organizations/${params.dbname}/view/by-name`);
    //console.log(res)
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
const getPagOrganization = async (params:DocModel.IDdocPagination) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/organizations/${params.dbname}`,
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
const getPagOrganizationByName = async (params:DocModel.IDdocPagination) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/organizations/${params.dbname}/view/by-name`,
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
const createOrganization = async (params1:DocModel.IDBURL,params2:EmployerModel.IOrganization) => {
  try {
    const res = await http.service().push<APIModel.IParams[],EmployerModel.IOrganization>(http.getBaseURL()+`/api/v1/organizations/${params1.dbname}`,
  {
    organizationId: params2.organizationId,
    name: params2.name,
    dateCreated: params2.dateCreated,
    pic: params2.pic,
    description: params2.description,
    dir: params2.dir,
    members: params2.members
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
const updateOrganization = async (params1:DocModel.IDocURL,params2:EmployerModel.IOrganization) => {
  try {
    const res = await http.service().update<APIModel.IParams[],EmployerModel.IOrganization>(http.getBaseURL()+`/api/v1/organizations/${params1.dbname}/${params1.docid}`,
  {
    organizationId: params2.organizationId, 
    name: params2.name,
    dateCreated: params2.dateCreated,
    pic: params2.pic,
    description: params2.description,
    dir: params2.dir,
    members: params2.members
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
const removeOrganization = async (params:DocModel.IDocURL) => {
  try {
    const res = await http.service().remove<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/organizations/${params.dbname}/${params.docid}`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
//
export default {
  getOrganization,
  getManyOrganization,
  getManyOrganizationByName,
  getAllOrganization,
  getAllOrganizationByName,
  getPagOrganization,
  getPagOrganizationByName,
  createOrganization,
  updateOrganization,
  removeOrganization
}