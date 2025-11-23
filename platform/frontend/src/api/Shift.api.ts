// api/Shift.api.ts
// * API orders as: get => getMany => getAll => getPag => create => update => remove
// * Using camelCase as api methods naming convention

import HttpService from "./template";
import { APIModel,DocModel,EmployerModel } from '../models';

const http = new HttpService(); 
//
/** 
 * * ---------------------------------------- get ----------------------------------------
 */
const getRegularShift = async (params:DocModel.IDocURL) => {
    try {
      const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/shifts/regular-shifts/${params.dbname}/${params.docid}`);
      //console.log(res);
      return res
      
    } catch (e) {
      console.error(e);
    }
}
const getFlexibleShift = async (params:DocModel.IDocURL) => {
    try {
      const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/shifts/flexible-shifts/${params.dbname}/${params.docid}`);
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
const getManyRegularShift = async (params:DocModel.IDocsURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/shifts/regular-shifts/${params.dbname}`,
  {
    docs: params.docs
  });
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const getManyFlexibleShift = async (params:DocModel.IDocsURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/shifts/flexible-shifts/${params.dbname}`,
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
const getAllRegularShift = async (params:DocModel.IDBURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/shifts/regular-shifts/${params.dbname}`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const getAllFlexibleShift = async (params:DocModel.IDBURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/shifts/flexible-shifts/${params.dbname}`);
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
const getPagRegularShift = async (params:DocModel.IDdocPagination) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/shifts/regular-shifts/${params.dbname}`,
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
const getPagFlexibleShift = async (params:DocModel.IDdocPagination) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/shifts/flexible-shifts/${params.dbname}`,
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
const createRegularShift = async (params1:DocModel.IDBURL,params2:EmployerModel.IRegularShift) => {
  try {
    const res = await http.service().push<APIModel.IParams[],EmployerModel.IRegularShift>(http.getBaseURL()+`/api/v1/shifts/regular-shifts/${params1.dbname}`,
    {          
      shiftId: params2.shiftId,
      name: params2.name,
      schedule: params2.schedule,
      break: params2.break,
      appliedDays: params2.appliedDays   
    });
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const createFlexibleShift = async (params1:DocModel.IDBURL,params2:EmployerModel.IFlexibleShift) => {
  try {
    const res = await http.service().push<APIModel.IParams[],EmployerModel.IFlexibleShift>(http.getBaseURL()+`/api/v1/shifts/flexible-shifts/${params1.dbname}`,
  {
    shiftId: params2.shiftId,
    name: params2.name,
    assignedHours: params2.assignedHours,
    assignedHoursPeriod: params2.assignedHoursPeriod
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
const updateRegularShift = async (params1:DocModel.IDocURL,params2:EmployerModel.IRegularShift) => {
  try {
    const res = await http.service().update<APIModel.IParams[],EmployerModel.IRegularShift>(http.getBaseURL()+`/api/v1/shifts/regular-shifts/${params1.dbname}/${params1.docid}`,
    {           
      shiftId: params2.shiftId,    
      name: params2.name,
      schedule: params2.schedule,
      break: params2.break,
      appliedDays: params2.appliedDays   
    });
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const updateFlexibleShift = async (params1:DocModel.IDocURL,params2:EmployerModel.IFlexibleShift) => {
  try {
    const res = await http.service().update<APIModel.IParams[],EmployerModel.IFlexibleShift>(http.getBaseURL()+`/api/v1/shifts/flexible-shifts/${params1.dbname}/${params1.docid}`,
  {
    shiftId: params2.shiftId,
    name: params2.name,
    assignedHours: params2.assignedHours,
    assignedHoursPeriod: params2.assignedHoursPeriod
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
const removeRegularShift = async (params:DocModel.IDocURL) => {
  try {
    const res = await http.service().remove<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/shifts/regular-shifts/${params.dbname}/${params.docid}`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const removeFlexibleShift = async (params:DocModel.IDocURL) => {
  try {
    const res = await http.service().remove<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/shifts/flexible-shifts/${params.dbname}/${params.docid}`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
//
export default {
  getRegularShift,
  getFlexibleShift,
  //
  getManyRegularShift,
  getManyFlexibleShift,
  //
  getAllRegularShift,
  getAllFlexibleShift,
  //
  getPagRegularShift,
  getPagFlexibleShift,
  //
  createRegularShift,
  createFlexibleShift,
  //
  updateRegularShift,
  updateFlexibleShift,
  //
  removeRegularShift,
  removeFlexibleShift
}