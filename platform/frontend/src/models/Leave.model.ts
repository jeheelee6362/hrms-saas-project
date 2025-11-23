export interface ILeaveRequest {
    requestId: string,
    leavePolicy: string,
    assignee: string,
    leaveSchedule: [string,string],
    reason: string,
    status: string,
    attachment: string
} 

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
interface ILeaveProfile {
    marritalStatus: string[],
    gender: string[],
    department: string[],
    designation: string[],
    shift: string[]
}
export interface ILeavePolicy {
    policyId: string,
    // form step 1 - details
    name: string,
    isPaid: boolean,
    isAuto: boolean,
    unit: string,
    validPeriod: [string,string],
    // form step 2 - entitlement
    entitlements: ILeaveEntitlement[],
    // form step 3 - applicability
    applyProfile: ILeaveProfile,
    exemptProfile: ILeaveProfile,
    // form step 4 - restrictions
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