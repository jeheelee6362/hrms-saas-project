import Joi from 'joi'
//
const employerSchema = Joi.object().keys({
    employerName: Joi.string().required(), // Employer name
    address: Joi.string().required(), // Employer address
    contactTel: Joi.string().required(), // Employer telephone number
    contactEm: Joi.string().email().required(), // Employer email address
    bankNm: Joi.string().required(), // Employer bank name
    bankAccNo: Joi.string().required(), // Employer bank account number
    liability: Joi.number(), // Payment liable to Attofund
    paymentDue: Joi.date(), // Next payment date
    serviceChrg: Joi.number().min(0).max(1), // Service.charge in, 1 = 100%
    contactTrmntn: Joi.date(), // Date of contract termination with Attofund
})
//
export default employerSchema