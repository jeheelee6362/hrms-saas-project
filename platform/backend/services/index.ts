import { Request } from 'express'
import { couchdb } from '../config/couchdb'
//
import getUUIDv5 from '../utils/uuid'
import { getSalt, getHash, hashMatch } from '../utils/bcrypt'
import { Auth } from '../middleware'
//
const DocService = {
    viewAllDocs: async (db:string) => {
        return (await couchdb.get(`/${db}/_all_docs`)).data
    },
    viewDoc: async (db:string,doc:string) => {
        return (await couchdb.get(`/${db}/${doc}`)).data
    },
    viewDocRev: async (db:string,doc:string) => {
        return (await couchdb.get(`/${db}/${doc}`)).data._rev
    },
    destroyDoc: async (db:string,doc:string,rev:string) => {
        return (await couchdb.delete(`/${db}/${doc}?rev=${rev}`)).data
    }
}
const AuthService = {
    login: async (req:Request) => {
        const doc = getUUIDv5.static(req.body.email)
        const fetch = await couchdb.get(`/users/${doc}`)
        if (fetch.status === 200) {
            if (hashMatch(req.body.password,fetch.data.password)) {
                return Auth.getToken(req.body.email,fetch.data.userType)
            } else {
                return [{ status: 403 }]
            }
        } else {
            return [{ status: 500 }]
        }
    },
}
const UserService = {
    viewUserEmail: async (doc:string) => {
        return (await couchdb.get(`/users/${doc}`)).data.email
    },
    viewUserPassword: async (doc:string) => {
        return (await couchdb.get(`/users/${doc}`)).data.password
    },
    viewUserContactTel: async (doc:string) => {
        return (await couchdb.get(`/users/${doc}`)).data.contactTel
    },
    viewUserUserType: async (doc:string) => {
        return (await couchdb.get(`/users/${doc}`)).data.userType
    },
    createUser: async (req:Request) => {
        const doc = getUUIDv5.static(req.body.email)
        const salt = getSalt()
        return (await couchdb.put(`/users/${doc}`,
        {
            email: req.body.email,
            password: getHash(req.body.password,salt),
            pineapplepizza: salt,
            contactTel: req.body.contactTel,
            userType: req.body.userType,
        })).data
    },
    updateUserPassword: async (doc:string,res_old:any,req:Request) => {
        return (await couchdb.put(`/users/${doc}`,
            {
                email: res_old.email,
                password: getHash(req.body.password,res_old.pineapplepizza),
                pineapplepizza: res_old.pineapplepizza,
                contactTel: res_old.contactTel,
                userType: res_old.userType,
                _rev: res_old._rev,
            }
        )).data
    },
    updateUserTel: async (doc:string,res_old:any,req:Request) => {
        return (await couchdb.put(`/users/${doc}`,
            {
                email: res_old.email,
                password: res_old.password,
                pineapplepizza: res_old.pineapplepizza,
                contactTel: req.body.contactTel,
                userType: res_old.userType,
                _rev: res_old._rev,
            }
        )).data
    }
}
const EmployeeService = {
    createEmployee: async (req:Request) => {
        const doc = getUUIDv5.static(req.body.givenName+req.body.surname)
        //const salt = getSalt()
        return (await couchdb.put(`/attofund/${doc}`,
        {
            docType: "employee",
            employeId: req.body.employeeId,
            givenName: req.body.givenName,
            middleName: req.body.middleName,
            surname: req.body.surname,
            chineseName: req.body.chineseName,
            suffix: req.body.suffix,    

            employeePayType: req.body.employeePayType,
            amountPerPayCycle: req.body.amountPerPayCycle,
            payPeriod: req.body.payPeriod,
            joinDate: req.body.joinDate,
            endDate: req.body.endDate,
            shift: req.body.shift,
            designation: req.body.designation,
            department: req.body.department,
                
            hkidCardNumber: "",
            passportNumber: "",
            passportPlaceOfIssue: "",
            emailAddress: "",
            mobileNumber: "",
            birthDate: "",
            residentialAddress: "",
            postalAddress: "",
            marritalStatus: {
                    isMarried: true,
                    spouseFullName: "",
                    hkidCardNumber: "",
                    passportNumber: "",
                    passportPlaceOfIssue: ""
                },
            payment: {
                    method: "",
                    bankName: "",
                    bankCode: "",
                    bankAccountNumber: "",
                    swiftCode: ""
                }
            
        })).data
    },
    viewAll_design_EmployeeList: async (req:Request) => {
        return (await couchdb.get(`/attofund/_design/employee/_view/employeeList`)).data
    },
    view_design_OrganizationMemberList: async (req:Request) => {
        return (await couchdb.post(`/attofund/_design/employee/_view/organizationMemberList/queries`,{
            queries: [
                {
                    keys: req.body.members
                }
            ]
        })).data
    },
}
//
export {
    DocService,
    AuthService,
    UserService,
    EmployeeService,
}
