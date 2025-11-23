// services/Shift.service.ts
// * Service orders as: viewMany => viewAll => viewPag => store
// * Using camelCase as service naming convention

import { couchdb } from '../config/couchdb'
import { IDBURL,IDocURL,IDdocPagination,IRegularShift,IFlexibleShift,IDocsURL } from '../models'
 
//
class RegularShiftService {

    /**
     * @description Retrieve queried regular shifts in an organization using CouchDB ddoc "_design/shift"
     * @param dt {object} Interface IDocsURL
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async viewMany(dt:IDocsURL)  {
        try {
            const response = await couchdb.post(`/${dt.dbName}/_design/shift/_view/${dt.view}`,
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
     * @description Retrieve all regular shifts in an organization using CouchDB ddoc "_design/shift"
     * @param dt {object} Interface IDBURL
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async viewAll(dt:IDBURL)  {
        try {
            const response = await couchdb.get(`/${dt.dbName}/_design/shift/_view/${dt.view}`) 
            return {success: true, body: response.data}
        } catch (err) {
            return {success: false, error: err}
        }
    }
    /**
     * @description Retrieve paginated regular shifts in an organization using CouchDB ddoc "_design/shift"
     * @param dt {object} Interface IDdocPagination
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async viewPag(dt:IDdocPagination)  {
        try {
            const response = await couchdb.get(`/${dt.dbName}/_design/shift/_view/${dt.view}?startkey="${dt.startKey}"&limit=${dt.limit}`) 
            return {success: true, body: response.data}
        } catch (err) {
            return {success: false, error: err}
        }
    }
    /**
     * @description Create or update a single regular shift doc in an organizations's database
     * @param dt1 {object} Interface IDocURL
     * @param dt2 {object} Interface IRegularShift
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async store (dt1:IDocURL,dt2:IRegularShift)  {
        try {
            const response = await couchdb.put(`/${dt1.dbName}/${dt1.docId}`,dt2) 
            return {success: true, body: response.data}
        } catch (err) {
            return {success: false, error: err}
        }
    }

}
class FlexibleShiftService {

    /**
     * @description Retrieve queried flexible shifts in an organization using CouchDB ddoc "_design/shift"
     * @param dt {object} Interface IDocsURL
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async viewMany (dt:IDocsURL) {
        try {
            const response = await couchdb.post(`/${dt.dbName}/_design/shift/_view/${dt.view}`,
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
     * @description Retrieve all flexible shifts in an organization using CouchDB ddoc "_design/shift"
     * @param dt {object} Interface IDBURL
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async viewAll (dt:IDBURL) {
        try {
            const response = await couchdb.get(`/${dt.dbName}/_design/shift/_view/${dt.view}`)
            return {success: true, body: response.data}
        } catch (err) {
            return {success: false, error: err}
        }
    }
    /**
     * @description Retrieve paginated flexible shifts in an organization using CouchDB ddoc "_design/shift"
     * @param dt {object} Interface IDdocPagination
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async viewPag (dt:IDdocPagination) {
        try {
            const response = await couchdb.get(`/${dt.dbName}/_design/shift/_view/${dt.view}?startkey="${dt.startKey}"&limit=${dt.limit}`)
            return {success: true, body: response.data}
        } catch (err) {
            return {success: false, error: err}
        }
    }
    /**
     * @description Create or update a single flexible shift doc in an organization's database
     * @param dt1 {object} Interface IDocURL
     * @param dt2 {object} Interface IFlexibleShift
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async store (dt1:IDocURL,dt2:IFlexibleShift)  {
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
    RegularShiftService,
    FlexibleShiftService
} 