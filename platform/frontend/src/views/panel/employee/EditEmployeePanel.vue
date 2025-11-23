<template>
  <h3 class="text-h5 text-weight-medium q-ma-none">Add {{ formStatus.name }}</h3>
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
        label="Employee"
        @click="callEmployeeScreen"
      />
      <q-breadcrumbs-el :label="'Add ' + formStatus.name" />
    </q-breadcrumbs>
  </div>

  <div class="row justify-center q-mt-md q-mb-xl">
    <div class="col-10 q-mt-md" style="max-width: 80vw">
      <q-stepper
        class="bg-blue-grey-1 q-mt-md"
        v-model="formStatus.step"
        flat
        ref="stepper"
        inactive-color="grey-6"
        active-color="teal-8"
        alternative-labels
        animated
      >
        <q-step :name="1" title="Basics" prefix="1" :done="formStatus.step > 1">
          <div>
            <section class="q-px-md">
              <label class="text-body2 text-weight-regular"
                >Employee name<span class="text-red">*</span></label
              >
            </section>
          </div>
          <div class="row q-gutter-x-lg q-pb-sm q-px-md">
            <section class="col">
              <q-input
                color="teal"
                error-message="Enter the employee's given name."
                :error="v$.formBasics.givenName.$error"
                bg-color="white"
                outlined
                dense
                v-model="formBasics.givenName"
                label="Given name"
              />
            </section>
            <section class="col">
              <q-input
                color="teal"
                bg-color="white"
                outlined
                dense
                v-model="formBasics.middleName"
                label="Middlename"
              />
            </section>
            <section class="col">
              <q-input
                color="teal"
                error-message="Enter the employee's surname."
                :error="v$.formBasics.surname.$error"
                bg-color="white"
                outlined
                dense
                v-model="formBasics.surname"
                label="Surname"
              />
            </section>
          </div>
          <div class="row q-gutter-x-lg q-py-sm q-px-md">
            <section class="col">
              <label class="text-body2 text-weight-regular">Full name in Chinese</label>
              <q-input
                color="teal"
                bg-color="white"
                outlined
                dense
                v-model="formBasics.chineseName"
                label="Chinese name"
              />
            </section>
            <section class="col">
              <label class="text-body2 text-weight-regular"
                >Suffix<span class="text-red">*</span></label
              >
              <q-select
                color="teal"
                error-message="Select the employee suffix."
                :error="v$.formBasics.suffix.$error"
                bg-color="white"
                outlined
                dense
                v-model="formBasics.suffix"
                :options="formOptions.suffix"
                label="Suffix"
              />
            </section>
          </div>
          <!---->
          <div class="q-mt-lg q-mb-xs">
            <div class="text-subtitle1 text-weight-medium q-px-md">
              Employment Details
            </div>
          </div>
          <div class="q-gutter-y-md q-py-sm">
            <section class="q-px-md">
              <label class="text-body2 text-weight-regular"
                >Employee type<span class="text-red">*</span></label
              >
              <q-select
                color="teal"
                error-message="Select the employee pay type."
                :error="v$.formBasics.employeePayType.$error"
                bg-color="white"
                outlined
                dense
                :options="formOptions.employeePayType"
                v-model="formBasics.employeePayType"
                label="Employee Type"
              />
            </section>
          </div>
          <div class="row q-gutter-x-lg q-py-sm q-px-md">
            <section class="col">
              <label class="text-body2 text-weight-regular"
                >Amount<span class="text-red">*</span></label
              >
              <q-input
                color="teal"
                error-message="Enter the amount to pay this employee in a single pay cycle."
                :error="v$.formBasics.amountPerPayCycle.$error"
                bg-color="white"
                outlined
                dense
                prefix="$"
                v-model="formBasics.amountPerPayCycle"
                label="Amount"
              />
            </section>
            <section class="col">
              <label class="text-body2 text-weight-regular"
                >Pay period<span class="text-red">*</span></label
              >
              <q-select
                color="teal"
                error-message="Select the employee salary pay frequency."
                :error="v$.formBasics.payPeriod.$error"
                bg-color="white"
                outlined
                dense
                v-model="formBasics.payPeriod"
                :options="formOptions.payPeriod"
                label="Pay period"
              />
            </section>
          </div>
          <div class="row q-gutter-x-lg q-py-sm q-px-md">
            <section class="col">
              <label class="text-body2 text-weight-regular"
                >Join date<span class="text-red">*</span></label
              >
              <q-input
                color="teal"
                error-message="Enter the employee commencement date."
                :error="v$.formBasics.joinDate.$error"
                bg-color="white"
                outlined
                dense
                v-model="formBasics.joinDate"
                type="date"
                label="Join date"
              />
            </section>
            <section class="col">
              <label class="text-body2 text-weight-regular">End date (if any)</label>
              <q-input
                color="teal"
                bg-color="white"
                outlined
                dense
                v-model="formBasics.endDate"
                type="date"
                label="End date"
              />
            </section>
          </div>
          <div class="q-gutter-x-lg q-py-sm">
            <section class="q-px-md">
              <label class="text-body2 text-weight-regular"
                >Work shift<span class="text-red">*</span></label
              >
              <q-select
                color="teal"
                error-message="Select the employee work shift."
                :error="v$.formBasics.shift.$error"
                bg-color="white"
                outlined
                dense
                v-model="formBasics.shift"
                :options="formOptions.shift"
                label="Work shift"
                emit-value
                map-options
              />
            </section>
          </div>
          <div class="q-gutter-y-md q-py-sm">
            <section class="q-px-md">
              <label class="text-body2 text-weight-regular"
                >Designation<span class="text-red">*</span></label
              >
              <q-select
                color="teal"
                error-message="Select the employee designation."
                :error="v$.formBasics.designation.$error"
                bg-color="white"
                outlined
                dense
                v-model="formBasics.designation"
                :options="formOptions.designation"
                label="Designation"
                emit-value
                map-options
                @update:model-value="updateDepartmentField(formBasics.designation)"
              />
            </section>
          </div>
          <div class="row q-gutter-x-lg q-py-sm q-px-md">
            <section class="col">
              <label class="text-body2 text-weight-regular"
                >Employee ID<span class="text-red">*</span></label
              >
              <q-input
                color="teal"
                bg-color="white"
                error-message="Enter the employee ID."
                :error="v$.formBasics.employeeId.$error"
                outlined
                dense
                v-model="formBasics.employeeId"
                label="Employee ID"
              />
            </section>
            <section class="col">
              <label class="text-body2 text-weight-regular"
                >Department<span class="text-red">*</span></label
              >
              <q-select
                color="teal"
                bg-color="white"
                error-message="Select the designation to autoselect this field."
                :error="v$.formBasics.department.$error"
                outlined
                dense
                v-model="formBasics.department"
                :options="formOptions.department"
                label="Department"
                emit-value
                map-options
                readonly
              />
            </section>
          </div>
        </q-step>
        <!---->
        <!---->
        <q-step :name="2" title="Personal Info" prefix="2" :done="step > 2">
          <div class="q-gutter-y-md q-py-sm">
            <section class="q-px-md">
              <q-item tag="label" v-ripple>
                <q-item-section avatar top>
                  <q-checkbox
                    v-model="formOptions.hasIDCard"
                    color="teal-8"
                    @click="
                      formPersonal.hkidCardNumber = formPersonal.passportNumber = ''
                    "
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Providing HKID card number</q-item-label>
                  <q-item-label caption>
                    Your employee holds a HKID card issued by the Immigration Department.
                  </q-item-label>
                </q-item-section>
              </q-item>
            </section>
          </div>
          <div class="q-gutter-y-md q-py-sm">
            <section class="q-px-md">
              <label class="text-body2 text-weight-regular"
                >{{ formOptions.hasIDCard ? "HKID card number" : "Passport number"
                }}<span class="text-red">*</span></label
              >
              <q-input
                v-if="formOptions.hasIDCard"
                color="teal"
                bg-color="white"
                outlined
                dense
                v-model="formPersonal.hkidCardNumber"
                error-message="Enter the employee's HKID card number."
                :error="v$.formPersonal.hkidCardNumber.$error"
                label="HKID card number"
                mask="A######(X)"
              />
              <q-input
                v-if="!formOptions.hasIDCard"
                color="teal"
                bg-color="white"
                outlined
                dense
                v-model="formPersonal.passportNumber"
                error-message="Enter the employee's passport number."
                :error="v$.formPersonal.passportNumber.$error"
                label="Passport number"
              />
            </section>
          </div>
          <div v-if="!formOptions.hasIDCard" class="row q-gutter-x-lg q-py-sm q-px-md">
            <section class="col">
              <label class="text-body2 text-weight-regular"
                >Place of issue (for passport)<span class="text-red">*</span></label
              >
              <q-select
                color="teal"
                bg-color="white"
                outlined
                dense
                error-message="Enter where the passport is issued."
                :error="v$.formPersonal.passportPlaceOfIssue.$error"
                :options="formOptions.countryList"
                v-model="formPersonal.passportPlaceOfIssue"
                label="Place of issue"
              />
            </section>
          </div>
          <div class="q-gutter-y-md q-py-sm">
            <section class="q-px-md">
              <label class="text-body2 text-weight-regular"
                >Email address<span class="text-red">*</span></label
              >
              <q-input
                color="teal"
                bg-color="white"
                outlined
                dense
                error-message="Enter the employee's email address."
                :error="v$.formPersonal.emailAddress.$error"
                v-model="formPersonal.emailAddress"
                label="Email address"
              />
            </section>
          </div>
          <div class="row q-gutter-x-lg q-py-sm q-px-md">
            <section class="col">
              <label class="text-body2 text-weight-regular"
                >Date of birth<span class="text-red">*</span></label
              >
              <q-input
                color="teal"
                bg-color="white"
                outlined
                dense
                type="date"
                error-message="Enter the employee's date of birth."
                :error="v$.formPersonal.birthDate.$error"
                v-model="formPersonal.birthDate"
                label="Date of birth"
              />
            </section>
            <section class="col">
              <label class="text-body2 text-weight-regular"
                >Mobile number<span class="text-red">*</span></label
              >
              <q-input
                color="teal"
                bg-color="white"
                outlined
                dense
                error-message="Enter the employee's mobile number."
                :error="v$.formPersonal.mobileNumber.$error"
                v-model="formPersonal.mobileNumber"
                label="Mobile number"
              />
            </section>
          </div>
          <div class="q-gutter-y-md q-py-sm">
            <section class="q-px-md">
              <label class="text-body2 text-weight-regular"
                >Residential address<span class="text-red">*</span></label
              >
              <q-input
                color="teal"
                bg-color="white"
                outlined
                dense
                error-message="Enter the employee's residential address."
                :error="v$.formPersonal.residentialAddress.$error"
                v-model="formPersonal.residentialAddress"
                label="Residential address"
              />
            </section>
          </div>
          <div class="q-gutter-y-md q-py-sm">
            <section class="q-px-md">
              <label class="text-body2 text-weight-regular">Postal address</label>
              <q-input
                color="teal"
                bg-color="white"
                outlined
                dense
                v-model="formPersonal.postalAddress"
                label="Postal address"
                hint="Required if different from employee residential address."
              />
            </section>
          </div>
          <!---->
          <div class="q-mt-lg q-mb-md">
            <div class="text-subtitle1 text-weight-medium q-px-md">
              Family and Emergency Contacts
            </div>
          </div>
          <div class="q-px-md">
            <label class="text-body2 text-weight-regular"
              >Primary contact<span class="text-red">*</span></label
            >
          </div>
          <div class="row q-gutter-x-lg q-pb-md q-px-md">
            <section class="col">
              <q-input
                color="teal"
                bg-color="white"
                outlined
                dense
                error-message="Enter the full name of this contact person."
                :error="v$.formPersonal.emergencyContacts.primary.fullName.$error"
                v-model="formPersonal.emergencyContacts.primary.fullName"
                label="Full name"
              />
            </section>
            <section class="col">
              <q-input
                color="teal"
                bg-color="white"
                outlined
                dense
                error-message="Enter the relationship type."
                :error="v$.formPersonal.emergencyContacts.primary.relationship.$error"
                v-model="formPersonal.emergencyContacts.primary.relationship"
                label="Relationship"
              />
            </section>
            <section class="col">
              <q-input
                color="teal"
                bg-color="white"
                outlined
                dense
                error-message="Enter his/her mobile contact number."
                :error="v$.formPersonal.emergencyContacts.primary.mobileNumber.$error"
                v-model="formPersonal.emergencyContacts.primary.mobileNumber"
                label="Mobile number"
              />
            </section>
          </div>
          <div class="q-px-md">
            <label class="text-body2 text-weight-regular"
              >Secondary contact<span class="text-red">*</span></label
            >
          </div>
          <div class="row q-gutter-x-lg q-px-md">
            <section class="col">
              <q-input
                color="teal"
                bg-color="white"
                outlined
                dense
                error-message="Enter the full name of this contact person."
                :error="v$.formPersonal.emergencyContacts.secondary.fullName.$error"
                v-model="formPersonal.emergencyContacts.secondary.fullName"
                label="Full name"
              />
            </section>
            <section class="col">
              <q-input
                color="teal"
                bg-color="white"
                outlined
                dense
                error-message="Enter the relationship type."
                :error="v$.formPersonal.emergencyContacts.secondary.relationship.$error"
                v-model="formPersonal.emergencyContacts.secondary.relationship"
                label="Relationship"
              />
            </section>
            <section class="col">
              <q-input
                color="teal"
                bg-color="white"
                outlined
                dense
                error-message="Enter his/her mobile contact number."
                :error="v$.formPersonal.emergencyContacts.secondary.mobileNumber.$error"
                v-model="formPersonal.emergencyContacts.secondary.mobileNumber"
                label="Mobile number"
              />
            </section>
          </div>
          <div class="q-gutter-y-md q-py-sm">
            <section class="q-px-md">
              <q-item tag="label" v-ripple>
                <q-item-section avatar top>
                  <q-checkbox
                    v-model="formPersonal.marritalStatus.isMarried"
                    value="false"
                    color="teal-8"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label
                    >Is your employee married?<span class="text-red"
                      >*</span
                    ></q-item-label
                  >
                  <q-item-label caption>
                    Do not tick if your employee is single/widowed/divorced/living apart
                  </q-item-label>
                </q-item-section>
              </q-item>
            </section>
          </div>
          <div
            v-if="formPersonal.marritalStatus.isMarried"
            class="row q-gutter-x-lg q-py-sm q-px-md"
          >
            <section class="col">
              <label class="text-body2 text-weight-regular"
                >Full name of spouse<span class="text-red">*</span></label
              >
              <q-input
                color="teal"
                bg-color="white"
                outlined
                dense
                error-message="Enter the full name of the employee's spouse."
                :error="v$.formPersonal.marritalStatus.spouseFullName.$error"
                v-model="formPersonal.marritalStatus.spouseFullName"
                label="Spouse name"
              />
            </section>
            <section class="col">
              <label class="text-body2 text-weight-regular"
                >Spouse's HKID card/passport number</label
              >
              <q-input
                color="teal"
                bg-color="white"
                outlined
                dense
                v-model="formPersonal.marritalStatus.identityNumber"
                label="Spouse's HKID card/passport number"
                mask="XXXXXXXXX"
              />
            </section>
          </div>
          <div
            v-if="formPersonal.marritalStatus.isMarried"
            class="row q-gutter-x-lg q-pt-sm q-px-md"
          >
            <section class="col">
              <label class="text-body2 text-weight-regular"
                >Place of issue (for passport)</label
              >
              <q-select
                color="teal"
                bg-color="white"
                outlined
                dense
                :options="formOptions.countryList"
                v-model="formPersonal.marritalStatus.passportPlaceOfIssue"
                label="Place of issue"
              />
            </section>
          </div>
          <!---->
          <div class="q-px-md q-pt-md">
            <q-separator spaced />
          </div>

          <div class="q-mt-lg q-mb-md">
            <div class="text-subtitle1 text-weight-medium q-px-md">
              Education (Optional)
            </div>
            <q-item-label caption class="q-px-md">
              Please list your employee's educational record starting with the most
              recent.
            </q-item-label>
          </div>
          <div class="q-gutter-y-md q-py-sm q-px-md">
            <q-card
              bordered
              flat
              v-for="(eduEl, eduIndex) in formPersonal.educationRecord"
              :key="eduIndex"
            >
              <q-card-section>
                <div class="row q-gutter-x-lg q-pb-md items-end">
                  <section class="col">
                    <q-input
                      color="teal"
                      bg-color="white"
                      outlined
                      dense
                      v-model="eduEl.organization"
                      label="Instituition name"
                    />
                  </section>
                  <section class="col-3">
                    <q-input
                      color="teal"
                      bg-color="white"
                      outlined
                      dense
                      v-model="eduEl.title"
                      label="Degree"
                    />
                  </section>
                </div>
                <div class="row q-gutter-x-md items-end">
                  <section class="col">
                    <q-input
                      type="date"
                      color="teal"
                      bg-color="white"
                      outlined
                      dense
                      v-model="eduEl.servePeriod[0]"
                      label="From"
                    />
                  </section>
                  <section class="col">
                    <q-input
                      type="date"
                      color="teal"
                      bg-color="white"
                      outlined
                      dense
                      v-model="eduEl.servePeriod[1]"
                      label="Until"
                    />
                  </section>
                  <section>
                    <q-btn
                      dense
                      flat
                      class="text-grey-8 bg-grey-3 q-pa-sm"
                      style="border: 1px solid #cfd8dc"
                      icon="las la-trash-alt"
                      @click="formPersonal.educationRecord.splice(eduIndex, 1)"
                    />
                  </section>
                </div>
              </q-card-section>
            </q-card>
            <div>
              <q-btn
                no-caps
                flat
                class="text-grey-8 bg-grey-3 q-py-sm"
                style="border: 1px solid #cfd8dc"
                label="Add New Record"
                @click="
                  formPersonal.educationRecord.push({
                    title: null,
                    organization: null,
                    servePeriod: [null, null],
                  })
                "
              />
            </div>
          </div>
          <!---->
          <div class="q-mt-lg q-mb-md">
            <div class="text-subtitle1 text-weight-medium q-px-md">
              Work Experience (Optional)
            </div>
            <q-item-label caption class="q-px-md">
              Please list your employee's pasr work experience starting with the most
              recent.
            </q-item-label>
          </div>
          <div class="q-gutter-y-md q-py-sm q-px-md">
            <q-card
              bordered
              flat
              v-for="(expEl, expIndex) in formPersonal.experienceRecord"
              :key="expIndex"
            >
              <q-card-section>
                <div class="row q-gutter-x-lg q-pb-md items-end">
                  <section class="col">
                    <q-input
                      color="teal"
                      bg-color="white"
                      outlined
                      dense
                      v-model="expEl.organization"
                      label="Organization name"
                    />
                  </section>
                  <section class="col">
                    <q-input
                      color="teal"
                      bg-color="white"
                      outlined
                      dense
                      v-model="expEl.title"
                      label="Job title"
                    />
                  </section>
                </div>
                <div class="row q-gutter-x-md items-end">
                  <section class="col">
                    <q-input
                      type="date"
                      color="teal"
                      bg-color="white"
                      outlined
                      dense
                      v-model="expEl.servePeriod[0]"
                      label="From"
                    />
                  </section>
                  <section class="col">
                    <q-input
                      type="date"
                      color="teal"
                      bg-color="white"
                      outlined
                      dense
                      v-model="expEl.servePeriod[1]"
                      label="Until"
                    />
                  </section>
                  <section>
                    <q-btn
                      dense
                      flat
                      class="text-grey-8 bg-grey-3 q-pa-sm"
                      style="border: 1px solid #cfd8dc"
                      icon="las la-trash-alt"
                      @click="formPersonal.experienceRecord.splice(expIndex, 1)"
                    />
                  </section>
                </div>
              </q-card-section>
            </q-card>
            <div>
              <q-btn
                no-caps
                flat
                class="text-grey-8 bg-grey-3 q-py-sm"
                style="border: 1px solid #cfd8dc"
                label="Add New Record"
                @click="
                  formPersonal.experienceRecord.push({
                    title: null,
                    organization: null,
                    servePeriod: [null, null],
                  })
                "
              />
            </div>
          </div>
        </q-step>
        <!---->
        <!---->
        <q-step :name="3" title="Payment Info" prefix="3" :done="step > 3">
          <div class="q-gutter-y-md q-py-sm">
            <section class="q-px-md">
              <label class="text-body2 text-weight-regular"
                >How would you like to pay this employee?<span class="text-red"
                  >*</span
                ></label
              >
              <div>
                <q-btn-toggle
                  v-model="formPayment.payment.method"
                  flat
                  :error="v$.formPayment.payment.method.$error"
                  :options="formOptions.payMethod"
                  class="row"
                >
                  <template v-slot:deposit>
                    <q-item class="col column no-wrap">
                      <q-item-section class="row flex-center">
                        <q-btn
                          round
                          size="18px"
                          outline
                          class="bg-white"
                          :text-color="
                            formPayment.payment.method === 'deposit'
                              ? 'blue-grey-8'
                              : 'grey-6'
                          "
                          ><q-icon size="md" name="las la-university"
                        /></q-btn>
                      </q-item-section>
                      <section class="row flex-center q-mt-xs q-mx-none">
                        <div class="text-center text-caption text-black">
                          D<span class="text-lowercase">irect</span> D<span
                            class="text-lowercase"
                            >eposit</span
                          >
                        </div>
                      </section>
                    </q-item>
                  </template>
                  <template v-slot:cheque>
                    <q-item class="col column no-wrap">
                      <q-item-section class="row flex-center">
                        <q-btn
                          round
                          size="18px"
                          outline
                          class="bg-white"
                          :text-color="
                            formPayment.payment.method === 'cheque'
                              ? 'blue-grey-8'
                              : 'grey-6'
                          "
                          ><q-icon size="md" name="las la-money-check-alt"
                        /></q-btn>
                      </q-item-section>
                      <section class="row flex-center q-mt-xs q-mx-none">
                        <div class="text-center text-caption text-black">
                          C<span class="text-lowercase">heque</span>
                        </div>
                      </section>
                    </q-item>
                  </template>
                  <template v-slot:cash>
                    <q-item class="col column no-wrap">
                      <q-item-section class="row flex-center">
                        <q-btn
                          round
                          size="18px"
                          outline
                          class="bg-white"
                          :text-color="
                            formPayment.payment.method === 'cash'
                              ? 'blue-grey-8'
                              : 'grey-6'
                          "
                          ><q-icon size="md" name="las la-money-bill"
                        /></q-btn>
                      </q-item-section>
                      <section class="row flex-center q-mt-xs q-mx-none">
                        <div class="text-center text-caption text-black">
                          C<span class="text-lowercase">ash</span>
                        </div>
                      </section>
                    </q-item>
                  </template>
                </q-btn-toggle>
              </div>
            </section>
          </div>
          <!---->
          <div
            v-if="
              formPayment.payment.method === 'deposit' ||
              formPayment.payment.method === 'cheque'
            "
          >
            <div class="row q-gutter-x-lg q-py-sm q-px-md">
              <section class="col">
                <label class="text-body2 text-weight-regular"
                  >Bank name<span class="text-red">*</span></label
                >
                <q-select
                  color="teal"
                  bg-color="white"
                  outlined
                  dense
                  error-message="Select the employee (recipient) bank name."
                  :error="v$.formPayment.payment.bankName.$error"
                  v-model="formPayment.payment.bankName"
                  label="Bank name"
                />
              </section>
              <section class="col-3">
                <label class="text-body2 text-weight-regular">Bank code</label>
                <q-input
                  color="teal"
                  bg-color="white"
                  outlined
                  dense
                  v-model="formPayment.payment.bankCode"
                  label="Bank code"
                />
              </section>
            </div>
            <div class="row q-gutter-x-lg q-py-sm q-px-md">
              <section class="col">
                <label class="text-body2 text-weight-regular"
                  >Bank account number<span class="text-red">*</span></label
                >
                <q-input
                  color="teal"
                  bg-color="white"
                  outlined
                  dense
                  error-message="Enter the employee (recipient) bank account number."
                  :error="v$.formPayment.payment.bankAccountNumber.$error"
                  v-model="formPayment.payment.bankAccountNumber"
                  label="Bank account number"
                />
              </section>
              <section class="col">
                <label class="text-body2 text-weight-regular"
                  >Swift code<span class="text-red">*</span></label
                >
                <q-input
                  color="teal"
                  bg-color="white"
                  outlined
                  dense
                  error-message="Enter the employee (recipient) bank swift code."
                  :error="v$.formPayment.payment.swiftCode.$error"
                  v-model="formPayment.payment.swiftCode"
                  label="Swift code"
                />
              </section>
            </div>
          </div>
          <!---->
        </q-step>
        <q-step :name="4" title="Supporting Documents" prefix="4" :done="step > 4">
          <q-toolbar class="q-py-md bg-blue-grey-1">
            <label class="text-body2 text-weight-regular"
              >Upload a file, anything relevant to this employee</label
            >
            <q-space />
            <q-btn
              no-caps
              class="text-white bg-teal-8 float-right"
              icon="las la-upload"
              label="Upload File"
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
                        <q-item class="flex items-center q-pr-xl" dense clickable
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
        </q-step>
        <!---->
        <template v-slot:navigation>
          <q-stepper-navigation class="row q-mx-xs q-py-md q-gutter-x-md q-mt-lg">
            <section class="col-3">
              <q-btn
                rounded
                flat
                no-caps
                class="fit text-white bg-black q-py-md"
                label="Save and Continue"
                @click="formContinue()"
              />
            </section>
            <section class="col-3">
              <q-btn
                rounded
                no-caps
                outline
                class="fit"
                :label="formStatus.step === 1 ? 'Cancel' : 'Back'"
                @click="
                  formStatus.step === 1 ? callEmployeeScreen() : $refs.stepper.previous()
                "
              />
            </section>
            <section class="col q-px-sm">
              <label class="text-caption text-grey-7 float-right"
                >Fields with asterisk(<span class="text-red">*</span>) are mandatory.
              </label>
            </section>
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted } from "vue";
import { portalRouterStore } from "src/stores/store";
import useVuelidate from "@vuelidate/core";
import {
  required,
  requiredIf,
  numeric,
  email,
  url,
  helpers,
} from "@vuelidate/validators";
import { ShiftApi, OrganizationApi, DesignationApi, EmployeeApi } from "src/api";
import { DocModel, EmployeeModel } from "src/models";
import { getNames } from "country-list";

// session
const session = ref({ dbname: "attofund" });

// component-related
const formStatus = ref({
  name: "Employee",
  step: 1,
  newForm: true,
});
const formOptions = ref({
  suffix: ["Mr", "Mrs", "Ms", "Miss"],
  employeePayType: ["Salaried", "Paid Hourly"],
  payPeriod: ["Monthly", "Semimonthly", "Biweekly", "Weekly", "Daily", "Hourly"],
  shift: [],
  designation: [],
  department: [],
  hasIDCard: false,
  payMethod: [
    { value: "deposit", slot: "deposit" },
    { value: "cheque", slot: "cheque" },
    { value: "cash", slot: "cash" },
  ],
  countryList: getNames(),
});
const formBasics = ref({});
const formPersonal = ref({});
const formPayment = ref({});

// models
const dbURLModel = <DocModel.IDBURL>ref({});
const docURLModel = <DocModel.IDocURL>ref({});
const employeeModel = <EmployeeModel.IEmployee>ref({
  employeeId: null,
  givenName: null,
  middleName: null,
  surname: null,
  chineseName: null,
  suffix: null,

  employeePayType: null,
  amountPerPayCycle: null,
  payPeriod: null,
  joinDate: null,
  endDate: null,
  shift: null,
  designation: null,
  department: null,

  hkidCardNumber: null,
  passportNumber: null,
  passportPlaceOfIssue: null,
  emailAddress: null,
  mobileNumber: null,
  birthDate: null,
  residentialAddress: null,
  postalAddress: null,
  marritalStatus: {
    isMarried: false,
    spouseFullName: null,
    identityNumber: null,
    passportPlaceOfIssue: null,
  },
  emergencyContacts: {
    primary: {
      fullName: null,
      relationship: null,
      mobileNumber: null,
    },
    secondary: {
      fullName: null,
      relationship: null,
      mobileNumber: null,
    },
  },
  educationRecord: [
    {
      title: null,
      organization: null,
      servePeriod: [null, null],
    },
  ],
  experienceRecord: [
    {
      title: null,
      organization: null,
      servePeriod: [null, null],
    },
  ],
  payment: {
    method: null,
    bankName: null,
    bankCode: null,
    bankAccountNumber: null,
    swiftCode: null,
  },
});

export default {
  setup() {
    return {
      formStatus,
      formOptions,
      formBasics,
      formPersonal,
      formPayment,
    };
  },
  data() {
    const tab = ref(portalRouterStore());
    return {
      tab,
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      formBasics: {
        employeeId: {},
        givenName: { required },
        middleName: {},
        surname: { required },
        chineseName: {},
        suffix: { required },
        employeePayType: { required },
        amountPerPayCycle: { required, numeric },
        payPeriod: { required },
        joinDate: { required },
        endDate: {},
        shift: { required },
        designation: { required },
        employeeId: { required },
        department: { required },
      },
      formPersonal: {
        hkidCardNumber: {
          required: requiredIf(function () {
            return this.formOptions.hasIDCard;
          }),
        },
        passportNumber: {
          required: requiredIf(function () {
            return !this.formOptions.hasIDCard;
          }),
        },
        passportPlaceOfIssue: {
          required: requiredIf(function () {
            return !this.formOptions.hasIDCard;
          }),
        },
        emailAddress: { required },
        mobileNumber: { required },
        birthDate: { required },
        residentialAddress: { required },
        postalAddress: {},
        marritalStatus: {
          isMarried: {},
          spouseFullName: {
            required: requiredIf(function () {
              return formPersonal.value.marritalStatus.isMarried;
            }),
          },
          identityNumber: {},
          passportPlaceOfIssue: {},
        },
        emergencyContacts: {
          primary: {
            fullName: { required },
            relationship: { required },
            mobileNumber: { required },
          },
          secondary: {
            fullName: { required },
            relationship: { required },
            mobileNumber: { required },
          },
        },
      },
      formPayment: {
        payment: {
          method: { required },
          bankName: {
            required: requiredIf(function (formPayment) {
              return formPayment.payment.method === "deposit";
            }),
          },
          bankCode: {},
          bankAccountNumber: {
            required: requiredIf(function (formPayment) {
              return formPayment.payment.method === "deposit";
            }),
          },
          swiftCode: {
            required: requiredIf(function (formPayment) {
              return formPayment.payment.method === "deposit";
            }),
          },
        },
      },
    };
  },
  methods: {
    setUpOptions: async function () {
      // set up shift options
      const dataRegularShift = await this.getAllRegularShift();
      const dataFlexibleShift = await this.getAllFlexibleShift();
      this.formOptions.shift = [];
      dataRegularShift.body.rows.forEach((elRegular) => {
        this.formOptions.shift.push({
          label: "Regular: " + elRegular.value.name,
          value: elRegular.key,
        });
      });
      dataFlexibleShift.body.rows.forEach((elFlexible) => {
        this.formOptions.shift.push({
          label: "Flexible: " + elFlexible.value.name,
          value: elFlexible.key,
        });
      });

      // set up organization options
      const dataOrganization = await this.getAllOrganization();
      this.formOptions.department = [];
      dataOrganization.body.rows.forEach((elOrg) => {
        this.formOptions.department.push({
          label: elOrg.value.name,
          value: elOrg.key,
        });
      });

      // set up designation options
      const dataDesignation = await this.getAllDesignation();
      this.formOptions.designation = [];
      dataDesignation.body.rows.forEach((elJob) => {
        this.formOptions.designation.push({
          label: elJob.value.name,
          value: elJob.key,
          relational: elJob.value.department,
        });
      });
    },
    modelToForm() {
      formBasics.value = {
        employeeId: employeeModel.value.employeeId,
        givenName: employeeModel.value.givenName,
        middleName: employeeModel.value.middleName,
        surname: employeeModel.value.surname,
        chineseName: employeeModel.value.chineseName,
        suffix: employeeModel.value.suffix,

        employeePayType: employeeModel.value.employeePayType,
        amountPerPayCycle: employeeModel.value.amountPerPayCycle,
        payPeriod: employeeModel.value.payPeriod,
        joinDate: employeeModel.value.joinDate,
        endDate: employeeModel.value.endDate,
        shift: employeeModel.value.shift,
        designation: employeeModel.value.designation,
        department: employeeModel.value.department,
      };
      formPersonal.value = {
        hkidCardNumber: employeeModel.value.hkidCardNumber,
        passportNumber: employeeModel.value.passportNumber,
        passportPlaceOfIssue: employeeModel.value.passportPlaceOfIssue,
        emailAddress: employeeModel.value.emailAddress,
        mobileNumber: employeeModel.value.mobileNumber,
        birthDate: employeeModel.value.birthDate,
        residentialAddress: employeeModel.value.residentialAddress,
        postalAddress: employeeModel.value.postalAddress,
        marritalStatus: {
          isMarried: employeeModel.value.marritalStatus.isMarried,
          spouseFullName: employeeModel.value.marritalStatus.spouseFullName,
          identityNumber: employeeModel.value.marritalStatus.identityNumber,
          passportPlaceOfIssue: employeeModel.value.marritalStatus.passportPlaceOfIssue,
        },
        emergencyContacts: {
          primary: employeeModel.value.emergencyContacts.primary,
          secondary: employeeModel.value.emergencyContacts.secondary,
        },
        educationRecord: employeeModel.value.educationRecord,
        experienceRecord: employeeModel.value.experienceRecord,
      };
      formPayment.value = {
        payment: {
          method: employeeModel.value.payment.method,
          bankName: employeeModel.value.payment.bankName,
          bankCode: employeeModel.value.payment.bankCode,
          bankAccountNumber: employeeModel.value.payment.bankAccountNumber,
          swiftCode: employeeModel.value.payment.swiftCode,
        },
      };
    },
    formToModel() {
      employeeModel.value = {
        employeeId: this.formBasics.employeeId,
        givenName: this.formBasics.givenName,
        middleName: this.formBasics.middleName,
        surname: this.formBasics.surname,
        chineseName: this.formBasics.chineseName,
        suffix: this.formBasics.suffix,

        employeePayType: this.formBasics.employeePayType,
        amountPerPayCycle: this.formBasics.amountPerPayCycle,
        payPeriod: this.formBasics.payPeriod,
        joinDate: this.formBasics.joinDate,
        endDate: this.formBasics.endDate,
        shift: this.formBasics.shift,
        designation: this.formBasics.designation,
        department: this.formBasics.department,

        hkidCardNumber: this.formPersonal.hkidCardNumber,
        passportNumber: this.formPersonal.passportNumber,
        passportPlaceOfIssue: this.formPersonal.passportPlaceOfIssue,
        emailAddress: this.formPersonal.emailAddress,
        mobileNumber: this.formPersonal.mobileNumber,
        birthDate: this.formPersonal.birthDate,
        residentialAddress: this.formPersonal.residentialAddress,
        postalAddress:
          this.formPersonal.postalAddress === null ||
          this.formPersonal.postalAddress === ""
            ? this.formPersonal.residentialAddress
            : this.formPersonal.postalAddress,
        marritalStatus: {
          isMarried: this.formPersonal.marritalStatus.isMarried,
          spouseFullName: this.formPersonal.marritalStatus.spouseFullName,
          identityNumber: this.formPersonal.marritalStatus.identityNumber,
          passportPlaceOfIssue: this.formPersonal.marritalStatus.passportPlaceOfIssue,
        },
        emergencyContacts: {
          primary: this.formPersonal.emergencyContacts.primary,
          secondary: this.formPersonal.emergencyContacts.secondary,
        },
        educationRecord: this.formPersonal.educationRecord,
        experienceRecord: this.formPersonal.experienceRecord,
        payment: {
          method: this.formPayment.payment.method,
          bankName: this.formPayment.payment.bankName,
          bankCode: this.formPayment.payment.bankCode,
          bankAccountNumber: this.formPayment.payment.bankAccountNumber,
          swiftCode: this.formPayment.payment.swiftCode,
        },
      };
    },
    setUpEmployeeModel: async function () {
      this.docURLModel = {
        dbname: session.value.dbname,
        docid: this.tab.viewEmployeeId,
      };
      const data = await this.getEmployee();
      this.formStatus.name = data.body.givenName;
      this.formStatus.newForm = false;
      this.employeeModel = data.body;
      this.modelToForm();
    },
    getAllRegularShift: async function () {
      const res = await ShiftApi.getAllRegularShift(dbURLModel.value);
      return res;
    },
    getAllFlexibleShift: async function () {
      const res = await ShiftApi.getAllFlexibleShift(dbURLModel.value);
      return res;
    },
    getAllOrganization: async function () {
      const res = await OrganizationApi.getAllOrganization(dbURLModel.value);
      return res;
    },
    getAllDesignation: async function () {
      const res = await DesignationApi.getAllDesignation(dbURLModel.value);
      return res;
    },
    getEmployee: async function () {
      const res = await EmployeeApi.getEmployee(this.docURLModel);
      return res;
    },
    createEmployee: async function () {
      await this.formToModel();
      const res = await EmployeeApi.createEmployee(dbURLModel.value, employeeModel.value);
      this.tab.viewEmployeeId = res.body.id;
      this.setUpEmployeeModel();
      return res;
    },
    updateEmployee: async function () {
      await this.formToModel();
      const res = await EmployeeApi.updateEmployee(this.docURLModel, employeeModel.value);
      this.tab.viewEmployeeId = res.body.id;
      this.setUpEmployeeModel();
      return res;
    },
    formContinue: async function () {
      let validated: boolean;
      if (this.formStatus.step === 1) {
        const result = await this.v$.formBasics.$validate();
        validated = result;
      } else if (this.formStatus.step === 2) {
        const result = await this.v$.formPersonal.$validate();
        validated = result;
      } else if (this.formStatus.step === 3) {
        const result = await this.v$.formPayment.$validate();
        validated = result;
      }

      if (
        validated ||
        (this.formStatus.step === 3 && formPayment.value.payment.method !== "Deposit")
      ) {
        if (this.formStatus.newForm) {
          this.createEmployee();
        } else {
          this.updateEmployee();
        }
        this.formStatus.step++;
      }
    },
    callEmployeeScreen() {
      this.tab.empTab = "employees";
    },
    updateDepartmentField(input: string) {
      const thisDesignation = this.formOptions.designation.find(
        (el) => el.value === input
      );
      formBasics.value.department = thisDesignation.relational;
    },
  },
  mounted: async function mounted() {
    dbURLModel.value.dbname = session.value.dbname;
    docURLModel.value.dbname = session.value.dbname;
    this.setUpOptions();
    this.modelToForm();
  },
};
</script>
