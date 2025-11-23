import Joi from 'joi'
//
const benefitSchema = Joi.object().keys({
    fringeBnfts: Joi.number(), // Amount of fringe benefits
    paidLiability: Joi.number(), // Amount of tax payer's liabilities paid by employer
    childEdu: Joi.number(), // Employer's contribution to tax payer's child education
    holidayJrny: Joi.number(), // Employer's taxable contribution for employee's holiday journey
    terminationPymnt: Joi.number() // Payment in lieu of notice
})
//
const incomeSchema = Joi.object().keys({
    isWorking: Joi.boolean(), // Whether employee is currently working 
    workToSlry: Joi.number().required(), // Actual amount of income accrued for service
    totalInc: Joi.number().required(), // Total income
    totalAssblInc: Joi.number().required(), // Total assessable income
    netInc: Joi.number().required(), // Net income 
    netChrgblInc: Joi.number().required(), // Net chargeable income
    salary: Joi.number(), // Monthly salary as on contract
    hourlyWg: Joi.number().required(), // Monthly salary converted to hourly wage
    serviceInDays: Joi.number().required(), // Days of employee's service as on contract plus overtime performed
    serviceRenDays: Joi.number().required(), // Days of employee's service rendered
    schedule: Joi.object({ // Array[2] of start and end working time HH:mm to minutes 
        start: Joi.number().integer(),
        end: Joi.number().integer()
    }).required(),
    holiday: Joi.array().items(Joi.number().integer().min(1).max(366)).required(), // Array of holidays in a year including non-working days
    overtimeRt: Joi.number(), // Overtime rate
    overtime: Joi.number().integer(), // Total overtime applied (in a minute)
    isHolidayOt: Joi.boolean().required(), // Whether working on holiday applies overtime rate
    frequencyInDays: Joi.number().integer().required(), // Payment frequency as on contract converted to days
    // customFrequencyInDays: Joi.number().integer(), // Customized payment frequency converted to days
    paymentRcvbl: Joi.number(), // Payment receivable in single payment frequency
    // paymentDue: Joi.date(), // Next payment time 
    paymentPaid: Joi.number(), // Total renumeration made
    bonus: Joi.number(), // Bonus
    deferredPymnt: Joi.number(), // Deferred payment
    rentRms: Joi.number().integer(), // Number of rooms of residence provided by employer
    rentCntrbtns: Joi.number(), // Employee self-contributions to rent
    stockOptns: Joi.number(), // Employee's benefit from stock option from employment
    employerNonRors: Joi.number(), // Employer's contribution to non-RORS
    mr: Joi.number(), // Employer's contribution to MPF/RORS
    isMrRTtrmnt: Joi.boolean(), // Whether receipts on MPF/RORS on retirement
    isMrDth: Joi.boolean(), // Whether receipts on MPF/RORS on death
    isMrIncpct: Joi.boolean(), // Whether receipts on MPF/RORS on incapacity
    isMrTrmntn: Joi.boolean(), // Whether receipts on MPF/RORS on termination
    annualLvDys: Joi.array().items(Joi.number().integer().min(1).max(366)).required(), // Array of annual leave applied (in a number 1 to 365/366)
    sickLvDys: Joi.array().items(Joi.number().integer().min(1).max(366)).required(), // Array of sick leave applied (in a number 1 to 365/366)
    benefits: benefitSchema
})
//
export default incomeSchema