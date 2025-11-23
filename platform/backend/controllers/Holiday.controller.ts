// controllers/Holiday.controller.ts
// * Controller orders as: viewmany => viewall => viewpag => create => update
// * Using snake_case as controller naming convention
// * controller names begin with "action_"

import { Request } from 'express'
import { getErrorMessage } from '../middleware'
import { IDdocPagination,IDocURL,IDocsURL,IHoliday,IDBURL } from '../models'
import getUUIDv5 from '../utils/uuid'
//
import HolidayService from '../services/Holiday.service'
import DocService from '../services/Doc.Service'
import ThirdPartyService from '../services/ThirdParty.service'
const DocServiceInstance = new DocService.DocService()
const HolidayServiceInstance = new HolidayService.HolidayService()
const ThirdPartyServiceInstance = new ThirdPartyService.ThirdPartyService()
// 
/** 
 * * ---------------------------------------- viewmany ----------------------------------------
 */
const action_viewmany_holiday = async (req:Request) => { 
  try {
    const dt = {
      dbName: req.params.dbname,
      docs: req.query.docs,
      view: "fetch_all"
    } as IDocsURL
    const res = await HolidayServiceInstance.viewMany(dt)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
/** 
 * * ---------------------------------------- viewall ----------------------------------------
 */
const action_viewall_holiday = async (req: Request) => {
  try {
    const dt = {
      dbName: req.params.dbname,
      view: "fetch_all"
    };
    const res = await HolidayServiceInstance.viewAll(dt);
    return res;
  } catch (err) {
    return getErrorMessage(err);
  }
};
/** 
 * * ---------------------------------------- viewpag ----------------------------------------
 */
const action_viewpag_holiday = async (req: Request) => { 
  try {
    const [nameFilter, typeFilter, dateFilter] = JSON.parse(req.query.startkey! as string);
    const endKey = JSON.parse(req.query.endkey! as string);
    const dateEnd = endKey[endKey.length - 1];

    let customHolidays: any[] = [];
    let publicHolidays: any[] = [];

    if (typeFilter === 'all' || typeFilter === 'custom') {
      const dt = {
        dbName: req.params.dbname,
        startKey: dateFilter,
        endKey: dateEnd
      } as IDdocPagination;
      const res = await HolidayServiceInstance.viewPag(dt);
      customHolidays = [];
      customHolidays = res.body.rows
        .filter((holiday: any) => nameFilter === null || nameFilter === '' || holiday.value.name.toLowerCase().includes(nameFilter))
        .map((holiday: any) => {
          return holiday
        })
    }

    if (typeFilter === 'all' || typeFilter === 'public') {
      const res = await ThirdPartyServiceInstance.viewPublicHoliday('HK', '2024');
      publicHolidays = res.body
        .filter((holiday: any) => 
        (nameFilter === null || nameFilter === '' || holiday.name.toLowerCase().includes(nameFilter)) &&
        (dateFilter === null || (new Date(dateFilter) <= new Date(holiday.date) && new Date(dateEnd) >= new Date(holiday.date)))
      )
        .map((holiday: any) => {
          const idAndKey = `HOL${holiday.date.replace(/-/g, '')}`;
          return {
            id: idAndKey,
            key: idAndKey,
            value: {
              name: holiday.name,
              date: holiday.date,
              holidayType: "Public",
              holidayId: idAndKey
            }
          };
        });
    }

    let combinedRows = [];
    if (typeFilter === 'all') {
      combinedRows = [...customHolidays, ...publicHolidays];
    } else if (typeFilter === 'public') {
      combinedRows = publicHolidays;
    } else if (typeFilter === 'custom') {
      combinedRows = customHolidays;
    }

    combinedRows.sort((a, b) => new Date(a.value.date).getTime() - new Date(b.value.date).getTime());

    return {
      success: true,
      body: {
        total_rows: combinedRows.length,
        offset: 0,
        rows: combinedRows
      }
    };
  } catch (err) {
    return {
      success: false,
      error: getErrorMessage(err)
    };
  }
};
/** 
 * * ---------------------------------------- create ----------------------------------------
 */
const action_create_holiday = async (req:Request) => { 
  try {
    const dt1 = {
      dbName: req.params.dbname,
      docId: getUUIDv5.static("holiday"+req.body.holidayId),
    } as IDocURL
    const dt2 = {
      docType: "holiday",
      holidayType: "Custom",     
      holidayId: req.body.holidayId,   
      name: req.body.name,
      date: req.body.date
    } as IHoliday
    const res = await HolidayServiceInstance.store(dt1,dt2)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
/** 
 * * ---------------------------------------- update ----------------------------------------
 */
const action_update_holiday = async (req:Request) => { 
  try {
    const dt1 = {
      dbName: req.params.dbname,
      docId: req.params.docid,
    } as IDocURL
    const _res = await DocServiceInstance.view(dt1)
    const dt2 = {
      _rev: _res.body._rev,
      docType: "holiday",
      holidayType: "custom",    
      holidayId: req.body.holidayId,        
      name: req.body.name,
      date: req.body.date,
    } as IHoliday
    const res = await HolidayServiceInstance.store(dt1,dt2)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
//
export {
  action_viewmany_holiday,
  action_viewall_holiday,
  action_viewpag_holiday,
  action_create_holiday,
  action_update_holiday
}