interface IMemberContact {
  fullName: string,
  relationship: string,
  mobileNumber: string
}

interface IExperience {
  title: string,
  organization: string,
  servePeriod: [string,string]
}

export interface IEmployee {
  employeeId: string,
  givenName: string,
  middleName: string,
  surname: string,
  chineseName: string,
  suffix: string,

  employeePayType: string,
  amountPerPayCycle: string,
  payPeriod: string,
  joinDate: string,
  endDate: string,
  shift: string,
  designation: string,
  department: string,

  hkidCardNumber: string,
  passportNumber: string,
  passportPlaceOfIssue: string,
  emailAddress: string,
  mobileNumber: string,
  birthDate: string,
  residentialAddress: string,
  postalAddress: string,
  marritalStatus: {
          isMarried: boolean,
          spouseFullName: string,
          identityNumber: string,
          passportPlaceOfIssue: string
      },
emergencyContacts: {
          primary: IMemberContact,
          secondary: IMemberContact
     },
educationRecord: IExperience[],
experienceRecord: IExperience[],
  payment: {
          method: string,
          bankName: string,
          bankCode: string,
          bankAccountNumber: string,
          swiftCode: string
      }
}

export interface IEmployeeBasics {
    employeeId: string,
    givenName: string,
    middleName: string,
    surname: string,
    chineseName: string,
    suffix: string,
    employeePayType: string,
    amountPerPayCycle: number,
    payPeriod: string,
    joinDate: string,
    endDate: string,
    shift: string,
    designation: string,
    department: string,
  }
  
  export interface IOrgMemberList {
    members:string[]
  }
