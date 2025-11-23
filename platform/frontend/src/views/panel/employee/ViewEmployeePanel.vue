<template>
  <div class="q-mb-xl">
    <!-- Employee Profile Header -->
    <div>
      <section>
        <h3 class="text-h5 text-weight-medium q-ma-none">
          {{ employeeView.givenName + "'s " }}Profile
        </h3>
        <div class="q-mb-lg flex justify-between">
          <div>
            <q-breadcrumbs
              class="text-body2 text-grey-8 text-weight-medium q-mt-sm"
              active-color="teal-8"
            >
              <q-breadcrumbs-el
                class="hover-underline"
                to="/portal/employer/dashboard"
                label="Dashboard"
              />
              <q-breadcrumbs-el
                class="hover-underline"
                @click="backEmployeeList"
                label="Employee"
              />
              <q-breadcrumbs-el :label="employeeView.givenName + '\'s Profile'" />
            </q-breadcrumbs>
          </div>
        </div>
      </section>
      <q-card
        class="full-width q-mt-sm q-mx-sm"
        style="background-color: rgba(255, 255, 255, 0.75)"
      >
        <section class="row justify-center q-mt-sm q-py-lg">
          <!-- Profile Avatar section -->
          <div class="col">
            <q-item>
              <q-item-section class="q-pl-sm q-pr-lg" top avatar>
                <q-avatar round size="114px">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
              </q-item-section>
              <q-item-section class="q-ml-sm">
                <div class="text-h6 text-weight-bold text-grey-10">
                  {{ employeeView.givenName + " " + employeeView.surname }}
                </div>
                <q-item-label class="text-body1 text-weight-medium text-teal-8">{{
                  employeeView.department
                }}</q-item-label>
                <q-item-label class="text-body2 text-weight-regular text-grey-9">{{
                  employeeView.designation
                }}</q-item-label>
                <br />
                <q-item-label class="text-body2 text-weight-medium text-grey-10">{{
                  "Employee ID: " + employeeView.employeeId
                }}</q-item-label>
                <q-item-label class="text-body2 text-weight-regular text-grey-9">{{
                  "Date of Join: " +
                  getDateWithFormat(employeeView.joinDate, "YYYY-MM-DD", "MMM DD, YYYY")
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <!-- Separator -->
          <q-separator vertical spaced />
          <!-- Profile Contact and Personal Details -->
          <div class="col">
            <q-markup-table
              flat
              separator="none"
              style="background-color: rgba(255, 255, 255, 0)"
            >
              <tr>
                <td
                  class="text-left text-body2 text-weight-medium text-grey-10"
                  style="width: 140px"
                >
                  Mobile:
                </td>
                <td class="text-left text-body2 text-weight-medium text-teal-8">
                  {{ employeeView.mobileNumber }}
                </td>
              </tr>
              <tr>
                <td
                  class="text-left text-body2 text-weight-medium text-grey-10"
                  style="width: 140px"
                >
                  Email:
                </td>
                <td class="text-left text-body2 text-weight-medium text-teal-8">
                  {{ employeeView.emailAddress }}
                </td>
              </tr>
              <tr>
                <td
                  class="text-left text-body2 text-weight-medium text-grey-10"
                  style="width: 140px"
                >
                  Birthday:
                </td>
                <td class="text-left text-body2 text-weight-medium text-grey-7">
                  {{
                    getDateWithFormat(
                      employeeView.birthDate,
                      "YYYY-MM-DD",
                      "MMM DD, YYYY"
                    )
                  }}
                </td>
              </tr>
              <tr>
                <td
                  class="text-left text-body2 text-weight-medium text-grey-10"
                  style="width: 140px"
                >
                  Residential address:
                </td>
                <td class="text-left text-body2 text-weight-medium text-grey-7">
                  {{ employeeView.residentialAddress }}
                </td>
              </tr>
              <tr>
                <td
                  class="text-left text-body2 text-weight-medium text-grey-10"
                  style="width: 140px"
                >
                  Postal address:
                </td>
                <td class="text-left text-body2 text-weight-medium text-grey-7">
                  {{ employeeView.postalAddress }}
                </td>
              </tr>
              <tr>
                <td
                  class="text-left text-body2 text-weight-medium text-grey-10"
                  style="width: 140px"
                >
                  Suffix:
                </td>
                <td class="text-left text-body2 text-weight-medium text-grey-7">
                  {{ employeeView.suffix }}
                </td>
              </tr>
            </q-markup-table>
          </div>
          <q-btn
            class="absolute-top-right flex flex-center bg-grey-3"
            color="grey-8"
            style="top: 20px; right: 20px"
            flat
            round
            size="11px"
            ><q-icon name="las la-pencil-alt"
          /></q-btn>
        </section>
        <q-tabs
          v-model="viewTab"
          dense
          align="left"
          narrow-indicator
          class="text-grey-9 bg-white"
          active-class="text-black"
          indicator-color="teal-8"
        >
          <q-tab no-caps name="personal" label="Personal Information" />
          <q-tab no-caps name="bank" label="Bank & Statutory" />
          <q-tab no-caps name="documents" label="Documents" />
        </q-tabs>
      </q-card>
      <q-separator />
    </div>
    <!-- Employee information details -->
    <div class="q-mt-lg">
      <q-tab-panels v-model="viewTab" animated>
        <!-- Tab1: Personal Information -->
        <q-tab-panel class="bg-blue-grey-1 q-pa-none" name="personal">
          <div class="row q-gutter-x-lg">
            <div class="col">
              <!-- Tab1/Col1/Card1: Personal Informations -->
              <q-card class="q-pb-md" flat>
                <q-card-section class="relative-position">
                  <h6 class="text-h6 text-weight-medium q-mb-none q-mt-sm q-ml-md">
                    Personal Informations
                  </h6>
                  <q-btn
                    class="absolute-top-right flex flex-center bg-grey-3"
                    color="grey-8"
                    style="top: 20px; right: 20px"
                    flat
                    round
                    size="11px"
                    ><q-icon name="las la-pencil-alt"
                  /></q-btn>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <q-markup-table flat separator="none">
                    <tr>
                      <td
                        class="text-left text-body2 text-weight-medium text-grey-10"
                        style="width: 140px"
                      >
                        HKID/Passport No.
                      </td>
                      <td class="text-left text-body2 text-weight-medium text-grey-7">
                        <span v-if="'hkidCardNumber' in employeeView">{{
                          employeeView.hkidCardNumber.length !== 0
                            ? employeeView.hkidCardNumber
                            : employeeView.passportNumber
                        }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="text-left text-body2 text-weight-medium text-grey-10"
                        style="width: 140px"
                      >
                        Place of Issue
                      </td>
                      <td class="text-left text-body2 text-weight-medium text-grey-7">
                        <span v-if="'hkidCardNumber' in employeeView">{{
                          employeeView.hkidCardNumber.length !== 0
                            ? "Hong Kong SAR"
                            : employeeView.passportPlaceOfOrigin
                        }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="text-left text-body2 text-weight-medium text-grey-10"
                        style="width: 140px"
                      >
                        Nationality
                      </td>
                      <td class="text-left text-body2 text-weight-medium text-grey-7">
                        {{ "need add" }}
                      </td>
                    </tr>
                    <tr v-if="'marritalStatus' in employeeView">
                      <td
                        class="text-left text-body2 text-weight-medium text-grey-10"
                        style="width: 140px"
                      >
                        Marital status
                      </td>
                      <td class="text-left text-body2 text-weight-medium text-grey-7">
                        {{ employeeView.marritalStatus.isMarried ? "Married" : "Single" }}
                      </td>
                    </tr>
                    <tr
                      v-if="
                        'marritalStatus' in employeeView &&
                        employeeView.marritalStatus.isMarried
                      "
                    >
                      <td
                        class="text-left text-body2 text-weight-medium text-grey-10"
                        style="width: 140px"
                      >
                        Spouse name
                      </td>
                      <td class="text-left text-body2 text-weight-medium text-grey-7">
                        {{ employeeView.marritalStatus.spouseFullName }}
                      </td>
                    </tr>
                    <tr
                      v-if="
                        'marritalStatus' in employeeView &&
                        employeeView.marritalStatus.isMarried
                      "
                    >
                      <td
                        class="text-left text-body2 text-weight-medium text-grey-10"
                        style="width: 140px"
                      >
                        Spouse<br />HKID/Passport No.
                      </td>
                      <td class="text-left text-body2 text-weight-medium text-grey-7">
                        {{ employeeView.marritalStatus.identityNumber }}
                      </td>
                    </tr>
                  </q-markup-table>
                </q-card-section>
              </q-card>
              <!-- Tab1/Col1/Card2: Bank Information -->
              <q-card class="q-mt-lg q-pb-md" flat>
                <q-card-section class="relative-position">
                  <h6 class="text-h6 text-weight-medium q-mb-none q-mt-sm q-ml-md">
                    Bank Information
                  </h6>
                  <q-btn
                    class="absolute-top-right flex flex-center bg-grey-3"
                    color="grey-8"
                    style="top: 20px; right: 20px"
                    flat
                    round
                    size="11px"
                    ><q-icon name="las la-pencil-alt"
                  /></q-btn>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <q-markup-table flat separator="none">
                    <tr>
                      <td
                        class="text-left text-body2 text-weight-medium text-grey-10"
                        style="width: 140px"
                      >
                        Bank name
                      </td>
                      <td class="text-left text-body2 text-weight-medium text-grey-7">
                        <span v-if="'payment' in employeeView">{{
                          employeeView.payment.bankName
                        }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="text-left text-body2 text-weight-medium text-grey-10"
                        style="width: 140px"
                      >
                        Bank code
                      </td>
                      <td class="text-left text-body2 text-weight-medium text-grey-7">
                        <span v-if="'payment' in employeeView">{{
                          employeeView.payment.bankCode
                        }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="text-left text-body2 text-weight-medium text-grey-10"
                        style="width: 140px"
                      >
                        Bank account No.
                      </td>
                      <td class="text-left text-body2 text-weight-medium text-grey-7">
                        <span v-if="'payment' in employeeView">{{
                          employeeView.payment.bankAccountNumber
                        }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="text-left text-body2 text-weight-medium text-grey-10"
                        style="width: 140px"
                      >
                        SWIFT code
                      </td>
                      <td class="text-left text-body2 text-weight-medium text-grey-7">
                        <span v-if="'payment' in employeeView">{{
                          employeeView.payment.swiftCode
                        }}</span>
                      </td>
                    </tr>
                  </q-markup-table>
                </q-card-section>
              </q-card>
              <!-- Tab1/Col1/Card3: Education Information -->
              <q-card
                class="q-mt-lg q-pb-md"
                flat
                v-if="
                  'educationRecord' in employeeView &&
                  employeeView.educationRecord.length !== 0
                "
              >
                <q-card-section class="relative-position">
                  <h6 class="text-h6 text-weight-medium q-mb-none q-mt-sm q-ml-md">
                    Education Informations
                  </h6>
                  <q-btn
                    class="absolute-top-right flex flex-center bg-grey-3"
                    color="grey-8"
                    style="top: 20px; right: 20px"
                    flat
                    round
                    size="11px"
                    ><q-icon name="las la-pencil-alt"
                  /></q-btn>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <q-timeline color="grey-4" class="q-pl-md q-mb-none">
                    <q-timeline-entry
                      v-for="(eduEl, eduIndex) in employeeView.educationRecord"
                      :key="eduIndex"
                      ><div class="text-body1 text-weight-medium text-grey-9">
                        {{ eduEl.organization }}
                      </div>
                      <div class="text-body2 text-weight-regular text-grey-7">
                        {{ eduEl.title }}
                      </div>
                      <div class="text-caption text-weight-regular text-grey-6">
                        {{
                          getDateWithFormat(eduEl.servePeriod[0], "YYYY-MM-DD", "YYYY") +
                          " - " +
                          getDateWithFormat(eduEl.servePeriod[1], "YYYY-MM-DD", "YYYY")
                        }}
                      </div></q-timeline-entry
                    >
                  </q-timeline>
                </q-card-section>
              </q-card>
            </div>
            <div class="col">
              <!-- Tab1/Col2/Card1: Emergency Contact -->
              <q-card class="q-pb-md" flat>
                <q-card-section class="relative-position">
                  <h6 class="text-h6 text-weight-medium q-mb-none q-mt-sm q-ml-md">
                    Emergency Contact
                  </h6>
                  <q-btn
                    class="absolute-top-right flex flex-center bg-grey-3"
                    color="grey-8"
                    style="top: 20px; right: 20px"
                    flat
                    round
                    size="11px"
                    ><q-icon name="las la-pencil-alt"
                  /></q-btn>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <q-markup-table flat separator="none">
                    <tr>
                      <td
                        class="text-left text-body2 text-weight-medium text-grey-10"
                        style="width: 140px"
                      >
                        Primary<br />Name
                      </td>
                      <td class="text-left text-body2 text-weight-medium text-grey-7">
                        <span v-if="'emergencyContacts' in employeeView">{{
                          employeeView.emergencyContacts.primary.fullName
                        }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="text-left text-body2 text-weight-medium text-grey-10"
                        style="width: 140px"
                      >
                        Relationship
                      </td>
                      <td class="text-left text-body2 text-weight-medium text-grey-7">
                        <span v-if="'emergencyContacts' in employeeView">{{
                          employeeView.emergencyContacts.primary.relationship
                        }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="text-left text-body2 text-weight-medium text-grey-10"
                        style="width: 140px"
                      >
                        Mobile
                      </td>
                      <td class="text-left text-body2 text-weight-medium text-grey-7">
                        <span v-if="'emergencyContacts' in employeeView">{{
                          employeeView.emergencyContacts.primary.mobileNumber
                        }}</span>
                      </td>
                    </tr>
                  </q-markup-table>
                  <q-separator spaced />
                  <q-markup-table flat separator="none">
                    <tr>
                      <td
                        class="text-left text-body2 text-weight-medium text-grey-10"
                        style="width: 140px"
                      >
                        Secondary<br />Name
                      </td>
                      <td class="text-left text-body2 text-weight-medium text-grey-7">
                        <span v-if="'emergencyContacts' in employeeView">{{
                          employeeView.emergencyContacts.secondary.fullName
                        }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="text-left text-body2 text-weight-medium text-grey-10"
                        style="width: 140px"
                      >
                        Relationship
                      </td>
                      <td class="text-left text-body2 text-weight-medium text-grey-7">
                        <span v-if="'emergencyContacts' in employeeView">{{
                          employeeView.emergencyContacts.secondary.relationship
                        }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="text-left text-body2 text-weight-medium text-grey-10"
                        style="width: 140px"
                      >
                        Mobile
                      </td>
                      <td class="text-left text-body2 text-weight-medium text-grey-7">
                        <span v-if="'emergencyContacts' in employeeView">{{
                          employeeView.emergencyContacts.secondary.mobileNumber
                        }}</span>
                      </td>
                    </tr>
                  </q-markup-table>
                </q-card-section>
              </q-card>
              <!-- Tab1/Col2/Card2: Family Informations -->
              <q-card class="q-mt-lg q-pb-md" flat>
                <q-card-section class="relative-position">
                  <h6 class="text-h6 text-weight-medium q-mb-none q-mt-sm q-ml-md">
                    Family Informations
                  </h6>
                  <q-btn
                    class="absolute-top-right flex flex-center bg-grey-3"
                    color="grey-8"
                    style="top: 20px; right: 20px"
                    flat
                    round
                    size="11px"
                    ><q-icon name="las la-pencil-alt"
                  /></q-btn>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <q-markup-table flat separator="horizontal">
                    <thead>
                      <tr>
                        <th class="text-left text-body2 text-weight-medium text-grey-10">
                          Name
                        </th>
                        <th class="text-left text-body2 text-weight-medium text-grey-10">
                          Relationship
                        </th>
                        <th class="text-left text-body2 text-weight-medium text-grey-10">
                          Mobile
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <td class="text-left text-body2">Jehey</td>
                      <td class="text-left text-body2">Brother</td>
                      <td class="text-left text-body2">59859195</td>
                    </tbody>
                  </q-markup-table>
                </q-card-section>
              </q-card>
              <!-- Tab1/Col2/Card3: Experience -->
              <q-card
                class="q-mt-lg q-pb-md"
                flat
                v-if="
                  'experienceRecord' in employeeView &&
                  employeeView.experienceRecord.length !== 0
                "
              >
                <q-card-section class="relative-position">
                  <h6 class="text-h6 text-weight-medium q-mb-none q-mt-sm q-ml-md">
                    Experience
                  </h6>
                  <q-btn
                    class="absolute-top-right flex flex-center bg-grey-3"
                    color="grey-8"
                    style="top: 20px; right: 20px"
                    flat
                    round
                    size="11px"
                    ><q-icon name="las la-pencil-alt"
                  /></q-btn>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <q-timeline color="grey-4" class="q-pl-md q-mb-none">
                    <q-timeline-entry
                      v-for="(expEl, expIndex) in employeeView.experienceRecord"
                      :key="expIndex"
                      ><div class="text-body1 text-weight-medium text-grey-9">
                        {{ expEl.title + " at " + expEl.organization }}
                      </div>
                      <div class="text-caption text-weight-regular text-grey-6">
                        {{
                          getDateWithFormat(
                            expEl.servePeriod[0],
                            "YYYY-MM-DD",
                            "MMMM YYYY"
                          ) +
                          " - " +
                          getDateWithFormat(
                            expEl.servePeriod[1],
                            "YYYY-MM-DD",
                            "MMMM YYYY"
                          )
                        }}
                      </div></q-timeline-entry
                    >
                  </q-timeline>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-tab-panel>
        <!-- Tab2: Bank & Statutory -->
        <q-tab-panel class="bg-blue-grey-1 q-pa-none" name="bank">
          <!-- Tab1/Col2/Card3: Experience -->
          <q-card class="q-pb-md q-px-md" flat>
            <q-card-section>
              <h6 class="text-h6 text-weight-medium q-mb-none q-mt-sm q-ml-none">
                Basic Salary Information
              </h6>
            </q-card-section>
            <q-card-section class="row q-gutter-x-lg q-pt-none">
              <section class="col">
                <label class="text-caption text-weight-medium text-grey-10"
                  >Salary basis</label
                ><q-select
                  dense
                  outlined
                  label="Select Payment Frequency"
                  v-model="employeeView.payPeriod"
                />
              </section>
              <section class="col">
                <label class="text-caption text-weight-medium text-grey-10"
                  >Salary amount</label
                ><q-input
                  prefix="HK$"
                  dense
                  outlined
                  v-model="employeeView.amountPerPayCycle"
                />
              </section>
              <section class="col">
                <label class="text-caption text-weight-medium text-grey-10"
                  >Payment type</label
                ><q-select
                  dense
                  outlined
                  label="Select Payment Type"
                  v-model="employeeView.payment.method"
                />
              </section>
            </q-card-section>
            <q-separator spaced />
            <q-card-section>
              <h6 class="text-h6 text-weight-medium q-mb-none q-mt-none q-ml-none">
                MPF Information
              </h6>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <section class="row q-gutter-x-lg">
                <section class="col">
                  <label class="text-caption text-weight-medium text-grey-10"
                    >MPF scheme</label
                  ><q-select dense outlined label="Select MPF scheme" />
                </section>
                <section class="col"></section>
                <section class="col"></section>
              </section>
              <section class="row q-mt-md q-gutter-x-lg">
                <section class="col">
                  <label class="text-caption text-weight-medium text-grey-10"
                    >Employer contribution</label
                  ><q-select dense outlined />
                </section>
                <section class="col">
                  <label class="text-caption text-weight-medium text-grey-10"
                    >MPF rate</label
                  ><q-input dense outlined suffix="%" />
                </section>
                <section class="col">
                  <label class="text-caption text-weight-medium text-grey-10"
                    >Contribution amount</label
                  ><q-input prefix="HK$" dense outlined />
                </section>
              </section>
              <section class="row q-mt-md q-gutter-x-lg">
                <section class="col">
                  <label class="text-caption text-weight-medium text-grey-10"
                    >Employee contribution</label
                  ><q-select dense outlined />
                </section>
                <section class="col">
                  <label class="text-caption text-weight-medium text-grey-10"
                    >MPF rate</label
                  ><q-input dense outlined suffix="%" />
                </section>
                <section class="col">
                  <label class="text-caption text-weight-medium text-grey-10"
                    >Contribution amount</label
                  ><q-input prefix="HK$" dense outlined />
                </section>
              </section>
            </q-card-section>
            <q-separator spaced />
            <q-card-section>
              <h6 class="text-h6 text-weight-medium q-mb-none q-mt-none q-ml-none">
                ORSO Information
              </h6>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <section class="row q-gutter-x-lg">
                <section class="col">
                  <label class="text-caption text-weight-medium text-grey-10"
                    >ORSO scheme</label
                  ><q-select dense outlined label="Select ROR scheme" />
                </section>
                <section class="col"></section>
                <section class="col"></section>
              </section>
              <section class="row q-mt-md q-gutter-x-lg">
                <section class="col">
                  <label class="text-caption text-weight-medium text-grey-10"
                    >Employer contribution</label
                  ><q-select dense outlined />
                </section>
                <section class="col">
                  <label class="text-caption text-weight-medium text-grey-10"
                    >ORSO rate</label
                  ><q-input dense outlined suffix="%" />
                </section>
                <section class="col">
                  <label class="text-caption text-weight-medium text-grey-10"
                    >Contribution amount</label
                  ><q-input prefix="HK$" dense outlined />
                </section>
              </section>
              <section class="row q-mt-md q-gutter-x-lg">
                <section class="col">
                  <label class="text-caption text-weight-medium text-grey-10"
                    >Employee contribution</label
                  ><q-select dense outlined />
                </section>
                <section class="col">
                  <label class="text-caption text-weight-medium text-grey-10"
                    >ORSO rate</label
                  ><q-input dense outlined suffix="%" />
                </section>
                <section class="col">
                  <label class="text-caption text-weight-medium text-grey-10"
                    >Contribution amount</label
                  ><q-input prefix="HK$" dense outlined />
                </section>
              </section>
            </q-card-section>
            <q-separator spaced />
            <q-card-section>
              <h6 class="text-h6 text-weight-medium q-mb-none q-mt-none q-ml-none">
                Other Voluntary Contributions
              </h6>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <section class="row q-mt-md q-gutter-x-lg">
                <section class="col">
                  <label class="text-caption text-weight-medium text-grey-10"
                    >Employer contribution</label
                  ><q-select dense outlined />
                </section>
                <section class="col">
                  <label class="text-caption text-weight-medium text-grey-10"
                    >Contribution amount</label
                  ><q-input prefix="HK$" dense outlined />
                </section>
                <section class="col">
                  <label class="text-caption text-weight-medium text-grey-10"
                    >Remarks</label
                  ><q-input dense outlined />
                </section>
              </section>
              <section class="row q-mt-md q-gutter-x-lg">
                <section class="col">
                  <label class="text-caption text-weight-medium text-grey-10"
                    >Employee contribution</label
                  ><q-select dense outlined />
                </section>
                <section class="col">
                  <label class="text-caption text-weight-medium text-grey-10"
                    >Contribution amount</label
                  ><q-input prefix="HK$" dense outlined />
                </section>
                <section class="col">
                  <label class="text-caption text-weight-medium text-grey-10"
                    >Remarks</label
                  ><q-input dense outlined />
                </section>
              </section>
            </q-card-section>
            <q-card-section class="flex flex-center q-pt-xl"
              ><q-btn
                rounded
                no-caps
                label="Save"
                class="text-subtitle1 text-white bg-black text-weight-medium q-px-xl q-py-sm"
            /></q-card-section>
          </q-card>
        </q-tab-panel>
        <!-- Tab3: Documents -->
        <q-tab-panel class="bg-blue-grey-1 q-pa-none q-pt-none" name="documents">
          <q-toolbar class="q-py-md bg-white">
            <h6 class="text-h6 text-weight-medium q-mb-none q-mt-sm q-ml-md">
              Documents
            </h6>
            <q-space />
            <q-btn
              no-caps
              class="text-white bg-teal-8 float-right"
              icon="las la-upload"
              label="Upload File"
              @click="callAddEmployee()"
            />
          </q-toolbar>
          <q-separator />
          <q-markup-table square flat>
            <thead>
              <tr>
                <th class="text-left text-body2 text-weight-medium text-grey-10">#</th>
                <th class="text-left text-body2 text-weight-medium text-grey-10">
                  Document Name
                </th>
                <th class="text-left text-body2 text-weight-medium text-grey-10">
                  Submit Date
                </th>
                <th class="text-left text-body2 text-weight-medium text-grey-10">
                  Expiry Date
                </th>
                <th class="text-left text-body2 text-weight-medium text-grey-10">
                  Download
                </th>
                <th class="text-left text-body2 text-weight-medium text-grey-10">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="i in 10"
                :key="i"
                :class="i % 2 !== 0 ? 'bg-grey-2' : 'bg-white'"
              >
                <td class="text-left text-body2">{{ i }}</td>
                <td class="text-left text-body2">{{ "Resume" }}</td>
                <td class="text-left text-body2">{{ "Aug 10, 2024" }}</td>
                <td class="text-left text-body2">{{ "Aug 10, 2029" }}</td>
                <td class="text-left text-body2">
                  <q-btn
                    no-caps
                    flat
                    square
                    class="text-white bg-light-blue-8"
                    label="Download"
                  />
                </td>
                <td class="text-left text-body2">
                  <q-btn dense round size="md" flat icon="las la-ellipsis-v">
                    <q-popup-proxy>
                      <q-card>
                        <q-item
                          class="flex items-center q-pr-xl"
                          dense
                          clickable
                          @click="callViewEmployee"
                          ><q-icon
                            name="las la-file-upload"
                            class="q-mr-sm"
                          />Reupload</q-item
                        >
                        <q-item class="flex items-center q-pr-xl" dense clickable
                          ><q-icon
                            name="las la-trash-alt"
                            class="q-mr-sm"
                          />Delete</q-item
                        >
                      </q-card>
                    </q-popup-proxy>
                  </q-btn>
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import { EmployeeApi, OrganizationApi, DesignationApi } from "src/api";
import { DocModel, EmployeeModel } from "src/models";
import { portalRouterStore } from "src/stores/store";
import { getDateWithFormat } from "src/utils/dateformat";

// session
const session = ref({ dbname: "attofund" });

// component-related
const tab = ref(portalRouterStore());
const viewTab = ref("personal");
const employeeView = <EmployeeModel.IEmployee>ref({});

// models
const docURLModel = <DocModel.IDocURL>ref({});
const organizationDocURLModel = <DocModel.IDocURL>ref({});
const designationDocURLModel = <DocModel.IDocURL>ref({});
const employeeModel = <EmployeeModel.IEmployee>ref({});

export default {
  setup() {
    return {
      tab,
      viewTab,
      employeeView,
      employeeModel,
    };
  },

  methods: {
    setUpEmployeeModel: async function () {
      this.docURLModel = {
        dbname: session.value.dbname,
        docid: this.tab.viewEmployeeId,
      };
      const data = await this.getEmployee();
      this.employeeModel = this.employeeView = data.body; // assign retrieved data into api component view models
      this.organizationDocURLModel = {
        dbname: session.value.dbname,
        docid: this.employeeView.department,
      };
      this.designationDocURLModel = {
        dbname: session.value.dbname,
        docid: this.employeeView.designation,
      };

      const orgData = await this.getOrganization();
      const jobData = await this.getDesignation();

      this.employeeView.department = orgData.body.name;
      this.employeeView.designation = jobData.body.name;
    },
    getEmployee: async function () {
      const res = await EmployeeApi.getEmployee(this.docURLModel);
      return res;
    },
    getOrganization: async function () {
      const res = await OrganizationApi.getOrganization(this.organizationDocURLModel);
      return res;
    },
    getDesignation: async function () {
      const res = await DesignationApi.getDesignation(this.designationDocURLModel);
      return res;
    },
    updateEmployee: async function () {
      const res = await EmployeeApi.updateEmployee(
        docURLModel.value,
        employeeModel.value
      );
      this.setUpPagination();
      return res;
    },
    getDateWithFormat,
    backEmployeeList() {
      this.tab.empTab = "employees";
    },
  },
  mounted: async function mounted() {
    this.setUpEmployeeModel();
    docURLModel.value.dbname = organizationDocURLModel.value.dbname = designationDocURLModel.value.dbname =
      session.value.dbname;
    docURLModel.value.docid = this.tab.viewEmployeeId;
  },
};
</script>
