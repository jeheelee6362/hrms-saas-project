import { Router } from "express"
import { RateLimit } from "../middleware"
import { Auth } from '../middleware'
//
import UserRouter from './User.routes' 
import EmployeeRouter from './Employee.routes'
import HolidayRouter from './Holiday.routes'
import ShiftRouter from './Shift.routes'
import OrganizationRouter from './Organization.routes'
import DesignationRouter from './Designation.routes'
import LeaveRouter from './Leave.routes'
import AuthRouter from './Auth.routes' 
import PayrollComponentRouter from './PayrollComponent.routes'
import AttendanceRouter from './Attendance.routes'
//
const router = Router()
//
router.use(RateLimit)
//
router.use('/api/v1/auth', AuthRouter)
router.use('/api/v1/users', Auth.auth, UserRouter)
router.use('/api/v1/employees', EmployeeRouter)
router.use('/api/v1/holidays', HolidayRouter)
router.use('/api/v1/shifts', ShiftRouter)
router.use('/api/v1/organizations', OrganizationRouter)
router.use('/api/v1/designations', DesignationRouter)
router.use('/api/v1/leaves', LeaveRouter)
router.use('/api/v1/payroll-components', PayrollComponentRouter)
router.use('/api/v1/attendances', AttendanceRouter)
//
router.use('*', (req, res)=> {
    res.send("Invalid request point")
})
//
export default router