import { Request } from 'express'
import { DocService, UserService } from '../services'
import { getErrorMessage } from '../middleware'
//
//
const action_viewAll_user = async () => {
  try {
    const res = await DocService.viewAllDocs('users')
    return res
  } catch (err) { 
    return getErrorMessage(err)
  }
}
const action_view_user = async (uuid:string) => {
  try {
    const res = await DocService.viewDoc('users',`${uuid}`) 
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_view_user_email = async (uuid:string) => {
  try {
    const res = await UserService.viewUserEmail(`${uuid}`) 
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_view_user_tel = async (uuid:string) => {
  try {
    const res = await UserService.viewUserContactTel(`${uuid}`) 
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_view_user_type = async (uuid:string) => {
  try {
    const res = await UserService.viewUserUserType(`${uuid}`) 
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
//
const action_create_user = async (req:Request) => {
  try {
    const res = await UserService.createUser(req)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
//
const action_update_user_password = async (uuid:string,req:Request) => {
  try {
    const old = await DocService.viewDoc('users',`${uuid}`)
    const res = await UserService.updateUserPassword(uuid,old,req)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
const action_update_user_tel = async (uuid:string,req:Request) => {
  try {
    const old = await DocService.viewDoc('users',`${uuid}`)
    const res = await UserService.updateUserTel(uuid,old,req)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}
//
const action_destroy = async (uuid:string) => {
  try {
    const rev = await DocService.viewDocRev('users',`${uuid}`)
    const res = await DocService.destroyDoc('users',uuid,rev)
    return res
  } catch (err) {
    return getErrorMessage(err)
  }
}

export {
  action_viewAll_user,
  action_view_user,
  action_view_user_email,
  action_view_user_tel,
  action_view_user_type,
  action_create_user,
  action_update_user_password,
  action_update_user_tel,
  action_destroy,
}