// models/index.ts
// TODO: Organize interfaces with separate files at the end
// ! Do not use this file to write interfaces, only for import and export

/**
 * @description Service param model of "database" for request URL
 */
export interface IDBURL {
    dbName: string,
    view?: string
}

/**
 * @description Service param model of "database and document" for request URL
 */
export interface IDocURL {
    dbName: string,
    docId: string, 
    rev?: string
}

/**
 * @description Service param model of "many documents" for request URL
 */
export interface IDocsURL {
    dbName: string,
    docs: string[], 
    view?: string
}

/**
 * @description Service param model for CouchDB ddoc pagination
 */
export interface IDdocPagination {
    dbName: string,
    view?: string,
    startKey: string | any[],
    endKey?: string,
    limit?: number
}

/**
 * @description Model for a member and contacts
 * ! Do not export this interface, use it internally
 */
interface IMemberContact {
    fullName: string,
    relationship: string,
    mobileNumber: string
}

/**
 * @description Model for a education and job experiences
 * ! Do not export this interface, use it internally
 */
interface IExperience {
    title: string,
    organization: string,
    servePeriod: [string,string]
}

/**
 * @description Service param model for creating employee document
 */
export interface IEmployee {
    _rev?: string,
    docType: string, // default as "employee"
    employeeId: string,
    givenName: string,
    middleName: string,
    surname: string,
    chineseName: string,
    suffix: string,

    employeePayType: string,
    amountPerPayCycle: string,
    payPeriod: string,
    joinDate: string,
    endDate: string,
    shift: string,
    designation: string,
    department: string,

    hkidCardNumber: string,
    passportNumber: string,
    passportPlaceOfIssue: string,
    emailAddress: string,
    mobileNumber: string,
    birthDate: string,
    residentialAddress: string,
    postalAddress: string,
    marritalStatus: {
            isMarried: boolean,
            spouseFullName: string,
            identityNumber: string,
            passportPlaceOfIssue: string
        },
    emergencyContacts: {
        primary: IMemberContact,
        secondary: IMemberContact
    },
    educationRecord: IExperience[],
    experienceRecord: IExperience[],
    payment: {
            method: string,
            bankName: string,
            bankCode: string,
            bankAccountNumber: string,
            swiftCode: string
        }
}

/**
 * @description Service param model for creating holiday (custom) document
 */
export interface IHoliday { 
    _rev?: string,
    docType: string,                        // default as "holiday" 
    holidayType: string,                      // default as "custom" for user-defined, "statutory" from gov          
    holidayId: string,  
    name: string,
    date: string
}

/**
 * @description Service param model for creating regular shift document
 */
export interface IRegularShift { 
    _rev?: string,
    docType: string,                        // default as "shift"
    shiftType: string,                      // default as "regular"    
    shiftId: string,        
    name: string,
    schedule: [string,string],
    break: [string,string][]
    appliedDays: string[]                   // Monday Sunday
}

/**
 * @description Service param model for creating flexible shift document
 */
export interface IFlexibleShift {
    _rev?: string,
    docType: string,                        // default as "shift"
    shiftType: string,                      // default as "flexible"
    shiftId: string,
    name: string,
    assignedHours: number,
    assignedHoursPeriod: string
}

/**
 * @description Service param model for creating organization document
 */
export interface IOrganization {
    _rev?: string,
    docType: string,                        // default as "organization"
    organizationId: string,
    name: string,
    dateCreated: string,
    pic: string,
    description: string,
    dir: string,
    members: string[]
}

/**
 * @description Service param model for creating designation document
 */
export interface IDesignation {
    _rev?: string,
    docType: string,                        // default as "designation"
    designationId: string,
    name: string,
    department: string                      // _id (uuid) of organization document
}

/**
 * @description Service param model for creating leave document
 */
export interface ILeaveRequest {
    _rev?: string,
    docType: string,                       // default as "leave"
    requestId: string,
    leavePolicy: string,                   // _id (uuid) of leavepolicy document
    assignee: string,                      // _id (uuid) of employee document
    leaveSchedule: [string,string],
    reason: string,
    status: string,
    attachment: string
}

/**
 * @description Model for a entitlement options for leave policy
 * ! Do not export this interface, use it internally
 */
interface ILeaveEntitlement {
    effectiveAfter: number,
    effectiveAfterUnit: string,
    scheduleTime: number,
    scheduleTimeUnit: string,
    scheduleWorkTime: number,
    scheduleWorkTimeUnit: string,
    //
    defineAccrual: boolean,
    daysCredit: number,
    frequencyCredit: string,
    whichDayCredit: string,
    whichDayCreditPeriod: string,
    //
    defineReset: boolean,
    frequencyReset: string,
    whichDayReset: string,
    whichDayResetPeriod: string,
    //
    defineForward: boolean,
    forwardNumber: number, // percentage = 0.1, or unit 100 
    forwardUnitType: string,
    maxCarryForward: number,
    //
    defineEncash: boolean,
    encashNumber: number,
    encashUnitType: string, // percentage or unit
    maxEncashment: number, // percentage or unit 
}

/**
 * @description Model for leave grantee profile specifications
 * ! Do not export this interface, use it internally
 */
interface ILeaveProfile {
    marritalStatus: string[],
    gender: string[],
    department: string[],
    designation: string[],
    shift: string[]
}

/**
 * @description Service param model for creating leave policy document
 */
export interface ILeavePolicy {
    _rev?: string,
    docType: string,                        // default as "leavepolicy"
    policyId: string,
    name: string,
    isPaid: boolean,
    isAuto: boolean,
    unit: string,
    validPeriod: [string,string],
    entitlements: ILeaveEntitlement[],
    applyProfile: ILeaveProfile,
    exemptProfile: ILeaveProfile,
    ruleExceedBalance: {
        define: boolean,
        treat: string // nolimit, yearend, lop
    },
    ruleSandwich: {
        define: boolean,
        considerDaysWeekend: boolean,
        daysWeekend: number,
        considerDaysHoliday: boolean,
        daysHoliday: number
    },
    noClubbingWith: string[],
    docRequired: boolean,
    daysDocRequired: number,
    allowPastRequest: boolean,
    specifyDaysPastRequest: boolean,
    daysPastRequest: number,
    allowFutureRequest: boolean,
    specifyDaysFutureRequest: boolean,
    daysBeforeRequest: number,
    allowAdminOnly: boolean,
    defineMinDays: boolean,
    minDaysPerRequest: number,
    defineMaxDays: boolean,
    maxDaysPerRequest: number,
    defineMaxConsecutive: boolean,
    maxDaysConsecutive: number,
    defineGapDays: boolean,
    minGapDaysBetweenRequest: number,
    maxRequestsPerPeriod: number, 
    perPeriod: string
}

/**
 * @description Model for employee clock-in and clock-out events
 * ! Do not export this interface, use it internally
 */
interface IClockEvent {
    clockIn: string,
    clockOut: string
}

/**
 * @description Service param model for creating employee attendance document
 */
export interface IAttendance {
    _rev?: string,
    docType: string,                        // default as "attendance"
    attendanceId: string,
    attendee: string,
    date: string,
    clockLog: IClockEvent[]
}

/**
 * @description Serice param model for creating payroll component of an organization
 */
export interface IPayrollComponent {
    _rev?: string,
    docType: string,                        // default as "payrollcomponent"
    componentType: 'earnings' | 'deductions',
    componentId: string,
    name: string,
    unit: number | null,
    rate: {
        value: number,
        base: 'Hourly' | 'Daily'
    } | null,
    type: "Default" | "Custom"
}