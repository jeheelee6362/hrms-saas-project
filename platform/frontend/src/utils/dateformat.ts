import { date } from 'quasar'

const date_obj = (dt:string,format:string) => date.extractDate(dt, format)
const date_aft = (dt:Date,format:string) => date.formatDate(dt,format)

export function getDateWithFormat (dt:string,formpre:string,formaft:string) {
    return date_aft(date_obj(dt,formpre),formaft)    
}

export function getDifferenceInDays(dt1:string,dt2:string) {
    const date1 = new Date(dt1)
    const date2 = new Date(dt2)
    const timeDifference = date2.getTime() - date1.getTime()

    return Math.round(timeDifference / (1000*3600*24))
}

export function convertToHoursMinutes(decimal: number): string {
    const hours = Math.floor(decimal);
    const minutes = Math.round((decimal - hours) * 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  }

