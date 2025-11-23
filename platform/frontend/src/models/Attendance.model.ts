export interface IClockEvent {
    clockIn: string,
    clockOut: string
}

export interface IAttendance {
    attendanceId: string,
    attendee: string,
    date: string,
    clockLog: IClockEvent[]
}