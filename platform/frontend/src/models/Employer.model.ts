export interface IHoliday {    
    holidayId: string,                 
    name: string,
    date: string             
}

export interface IRegularShift {   
    shiftId: string,                  
    name: string,
    schedule: [string,string],
    break: [string,string][]
    appliedDays: string[]                  
}

export interface IFlexibleShift {     
    shiftId: string,   
    name: string,
    assignedHours: number,
    assignedHoursPeriod: string
}

export interface IOrganization { 
    organizationId: string,   
    name: string,
    dateCreated: string,
    pic: string,
    description: string,
    dir: string,
    members: string[]
}

export interface IDesignation {       
    designationId: string,
    name: string,
    department: string
}
