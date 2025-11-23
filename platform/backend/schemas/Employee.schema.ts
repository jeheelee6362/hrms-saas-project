import Joi from 'joi'
//
const employeeBasics = Joi.object().keys({
    employeeId: Joi.string().allow(null, ''),
    givenName: Joi.string().required(),
    middleName: Joi.string().allow(null, ''),
    surname: Joi.string().required(),
    chineseName: Joi.string().allow(null, ''),
    suffix: Joi.string().valid("Mr", "Mrs", "Ms", "Miss").required(),
    employeePayType: Joi.string().valid("Salaried", "Paid Hourly").required(),
    amountPerPayCycle: Joi.number().required(),
    payPeriod: Joi.string().valid("Monthly", "Semimonthly", "Biweekly", "Weekly", "Daily", "Hourly").required(),
    joinDate: Joi.date().required(),
    endDate: Joi.date().allow(null, ''),
    shift: Joi.string().required(),
    designation: Joi.string().required(),
    department: Joi.string().allow(null, ''),
})
// 
const employeeSchema = Joi.object().keys({
    name: Joi.string().required(), // Employee name
    middlename: Joi.string(), // Employee middlename
    surname: Joi.string().required(), // Employee surname
    nickname: Joi.string(), // Employee nickname
    socialId: Joi.string().required(), // Employee social identification number
    socialIdType: Joi.string().required(), // Employee social identification type
    empTin: Joi.string().required(), // Employee taxpayer identification number
    address: Joi.string().required(), // Employee residence address
    birthdate: Joi.date().greater('1-1-1900').less('now').required(), // Employee date of birth
    gender: Joi.string().required(), // Employee gender
    contactTel:Joi.string().regex(/^[0-9]{10}$/).required(), // Employee telephone number
    contactEm: Joi.string().email().required(), // Employee email address
    occupation: Joi.string().required(), // Employee occupation
    totalSvcRen: Joi.number().required(), // Employee's total service rendered months
    isMarried: Joi.boolean().required(), // Employee marital status
    isDisabled: Joi.boolean().required(), // Whether employee is disabled
    bankNm: Joi.string().required(), // Bank name for renumeration
    bankAccNo: Joi.string().required(), // Bank account number for renumeration
    bankSwift: Joi.string().required() // Bank swift code
})
//
export {
    employeeBasics,
    employeeSchema
}