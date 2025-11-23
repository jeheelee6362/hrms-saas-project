import Joi from 'joi'
//
const deductionSupSchema = Joi.object().keys({
    deductionFor: Joi.string().required(), // Purpose of deduction (self-education, professional body subscription, etc.)
    amount: Joi.number().required(), // Amount of deduction on request
    isPayerSpouse: Joi.boolean().required(), // Whether the expense paid by spouse
    isApproved: Joi.boolean().required(), // Whether Attofund approves deduction request
    docSbmttd: Joi.boolean().required(), // Whether supporting document is submitted
    isForDep: Joi.boolean().required(), // Whether deduction for aiding dependent
    dependentType: Joi.string(), // Type of dependent (spouse, parent, grandparent, child, sibling)
    dependentAge: Joi.number().integer(), // Current age of dependent
    isDepDiabled: Joi.boolean(), // Whether the dependent specified is disabled
    description: Joi.string() // Description of organization/pension (name, address, provider, etc.) if any
})
//
const deductionSchema = Joi.object().keys({
    totalDeduction: Joi.number().required(), // Total deduction
    profSbscrptn: Joi.number().required(), // Employee's expense for professional body subcscription
    selfEdu: Joi.number().required(), // Employee's expense for self-education
    businessTrp: Joi.number().required(), // Employee's expense for business trip
    otherAllDeduc: Joi.number().required(), // Employee's expense purposedly for employeement
    charitableDntn: Joi.number().required(), // Employee's expense for charitable donation
    elderlyCr: Joi.number().required(), // Employee's expense for elderly residential care
    homeLnInt: Joi.number().required(), // Employee's expense for home loan interest
    yrsDeducHmLn: Joi.number().required(), // Years received home loan interest deduction
    mandatoryMr: Joi.number().required(), // Employee's expense for mandatory MPF/RORS
    voluntaryMpf: Joi.number().required(), // Employee's expense for voluntary MPF
    vhis: Joi.number().required(), // Employee's expense for Voluntary Health Insurance Scheme Policy
    domesticRnts: Joi.number().required(), // Employee's expense for domestic residence rent
    supplimentaries: Joi.array().items(deductionSupSchema)
})
//
export default deductionSchema