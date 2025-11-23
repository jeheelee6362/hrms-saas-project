// services/ThirdParty.service.ts
// * Using camelCase as service naming convention
import axios from 'axios';

//
class ThirdPartyService {

    /**
     * @description fetch public holidays for a specified country and year
     * @param country {string} year {string}
     * @returns {Promise<{success: boolean, body: *}|{success: boolean, error: *}>}
     */
    async viewPublicHoliday (country:string,year:string) {
        try {
            const response = await axios.get(`https://date.nager.at/api/v3/publicholidays/${year}/${country}/`) 
            return {success: true, body: response.data}
        } catch (err) {
            return {success: false, error: err}
        }
    }

}
//
export default {
    ThirdPartyService
} 