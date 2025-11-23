// services/PayrollComponent.service.ts
// * Service orders as: viewMany => viewAll => viewPag => store
// * Using camelCase as service naming convention

import { couchdb } from '../config/couchdb'
import { IDBURL,IDocURL,IDdocPagination,IPayrollComponent,IDocsURL } from '../models'
 
//
class EarningsComponentService {

    /**
     * @description Retrieve queried earnings components in an organization using CouchDB ddoc "_design/earnings"
     * @param dt {object} Interface IDocsURL
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async viewMany(dt:IDocsURL)  {
        try {
            const response = await couchdb.post(`/${dt.dbName}/_design/payrollcomponent/_view/${dt.view}`,
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
     * @description Retrieve all earnings components in an organization using CouchDB ddoc "_design/earnings"
     * @param dt {object} Interface IDBURL
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async viewAll(dt:IDBURL)  {
        try {
            const response = await couchdb.get(`/${dt.dbName}/_design/payrollcomponent/_view/${dt.view}`) 
            return {success: true, body: response.data}
        } catch (err) {
            return {success: false, error: err}
        }
    }
    /**
     * @description Retrieve paginated earnings components in an organization using CouchDB ddoc "_design/earnings"
     * @param dt {object} Interface IDdocPagination
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async viewPag(dt:IDdocPagination)  {
        try {
            const response = await couchdb.get(`/${dt.dbName}/_design/payrollcomponent/_view/${dt.view}?startkey="${dt.startKey}"&limit=${dt.limit}`) 
            return {success: true, body: response.data}
        } catch (err) {
            return {success: false, error: err}
        }
    }
    /**
     * @description Create or update a single eanings component doc in an organizations's database
     * @param dt1 {object} Interface IDocURL
     * @param dt2 {object} Interface IPayrollComponent
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async store (dt1:IDocURL,dt2:IPayrollComponent)  {
        try {
            const response = await couchdb.put(`/${dt1.dbName}/${dt1.docId}`,dt2) 
            return {success: true, body: response.data}
        } catch (err) {
            return {success: false, error: err}
        }
    }

}
class DeductionsComponentService {

    /**
     * @description Retrieve queried deductions components in an organization using CouchDB ddoc "_design/deductions"
     * @param dt {object} Interface IDocsURL
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async viewMany(dt:IDocsURL)  {
        try {
            const response = await couchdb.post(`/${dt.dbName}/_design/payrollcomponent/_view/${dt.view}`,
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
     * @description Retrieve all deductions components in an organization using CouchDB ddoc "_design/deductions"
     * @param dt {object} Interface IDBURL
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async viewAll(dt:IDBURL)  {
        try {
            const response = await couchdb.get(`/${dt.dbName}/_design/payrollcomponent/_view/${dt.view}`) 
            return {success: true, body: response.data}
        } catch (err) {
            return {success: false, error: err}
        }
    }
    /**
     * @description Retrieve paginated deductions components in an organization using CouchDB ddoc "_design/deductions"
     * @param dt {object} Interface IDdocPagination
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async viewPag(dt:IDdocPagination)  {
        try {
            const response = await couchdb.get(`/${dt.dbName}/_design/payrollcomponent/_view/${dt.view}?startkey="${dt.startKey}"&limit=${dt.limit}`) 
            return {success: true, body: response.data}
        } catch (err) {
            return {success: false, error: err}
        }
    }
    /**
     * @description Create or update a single deductions component doc in an organizations's database
     * @param dt1 {object} Interface IDocURL
     * @param dt2 {object} Interface IPayrollComponent
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async store (dt1:IDocURL,dt2:IPayrollComponent)  {
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
    EarningsComponentService,
    DeductionsComponentService
} 