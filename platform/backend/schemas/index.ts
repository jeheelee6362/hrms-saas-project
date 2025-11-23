import Joi, { ObjectSchema } from "joi";
//
import * as employeeSchema from "./Employee.schema";
import employerSchema from "./Employer.schema";
import incomeSchema from "./Income.schema";
import allowanceSchema from "./TaxAllowance.schema";
import deductionSchema from "./TaxDeduction.schema";
import * as userSchema from "./User.schema";
//
export default {
    "/user/login": userSchema.loginCredential,
    "/user/password": userSchema.updatePassword,
    "/user/tel": userSchema.updateContactTel,
    "/user": userSchema.userSchema,
    //
    "/employees/basics": employeeSchema.employeeBasics,
} as {[key:string]:ObjectSchema}