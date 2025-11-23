const employee = {
    "_id": "uuid",
    "employeId": "",
    "givenName": "",
    "middleName": "",
    "surname": "",
    "chineseName": "",
    "suffix": "",
    
    "employeePayType": "",
    "amountPerPayCycle": "",
    "payPeriod": "",
    "joinDate": "",
    "endDate": "",
    "shift": "",
    "designation": "",
    "department": "",
    
    "hkidCardNumber": "",
    "passportNumber": "",
    "passportPlaceOfIssue": "",
    "emailAddress": "",
    "mobileNumber": "",
    "birthDate": "",
    "residentialAddress": "",
    "postalAddress": "",
    "marritalStatus": {
        "isMarried": true,
        "spouseFullName": "",
        "hkidCardNumber": "",
        "passportNumber": "",
        "passportPlaceOfIssue": ""
    },
    "payment": {
        "method": "",
        "bankName": "",
        "bankCode": "",
        "bankAccountNumber": "",
        "swiftCode": ""
    }

}

const holidays = [
        {
            title: "",
            date: "",
            weekday: "",
            type: ""
        }
    ]

const leave = {

}

const regularShift = [
    {
        name: "",
        startTime: "",
        endTime: "",
        break: [
            {
                startTime: "",
                endTime: ""
            }
        ]
    }
]
const flexibleShift = [
    {
        name: "",
        assignedHours: "",
        assignedPeriod: ""
    }
]

const organization = [
    {
        name: "",
        dateCreated: "",
        pic: "",
        description: "",
        parent: "",
        children: [
            {
                name: ""
            }
        ],
        members: [
            {
                name: "",
                designation: "",
                joinDate: "",
            }
        ]
    }
]