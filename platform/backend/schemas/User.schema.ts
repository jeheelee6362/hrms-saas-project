import Joi from 'joi'
//
const loginCredential = Joi.object().keys({
  email: Joi.string().email().required(), // User email address
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(), // User login password
})
//
const updatePassword = Joi.object().keys({
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(), // User login password
})
//
const updateContactTel = Joi.object().keys({
  contactTel:Joi.string().regex(/^[0-9]{8}$/).required(), // User telephone number
})
//
const userSchema = Joi.object().keys({
  email: Joi.string().email().required(), // User email address
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(), // User login password
  contactTel:Joi.string().regex(/^[0-9]{8}$/).required(), // User telephone number
  userType: Joi.string().valid('unemployed','employee','employer','admin').required(), // User type unemployed | employee | employer | admin
})
//
export { 
  loginCredential,
  updatePassword,
  updateContactTel,
  userSchema,
}