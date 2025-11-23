// api/PayrollComponent.api.ts
// * API orders as: get => getMany => getAll => getPag => create => update => remove
// * Using camelCase as api methods naming convention

import HttpService from "./template";
import { APIModel,DocModel,PayrollComponentModel } from '../models';

const http = new HttpService(); 
//
/** 
 * * ---------------------------------------- get ----------------------------------------
 */
const getEarningsComponent = async (params:DocModel.IDocURL) => {
    try {
      const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/payroll-components/earnings/${params.dbname}/${params.docid}`);
      //console.log(res);
      return res
      
    } catch (e) {
      console.error(e);
    }
}
const getDeductionsComponent = async (params:DocModel.IDocURL) => {
    try {
      const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/payroll-components/deductions/${params.dbname}/${params.docid}`);
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
const getManyEarningsComponent = async (params:DocModel.IDocsURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/payroll-components/earnings/${params.dbname}`,
  {
    docs: params.docs
  });
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const getManyDeductionsComponent = async (params:DocModel.IDocsURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/payroll-components/deductions/${params.dbname}`,
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
const getAllEarningsComponent = async (params:DocModel.IDBURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/payroll-components/earnings/${params.dbname}`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const getAllDeductionsComponent = async (params:DocModel.IDBURL) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/payroll-components/deductions/${params.dbname}`);
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
const getPagEarningsComponent = async (params:DocModel.IDdocPagination) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/payroll-components/earnings/${params.dbname}`,
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
const getPagDeductionsComponent = async (params:DocModel.IDdocPagination) => {
  try {
    const res = await http.service().get<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/payroll-components/deductions/${params.dbname}`,
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
const createEarningsComponent = async (params1:DocModel.IDBURL,params2:PayrollComponentModel.IPayrollComponent) => {
  try {
    const res = await http.service().push<APIModel.IParams[],PayrollComponentModel.IPayrollComponent>(http.getBaseURL()+`/api/v1/payroll-components/earnings/${params1.dbname}`,
    {          
      componentId: params2.componentId,
      name: params2.name,
      unit: params2.unit,
      rate: params2.rate,
      type: params2.type
    });
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const createDeductionsComponent = async (params1:DocModel.IDBURL,params2:PayrollComponentModel.IPayrollComponent) => {
  try {
    const res = await http.service().push<APIModel.IParams[],PayrollComponentModel.IPayrollComponent>(http.getBaseURL()+`/api/v1/payroll-components/deductions/${params1.dbname}`,
  {
    componentId: params2.componentId,
    name: params2.name,
    unit: params2.unit,
    rate: params2.rate,
    type: params2.type
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
const updateEarningsComponent = async (params1:DocModel.IDocURL,params2:PayrollComponentModel.IPayrollComponent) => {
  try {
    const res = await http.service().update<APIModel.IParams[],PayrollComponentModel.IPayrollComponent>(http.getBaseURL()+`/api/v1/payroll-components/earnings/${params1.dbname}/${params1.docid}`,
    {           
      componentId: params2.componentId,
      name: params2.name,
      unit: params2.unit,
      rate: params2.rate,
      type: params2.type 
    });
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const updateDeductionsComponent = async (params1:DocModel.IDocURL,params2:PayrollComponentModel.IPayrollComponent) => {
  try {
    const res = await http.service().update<APIModel.IParams[],PayrollComponentModel.IPayrollComponent>(http.getBaseURL()+`/api/v1/payroll-components/deductions/${params1.dbname}/${params1.docid}`,
  {
    componentId: params2.componentId,
    name: params2.name,
    unit: params2.unit,
    rate: params2.rate,
    type: params2.type
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
const removeEarningsComponent = async (params:DocModel.IDocURL) => {
  try {
    const res = await http.service().remove<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/payroll-components/earnings/${params.dbname}/${params.docid}`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
const removeDeductionsComponent = async (params:DocModel.IDocURL) => {
  try {
    const res = await http.service().remove<APIModel.IParams[]>(http.getBaseURL()+`/api/v1/payroll-components/deductions/${params.dbname}/${params.docid}`);
    //console.log(res);
    return res
    
  } catch (e) {
    console.error(e);
  }
}
//
export default {
  getEarningsComponent,
  getDeductionsComponent,
  //
  getManyEarningsComponent,
  getManyDeductionsComponent,
  //
  getAllEarningsComponent,
  getAllDeductionsComponent,
  //
  getPagEarningsComponent,
  getPagDeductionsComponent,
  //
  createEarningsComponent,
  createDeductionsComponent,
  //
  updateEarningsComponent,
  updateDeductionsComponent,
  //
  removeEarningsComponent,
  removeDeductionsComponent
}