// services/Employee.service.ts
// * Service orders as: viewMany => viewAll => viewPag => store
// * Using camelCase as service naming convention

import {couchdb} from '../config/couchdb'
import { IDBURL,IDocURL,IDocsURL,IDdocPagination,IEmployee } from '../models'

//
class EmployeeService {

    /**
     * @description Retrieve queried employees in an organization using CouchDB ddoc "_design/employee"
     * @param dt {object} Interface IDocsURL
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
        async viewMany(dt:IDocsURL) {
            try {
                const response = await couchdb.post(`/${dt.dbName}/_design/employee/_view/${dt.view}`,
                    {
                        keys: dt.docs
                    }
                ) 
                return {success: true, body: response.data}
            } catch (err) {
                return {success: false, error: err}
            }
    }
    /**
     * @description Retrieve all employees in an organization using CouchDB ddoc "_design/employee"
     * @param dt {object} Interface IDBURL
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async viewAll(dt:IDBURL) {
        try {
            const response = await couchdb.get(`/${dt.dbName}/_design/employee/_view/${dt.view}`) 
            return {success: true, body: response.data}
        } catch (err) {
            return {success: false, error: err}
        }
    }
    /**
     * @description Retrieve paginated employees in an organization using CouchDB ddoc "_design/employee"
     * @param dt {object} Interface IDdocPagination
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async viewPag(dt: IDdocPagination) {
        const keys = Array.isArray(dt.startKey) ? dt.startKey : [dt.startKey];
        const [employeeId, employeeName, contact, designation] = keys.map(key => key as string || '');
      
        const selector = {
            "docType": "employee",
            "$and": [
                {"employeeId": {"$regex": `${employeeId}`}},
                {"$or": [{"givenName": {"$regex": `(?i)${employeeName}`}},{"surname": {"$regex": `(?i)${employeeName}`}}]},
                {"$or":[{"mobileNumber": {"$regex": `${contact}`}},{"emailAddress": {"$regex": `${contact}`}}]},
                {"designation": {"$regex": `${designation}`}}
            ]
        };

        try {
          const response = await couchdb.post(`/${dt.dbName}/_find`, { selector });
          return { success: true, body: response.data.docs };
        } catch (err: any) {
          return { success: false, error: err };
        }
      }
    /**
     * @description Create or update a single employee doc in an organizations's database
     * @param dt1 {object} Interface IDocURL
     * @param dt2 {object} Interface IEmployee
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async store (dt1:IDocURL,dt2:IEmployee)  {
        try {
            const response = await couchdb.put(`/${dt1.dbName}/${dt1.docId}`,dt2) 
            return {success: true, body: response.data}
        } catch (err) {
            return {success: false, error: err}
        }
    }

}
//
export default {
    EmployeeService
}