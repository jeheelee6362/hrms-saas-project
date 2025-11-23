import { Request } from 'express'
import { AuthService, UserService } from '../services'
import { getErrorMessage } from '../middleware'
//
//
const action_login = async (req:Request) => {
    try {
        const res = await AuthService.login(req)
        return res
    } catch (err) {
        return getErrorMessage(err)    
    }
}
const action_login_admin = async (req:Request) => {
    try {
        const res = await AuthService.login(req)
        return res
    } catch (err) {
        return getErrorMessage(err)
    }
}
//
const action_register = async (req:Request) => {
    try {
        const res = await UserService.createUser(req)
        return res
    } catch (err) {
        return getErrorMessage(err)
    }
}

export {
    action_login,
    action_login_admin,
    action_register,
}