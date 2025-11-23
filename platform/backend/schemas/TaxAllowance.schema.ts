import Joi from 'joi'
//
const allowanceSchema = Joi.object().keys({
    totalAll: Joi.number().required(),
    isMarried: Joi.boolean().required(),
    noChldBrth: Joi.number().integer().required(),
    noChldOthrs: Joi.number().integer().required(),
    noGpa60nr: Joi.number().integer().required(),
    noGpa60re: Joi.number().integer().required(),
    noGpa55nr: Joi.number().integer().required(),
    noGpa55re: Joi.number().integer().required(),
    noDepSib: Joi.number().integer().required(),
    isSnglPrnt: Joi.boolean().required(),
    noDisDep: Joi.number().integer().required(),
})
//
export default allowanceSchema