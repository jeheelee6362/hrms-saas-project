// services/Doc.service.ts
// * Service orders as: view => destroy
// * Using camelCase as service naming convention

import { couchdb } from '../config/couchdb'
import { IDBURL,IDocURL } from '../models'

//
class DocService {

    /**
     * @description View a specified document in an organizations's database
     * @param dt {object} Interface IDocURL
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async view (dt:IDocURL) {
        try {
            const response = await couchdb.get(`/${dt.dbName}/${dt.docId}`) 
            return {success: true, body: response.data}
        } catch (err) {
            return {success: false, error: err}
        }
    }
    /**
     * @description Delete a specified document in an organizations's database
     * @param dt {object} Interface IDocURL
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async destroy (dt:IDocURL)  {
        try {
            const response = await couchdb.delete(`/${dt.dbName}/${dt.docId}?rev=${dt.rev}`) 
            return {success: true, body: response.data}
        } catch (err) {
            return {success: false, error: err}
        }
    }

}
//
export default {
    DocService
} 