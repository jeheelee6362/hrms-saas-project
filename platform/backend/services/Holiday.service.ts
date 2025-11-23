// services/Holiday.service.ts
// * Service orders as: viewMany => viewAll => viewPag => store
// * Using camelCase as service naming convention

import { couchdb } from '../config/couchdb'
import { IDBURL,IDocURL,IDdocPagination,IHoliday,IDocsURL } from '../models'
 
//
class HolidayService {

    /**
     * @description Retrieve queried holidays in an organization using CouchDB ddoc "_design/holiday"
     * @param dt {object} Interface IDocsURL
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async viewMany(dt:IDocsURL)  {
        try {
            const response = await couchdb.post(`/${dt.dbName}/_design/holiday/_view/${dt.view}`,
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
     * @description Retrieve all holidays in an organization using CouchDB ddoc "_design/holiday"
     * @param dt {object} Interface IDBURL
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async viewAll(dt:IDBURL)  {
        try {
            const response = await couchdb.get(`/${dt.dbName}/_design/holiday/_view/${dt.view}`) 
            return {success: true, body: response.data}
        } catch (err) {
            return {success: false, error: err}
        }
    }
    /**
     * @description Retrieve paginated holidays in an organization using CouchDB ddoc "_design/holiday"
     * @param dt {object} Interface IDdocPagination
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async viewPag(dt:IDdocPagination)  {
        try {
            const response = await couchdb.get(`/${dt.dbName}/_design/holiday/_view/${dt.view}?startkey="${dt.startKey}"&endkey="${dt.endKey}"`) 
            return {success: true, body: response.data}
        } catch (err) {
            return {success: false, error: err}
        }
    }
    /**
     * @description Create or update a single holiday doc in an organizations's database
     * @param dt1 {object} Interface IDocURL
     * @param dt2 {object} Interface IHoliday
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async store (dt1:IDocURL,dt2:IHoliday)  {
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
    HolidayService
} 