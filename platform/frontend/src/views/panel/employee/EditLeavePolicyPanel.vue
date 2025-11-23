<template>
  <div class="q-pb-xl">
    <h3 class="text-h5 text-weight-medium q-ma-none">Edit Leave Policy</h3>
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
          <q-breadcrumbs-el class="hover-underline" @click="callLeaves" label="Leaves" />
          <q-breadcrumbs-el
            class="hover-underline"
            @click="callLeavePolicy"
            label="Leave Policy"
          />
          <q-breadcrumbs-el label="Edit Leave Policy" />
        </q-breadcrumbs>
      </div>
    </div>
    <!---->
    <!---->
    <div class="row q-mt-xl">
      <div style="width: 200px">
        <q-stepper
          class="fixed bg-blue-grey-1"
          v-model="formStatus.step"
          flat
          vertical
          ref="stepper"
          inactive-color="grey-6"
          active-color="teal-8"
          alternative-labels
          animated
        >
          <q-step
            :name="1"
            title="Details"
            prefix="1"
            :done="formStatus.step > 1"
          ></q-step>
          <q-step
            :name="2"
            title="Entitlement"
            prefix="2"
            :done="formStatus.step > 2"
          ></q-step>
          <q-step
            :name="3"
            title="Applicability"
            prefix="3"
            :done="formStatus.step > 3"
          ></q-step>
          <q-step
            :name="4"
            title="Restrictions"
            prefix="4"
            :done="formStatus.step > 4"
          ></q-step>
        </q-stepper>
      </div>
      <!---->
      <div class="col">
        <q-tab-panels v-model="formStatus.step">
          <!---->
          <q-tab-panel
            header-nav
            :name="1"
            class="q-pa-none bg-blue-grey-1 q-gutter-y-sm"
          >
            <q-card bordered flat class="q-pa-sm">
              <q-card-section>
                <div class="text-subtitle1 text-weight-regular">Details</div>
                <div class="text-body2 text-grey-8 q-py-xs">Enter the basic details</div>
              </q-card-section>
              <q-card-section class="row q-py-sm">
                <div class="col-6">
                  <label class="text-body2 text-weight-regular q-my-sm"
                    >Name<span class="text-red">*</span></label
                  >
                  <q-input
                    v-model="formDetails.name"
                    error-message="Enter the name of this leave policy."
                    :error="v$.formDetails.name.$error"
                    color="teal"
                    bg-color="white"
                    outlined
                    dense
                    label="Leave policy name"
                  />
                </div>
              </q-card-section>
              <q-card-section class="row q-py-sm">
                <div class="col-6">
                  <label class="text-body2 text-weight-regular q-my-sm"
                    >Policy Id<span class="text-red">*</span></label
                  >
                  <q-input
                    v-model="formDetails.policyId"
                    error-message="Provide the unique policy id."
                    :error="v$.formDetails.policyId.$error"
                    color="teal"
                    bg-color="white"
                    outlined
                    dense
                    label="Leave policy Id"
                  />
                </div>
              </q-card-section>
              <q-card-section class="q-py-sm">
                <label class="text-body2 text-weight-regular"
                  >Leave pay<span class="text-red">*</span></label
                >
                <div class="q-gutter-sm">
                  <q-field
                    v-model="formDetails.isPaid"
                    :borderless="!v$.formDetails.isPaid.$error"
                    :class="!v$.formDetails.isPaid.$error ? 'q-py-none' : 'q-pt-none'"
                    error-message="Select whether to pay for this leave."
                    :error="v$.formDetails.isPaid.$error"
                  >
                    <template v-slot:control>
                      <q-radio
                        v-model="formDetails.isPaid"
                        color="teal-8"
                        :val="true"
                        label="Paid"
                      />
                      <q-radio
                        v-model="formDetails.isPaid"
                        color="teal-8"
                        :val="false"
                        label="Unpaid"
                      />
                    </template>
                  </q-field>
                </div>
              </q-card-section>
              <q-card-section class="q-py-sm">
                <label class="text-body2 text-weight-regular"
                  >Entitlement<span class="text-red">*</span></label
                >
                <div class="q-gutter-sm">
                  <q-field
                    v-model="formDetails.isAuto"
                    :borderless="!v$.formDetails.isAuto.$error"
                    :class="!v$.formDetails.isAuto.$error ? 'q-py-none' : 'q-pt-none'"
                    error-message="Select how this leave is entitled."
                    :error="v$.formDetails.isAuto.$error"
                  >
                    <template v-slot:control>
                      <q-radio
                        v-model="formDetails.isAuto"
                        color="teal-8"
                        :val="true"
                        label="Auto"
                      />
                      <q-radio
                        v-model="formDetails.isAuto"
                        color="teal-8"
                        :val="false"
                        label="Grant based"
                      />
                    </template>
                  </q-field>
                </div>
              </q-card-section>
              <q-card-section class="q-py-sm">
                <label class="text-body2 text-weight-regular"
                  >Unit<span class="text-red">*</span></label
                >
                <div class="q-gutter-sm">
                  <q-field
                    v-model="formDetails.unit"
                    :borderless="!v$.formDetails.unit.$error"
                    :class="!v$.formDetails.unit.$error ? 'q-py-none' : 'q-pt-none'"
                    error-message="Select how this leave is counted."
                    :error="v$.formDetails.unit.$error"
                  >
                    <template v-slot:control>
                      <q-radio
                        v-model="formDetails.unit"
                        color="teal-8"
                        val="days"
                        label="Days"
                      />
                      <q-radio
                        v-model="formDetails.unit"
                        color="teal-8"
                        val="hours"
                        label="Hours"
                      />
                    </template>
                  </q-field>
                </div>
              </q-card-section>
            </q-card>
            <q-card v-if="'expiresOn' in formDetails" bordered flat class="q-pa-sm">
              <q-card-section>
                <div class="text-subtitle1 text-weight-regular">Policy validity</div>
                <div class="text-body2 text-grey-8 q-py-xs">
                  Enter a start and expiry date for this policy
                </div>
              </q-card-section>
              <q-card-section class="row q-py-sm">
                <div class="col-6">
                  <label class="text-body2 text-weight-regular q-my-sm"
                    >Valid from<span class="text-red">*</span></label
                  >
                  <div class="text-body2 text-grey-8 q-py-xs">
                    This policy will be in effective from this date and it can't be
                    changed
                  </div>
                  <q-input
                    error-message="Enter the start date of this policy."
                    :error="v$.formDetails.validFrom.$error"
                    v-model="formDetails.validFrom"
                    type="date"
                    color="teal"
                    bg-color="white"
                    outlined
                    dense
                  />
                </div>
              </q-card-section>
              <q-card-section class="row q-py-sm">
                <div class="col-6">
                  <label class="text-body2 text-weight-regular q-my-sm">Expires on</label>
                  <div class="text-body2 text-grey-8 q-py-xs">
                    If this is a recurring policy, this field can be left blank
                  </div>
                  <q-input
                    v-model="formDetails.expiresOn"
                    type="date"
                    color="teal"
                    bg-color="white"
                    outlined
                    dense
                  />
                </div>
              </q-card-section>
            </q-card>
          </q-tab-panel>
          <!---->
          <!---->
          <q-tab-panel :name="2" class="q-pa-none bg-blue-grey-1 q-gutter-y-sm">
            <q-card
              bordered
              flat
              v-for="(el, index) in formEntitlement.entitlements"
              :key="index"
              class="relative-position q-pa-sm"
            >
              <q-card-section v-if="index === 0">
                <div class="text-subtitle1 text-weight-regular">Entitlement</div>
                <div class="text-body2 text-grey-8 q-py-xs">
                  Set the entitlement options for this policy
                </div>
              </q-card-section>
              <q-card-section class="q-py-sm">
                <label class="text-body2 text-weight-regular q-my-sm"
                  >Effective after</label
                >
                <div class="row q-gutter-x-sm items-center">
                  <q-input
                    v-model="el.effectiveAfter"
                    color="teal"
                    bg-color="white"
                    outlined
                    dense
                    style="width: 50px"
                  />
                  <q-select
                    v-model="el.effectiveAfterUnit"
                    color="teal"
                    bg-color="white"
                    outlined
                    dense
                    style="width: 156px"
                    :options="formOptions.unitTime"
                  />
                  <span class="float-left">from date of joining</span>
                </div>
              </q-card-section>
              <q-card-section class="q-py-sm">
                <label class="text-body2 text-weight-regular q-my-sm">Worked</label>
                <div class="row q-gutter-sm items-center no-wrap">
                  <q-input
                    v-model="el.scheduleTime"
                    color="teal"
                    bg-color="white"
                    outlined
                    dense
                    style="width: 50px"
                  />
                  <q-select
                    v-model="el.scheduleTimeUnit"
                    :options="formOptions.unitTime"
                    color="teal"
                    bg-color="white"
                    outlined
                    dense
                    style="width: 156px"
                  />
                  <span class="float-left">for</span>
                  <q-input
                    v-model="el.scheduleWorkTime"
                    color="teal"
                    bg-color="white"
                    outlined
                    dense
                    style="width: 50px"
                  />
                  <q-select
                    v-model="el.scheduleWorkTimeUnit"
                    :options="formOptions.unitTime"
                    color="teal"
                    bg-color="white"
                    outlined
                    dense
                    style="width: 156px"
                  />
                </div>
              </q-card-section>
              <q-card-section class="row q-ma-md bg-grey-3">
                <section style="width: 28px">
                  <q-checkbox v-model="el.defineAccrual" color="teal-8" dense />
                </section>
                <section class="col">
                  <label class="text-body2 text-weight-regular q-my-sm">Accrual</label>
                  <div class="text-body2 text-grey-8 q-py-xs">
                    Define how much and when leave gets credited to an employee
                  </div>
                  <div
                    v-if="el.defineAccrual"
                    class="row q-gutter-sm items-center q-mt-md no-wrap"
                  >
                    <span class="float-left">Credit</span>
                    <q-input
                      v-model="el.daysCredit"
                      color="teal"
                      bg-color="white"
                      outlined
                      dense
                      style="width: 50px"
                    />
                    <span class="float-left">{{ formDetails.unit }}</span>
                    <q-select
                      v-model="el.frequencyCredit"
                      :options="Object.values(formOptions.resetTime)"
                      @update:model-value="
                        el.whichDayCredit = el.whichDayCreditPeriod = []
                      "
                      option-label="effect"
                      option-value="effect"
                      emit-value
                      color="teal"
                      bg-color="white"
                      outlined
                      dense
                      style="width: 156px"
                    />
                    <span class="float-left">on</span>
                    <q-select
                      v-model="el.whichDayCredit"
                      :options="getResetOptions(el.frequencyCredit, 'date')"
                      color="teal"
                      bg-color="white"
                      outlined
                      dense
                      style="width: 156px"
                    />
                    <span
                      v-if="getResetOptions(el.frequencyCredit, 'period').length !== 0"
                      class="float-left"
                      >of</span
                    >
                    <q-select
                      v-if="getResetOptions(el.frequencyCredit, 'period').length !== 0"
                      v-model="el.whichDayCreditPeriod"
                      :options="getResetOptions(el.frequencyCredit, 'period')"
                      color="teal"
                      bg-color="white"
                      outlined
                      dense
                      style="width: 156px"
                    />
                  </div>
                </section>
              </q-card-section>
              <q-card-section class="row q-ma-md bg-grey-3">
                <section style="width: 28px">
                  <q-checkbox v-model="el.defineReset" color="teal-8" dense />
                </section>
                <section class="col">
                  <label class="text-body2 text-weight-regular q-my-sm">Reset</label>
                  <div class="text-body2 text-grey-8 q-py-xs">
                    Define the reset, carry forward and encashment of leave balance
                  </div>
                  <div
                    v-if="el.defineReset"
                    class="row q-gutter-sm items-center q-mt-md no-wrap"
                  >
                    <span class="float-left">Reset</span>
                    <q-select
                      v-model="el.frequencyReset"
                      :options="Object.values(formOptions.resetTime)"
                      @update:model-value="el.whichDayReset = el.whichDayResetPeriod = []"
                      option-label="effect"
                      option-value="effect"
                      emit-value
                      color="teal"
                      bg-color="white"
                      outlined
                      dense
                      style="width: 156px"
                    />
                    <span class="float-left">on</span>
                    <q-select
                      v-model="el.whichDayReset"
                      :options="getResetOptions(el.frequencyReset, 'date')"
                      color="teal"
                      bg-color="white"
                      outlined
                      dense
                      style="width: 156px"
                    />
                    <span
                      v-if="getResetOptions(el.frequencyReset, 'period').length !== 0"
                      class="float-left"
                      >of</span
                    >
                    <q-select
                      v-if="getResetOptions(el.frequencyReset, 'period').length !== 0"
                      v-model="el.whichDayResetPeriod"
                      :options="getResetOptions(el.frequencyReset, 'period')"
                      color="teal"
                      bg-color="white"
                      outlined
                      dense
                      style="width: 156px"
                    />
                  </div>
                  <q-card v-if="el.defineReset" flat class="row q-pa-md q-mt-lg">
                    <section style="width: 28px">
                      <q-checkbox v-model="el.defineForward" color="teal-8" dense />
                    </section>
                    <section class="col">
                      <label class="text-body2 text-weight-regular q-my-sm"
                        >Carry forward unused leave</label
                      >
                      <div
                        v-if="el.defineForward"
                        class="row q-gutter-sm items-center q-mt-xs no-wrap"
                      >
                        <q-input
                          v-model="el.forwardNumber"
                          color="teal"
                          bg-color="white"
                          outlined
                          dense
                          style="width: 50px"
                        />
                        <q-select
                          v-model="el.forwardUnitType"
                          :options="formOptions.resetMeasure"
                          color="teal"
                          bg-color="white"
                          outlined
                          dense
                          style="width: 88px"
                        />
                        <span class="float-left">Maximum limit</span>
                        <q-input
                          v-model="el.maxCarryForward"
                          color="teal"
                          bg-color="white"
                          outlined
                          dense
                          style="width: 50px"
                        />
                      </div>
                    </section>
                  </q-card>
                  <q-card v-if="el.defineReset" flat class="row q-pa-md q-mt-lg">
                    <section style="width: 28px">
                      <q-checkbox v-model="el.defineEncash" color="teal-8" dense />
                    </section>
                    <section class="col">
                      <label class="text-body2 text-weight-regular q-my-sm"
                        >Encash unused leave</label
                      >
                      <div
                        v-if="el.defineEncash"
                        class="row q-gutter-sm items-center q-mt-xs no-wrap"
                      >
                        <q-input
                          v-model="el.encashNumber"
                          color="teal"
                          bg-color="white"
                          outlined
                          dense
                          style="width: 50px"
                        />
                        <q-select
                          v-model="el.encashUnitType"
                          :options="formOptions.resetMeasure"
                          color="teal"
                          bg-color="white"
                          outlined
                          dense
                          style="width: 88px"
                        />
                        <span class="float-left">Maximum limit</span>
                        <q-input
                          v-model="el.maxEncashment"
                          color="teal"
                          bg-color="white"
                          outlined
                          dense
                          style="width: 50px"
                        />
                      </div>
                    </section>
                  </q-card>
                </section>
              </q-card-section>
              <q-btn
                v-if="index !== 0"
                class="absolute-top-right text-grey-8"
                @click="formEntitlement.entitlements.splice(index, 1)"
                style="top: 4px; right: 4px"
                flat
                round
                dense
                icon="close"
              />
            </q-card>
            <!---->
            <div class="q-pt-xs q-pb-md">
              <q-btn
                flat
                no-caps
                class="text-grey-9 bg-grey-3"
                style="border: 1px solid #cfd8dc"
                label="Add New Level"
                @click="
                  formEntitlement.entitlements.push({
                    effectiveAfter: null,
                    effectiveAfterUnit: null,
                    scheduleTime: null,
                    scheduleTimeUnit: null,
                    scheduleWorkTime: null,
                    scheduleWorkTimeUnit: null,
                    defineAccrual: false,
                    daysCredit: null,
                    frequencyCredit: null,
                    whichDayCredit: null,
                    whichDayCreditPeriod: null,
                    defineReset: false,
                    frequencyReset: null,
                    whichDayReset: null,
                    whichDayResetPeriod: null,
                    defineForward: false,
                    forwardNumber: null,
                    forwardUnitType: null,
                    maxCarryForward: null,
                    defineEncash: false,
                    encashNumber: null,
                    encashUnitType: null,
                    maxEncashment: null,
                  })
                "
              />
            </div>
            <!---->
          </q-tab-panel>
          <!---->
          <!---->
          <q-tab-panel :name="3" class="q-pa-none bg-blue-grey-1 q-gutter-y-sm">
            <q-card bordered flat class="q-pa-sm">
              <q-card-section>
                <div class="text-subtitle1 text-weight-regular">Applicability</div>
                <div class="text-body2 text-grey-8 q-py-xs">
                  Specify who is eligible for this leave policy
                </div>
              </q-card-section>
              <q-card-section class="q-py-sm">
                <label class="text-body2 text-weight-regular q-my-sm"
                  >Applicable to</label
                >
                <div>
                  <q-card flat class="inline-block q-pa-md bg-grey-3 q-mt-sm">
                    <section
                      v-for="(el, index) in formApplicability.applyProfile"
                      :key="index"
                      :class="
                        index === 0
                          ? 'row q-gutter-x-md no-wrap'
                          : 'row q-gutter-x-md no-wrap q-mt-xs'
                      "
                    >
                      <q-select
                        v-model="el.label"
                        :options="getProfileOptions(formApplicability.applyProfile)"
                        color="teal"
                        bg-color="white"
                        outlined
                        dense
                        style="width: 132px"
                      />
                      <q-select
                        v-model="el.value"
                        :options="getProfileOptionValues(el.label)"
                        emit-value
                        map-options
                        multiple
                        color="teal"
                        bg-color="white"
                        outlined
                        dense
                        style="width: 200px"
                      />
                      <q-btn
                        flat
                        dense
                        color="grey-8"
                        icon="las la-trash-alt"
                        @click="formApplicability.applyProfile.splice(index, 1)"
                      />
                    </section>
                    <!--Add criteria here -->
                    <section class="row q-gutter-x-md q-mt-md">
                      <q-btn
                        flat
                        no-caps
                        class="text-grey-9 bg-grey-3"
                        style="border: 1px solid #cfd8dc"
                        label="Add Criteria"
                        @click="
                          formApplicability.applyProfile.length ===
                          Object.values(formOptions.profile).length
                            ? {}
                            : formApplicability.applyProfile.push({
                                label: null,
                                value: null,
                              })
                        "
                      />
                    </section>
                  </q-card>
                </div>
              </q-card-section>

              <q-card-section class="q-py-sm q-mt-sm">
                <label class="text-body2 text-weight-regular q-my-sm">Exceptions</label>
                <div>
                  <q-card flat class="inline-block q-pa-md bg-grey-3 q-mt-sm">
                    <section
                      v-for="(el, index) in formApplicability.exemptProfile"
                      :key="index"
                      :class="
                        index === 0
                          ? 'row q-gutter-x-md no-wrap'
                          : 'row q-gutter-x-md no-wrap q-mt-xs'
                      "
                    >
                      <q-select
                        v-model="el.label"
                        :options="getProfileOptions(formApplicability.exemptProfile)"
                        color="teal"
                        bg-color="white"
                        outlined
                        dense
                        style="width: 132px"
                      />
                      <q-select
                        v-model="el.value"
                        :options="getProfileOptionValues(el.label)"
                        emit-value
                        map-options
                        multiple
                        color="teal"
                        bg-color="white"
                        outlined
                        dense
                        style="width: 200px"
                      />
                      <q-btn
                        flat
                        dense
                        color="grey-8"
                        icon="las la-trash-alt"
                        @click="formApplicability.exemptProfile.splice(index, 1)"
                      />
                    </section>
                    <!--Add criteria here -->
                    <section class="row q-gutter-x-md q-mt-md">
                      <q-btn
                        flat
                        no-caps
                        class="text-grey-9 bg-grey-3"
                        style="border: 1px solid #cfd8dc"
                        label="Add Criteria"
                        @click="
                          formApplicability.exemptProfile.length ===
                          Object.values(formOptions.profile).length
                            ? {}
                            : formApplicability.exemptProfile.push({
                                label: null,
                                value: null,
                              })
                        "
                      />
                    </section>
                  </q-card>
                </div>
              </q-card-section> </q-card
          ></q-tab-panel>
          <!---->
          <!---->
          <q-tab-panel :name="4" class="q-pa-none bg-blue-grey-1 q-gutter-y-sm">
            <q-card bordered flat class="q-pa-sm">
              <q-card-section>
                <div class="text-subtitle1 text-weight-regular">Exceeded leaves</div>
                <div class="text-body2 text-grey-8 q-py-xs">
                  Define how to manage leaves that exceed the set entitlement
                </div>
                <div class="row q-mt-md">
                  <section style="width: 28px">
                    <q-checkbox
                      v-model="formRestrictions.ruleExceedBalance.define"
                      color="teal-8"
                      dense
                    />
                  </section>
                  <section class="col">
                    <label class="text-body2 text-weight-regular q-my-sm"
                      >Allow leave requests that exceed the entitled leaves</label
                    >
                    <div
                      v-if="formRestrictions.ruleExceedBalance.define"
                      class="q-gutter-sm"
                    >
                      <q-radio
                        v-model="formRestrictions.ruleExceedBalance.treat"
                        color="teal-8"
                        val="nolimit"
                        label="Without limit"
                      />
                      <q-radio
                        v-model="formRestrictions.ruleExceedBalance.treat"
                        color="teal-8"
                        val="yearend"
                        label="Until year end limit"
                      />
                    </div>
                    <div
                      v-if="formRestrictions.ruleExceedBalance.define"
                      class="q-mt-sm rounded-borders"
                    >
                      <q-card flat class="inline-block bg-grey-3 q-pa-md">
                        <q-checkbox
                          v-model="formRestrictions.ruleExceedBalance.treat"
                          color="teal-8"
                          :val="false"
                          true-value="lop"
                          :false-value="
                            formRestrictions.ruleExceedBalance.treat === 'nolimit'
                              ? 'nolimit'
                              : 'yearend'
                          "
                          dense
                        />
                        <label class="text-body2 text-weight-regular q-my-sm q-ml-sm"
                          >Mark excess as LOP</label
                        >
                      </q-card>
                    </div>
                  </section>
                </div>
              </q-card-section>
            </q-card>
            <!---->
            <q-card bordered flat class="q-pa-sm">
              <q-card-section>
                <div class="text-subtitle1 text-weight-regular">
                  Sandwich leave policy
                </div>
                <div class="text-body2 text-grey-8 q-py-xs">
                  Enable to consider weekends or holidays between the leave period as
                  leave
                </div>
                <div class="q-mt-md">
                  <q-toggle
                    v-model="formRestrictions.ruleSandwich.define"
                    color="teal-8"
                    dense
                  />
                  <label class="text-body2 text-weight-regular q-ma-sm"
                    >Sandwich leave policy</label
                  >
                </div>
                <div class="row q-mt-lg" v-if="formRestrictions.ruleSandwich.define">
                  <section style="width: 28px">
                    <q-checkbox
                      v-model="formRestrictions.ruleSandwich.considerDaysWeekend"
                      color="teal-8"
                      dense
                    />
                  </section>
                  <section class="col">
                    <label class="text-body2 text-weight-regular q-my-sm"
                      >Consider weekends occuring between requested period as leave</label
                    >
                    <div class="q-mt-md">
                      <q-card
                        v-if="formRestrictions.ruleSandwich.considerDaysWeekend"
                        flat
                        class="inline-block bg-grey-3 q-pa-md q-mb-lg"
                      >
                        <div class="row q-gutter-sm items-center no-wrap">
                          <span class="float-left">Count as leave after</span>
                          <q-input
                            v-model="formRestrictions.ruleSandwich.daysWeekend"
                            color="teal"
                            bg-color="white"
                            outlined
                            dense
                            style="width: 50px"
                          />
                          <span class="float-left">days</span>
                        </div>
                      </q-card>
                    </div>
                  </section>
                </div>
                <div class="row" v-if="formRestrictions.ruleSandwich.define">
                  <section style="width: 28px">
                    <q-checkbox
                      v-model="formRestrictions.ruleSandwich.considerDaysHoliday"
                      color="teal-8"
                      dense
                    />
                  </section>
                  <section class="col">
                    <label class="text-body2 text-weight-regular q-my-sm"
                      >Consider holidays occurring between requested period as
                      leave</label
                    >
                    <div class="q-mt-md">
                      <q-card
                        v-if="formRestrictions.ruleSandwich.considerDaysHoliday"
                        flat
                        class="inline-block bg-grey-3 q-pa-md"
                      >
                        <div class="row q-gutter-sm items-center no-wrap">
                          <span class="float-left">Count as leave after</span>
                          <q-input
                            v-model="formRestrictions.ruleSandwich.daysHoliday"
                            color="teal"
                            bg-color="white"
                            outlined
                            dense
                            style="width: 50px"
                          />
                          <span class="float-left">days</span>
                        </div>
                      </q-card>
                    </div>
                  </section>
                </div>
              </q-card-section>
            </q-card>
            <!---->
            <q-card bordered flat class="q-pa-sm">
              <q-card-section>
                <div class="text-subtitle1 text-weight-regular">Clubbing policy</div>
                <div class="text-body2 text-grey-8 q-py-xs">
                  The selected leave policies can't be taken together with this policy
                </div>
                <div class="row q-mt-md no-wrap">
                  <label class="text-body2 text-weight-regular q-my-sm q-mr-md"
                    >The leave cannot be taken along with</label
                  >
                  <q-select
                    v-model="formRestrictions.noClubbingWith"
                    color="teal"
                    bg-color="white"
                    outlined
                    dense
                    style="width: 156px"
                  />
                </div>
              </q-card-section>
            </q-card>
            <!---->
            <q-card bordered flat class="q-pa-sm">
              <q-card-section>
                <div class="text-subtitle1 text-weight-regular">File upload</div>
                <div class="text-body2 text-grey-8 q-py-xs">
                  Define if a supporting document is required to apply for this leave
                  policy
                </div>
                <div class="row q-mt-md">
                  <section style="width: 28px">
                    <q-checkbox
                      v-model="formRestrictions.docRequired"
                      color="teal-8"
                      dense
                    />
                  </section>
                  <section class="col">
                    <label class="text-body2 text-weight-regular q-my-sm"
                      >Upload supporting documents if the applied leave period
                      exceeds</label
                    >
                    <div v-if="formRestrictions.docRequired" class="q-mt-md">
                      <q-card flat class="inline-block bg-grey-3 q-pa-md">
                        <div class="row q-gutter-sm items-center no-wrap">
                          <q-input
                            v-model="formRestrictions.daysDocRequired"
                            color="teal"
                            bg-color="white"
                            outlined
                            dense
                            style="width: 50px"
                          />
                          <span class="float-left">days</span>
                        </div>
                      </q-card>
                    </div>
                  </section>
                </div>
              </q-card-section>
            </q-card>
            <!---->
            <q-card bordered flat class="q-pa-sm">
              <q-card-section>
                <div class="text-subtitle1 text-weight-regular">
                  Record level restrictions
                </div>
                <div class="text-body2 text-grey-8 q-py-xs">
                  Define settings related to leave restrictions
                </div>
                <div class="q-mt-lg">
                  <label class="text-body2 text-weight-regular">Allow requests for</label>
                  <div class="row q-mt-sm">
                    <section style="width: 28px">
                      <q-checkbox
                        v-model="formRestrictions.allowPastRequest"
                        color="teal-8"
                        dense
                      />
                    </section>
                    <section class="col">
                      <label class="text-body2 text-weight-regular q-my-sm"
                        >Past dates</label
                      >
                      <div class="q-mt-md" v-if="formRestrictions.allowPastRequest">
                        <q-card flat class="inline-block bg-grey-3 q-pa-md">
                          <div class="row q-gutter-sm items-center no-wrap">
                            <q-checkbox
                              v-model="formRestrictions.specifyDaysPastRequest"
                              color="teal-8"
                              dense
                            />
                            <span class="float-left">Past</span>
                            <q-input
                              :disable="!formRestrictions.specifyDaysPastRequest"
                              v-model="formRestrictions.daysPastRequest"
                              color="teal"
                              bg-color="white"
                              outlined
                              dense
                              style="width: 50px"
                            />
                            <span class="float-left">days</span>
                          </div>
                        </q-card>
                      </div>
                    </section>
                  </div>
                  <div class="row q-mt-lg">
                    <section style="width: 28px">
                      <q-checkbox
                        v-model="formRestrictions.allowFutureRequest"
                        color="teal-8"
                        dense
                      />
                    </section>
                    <section class="col">
                      <label class="text-body2 text-weight-regular q-my-sm"
                        >Future dates</label
                      >
                      <div v-if="formRestrictions.allowFutureRequest" class="q-mt-md">
                        <q-card flat class="inline-block bg-grey-3 q-pa-md">
                          <div class="row q-gutter-sm items-center no-wrap">
                            <q-checkbox
                              v-model="formRestrictions.specifyDaysFutureRequest"
                              color="teal-8"
                              dense
                            />
                            <span class="float-left">Next</span>
                            <q-input
                              :disable="!formRestrictions.specifyDaysFutureRequest"
                              v-model="formRestrictions.daysBeforeRequest"
                              color="teal"
                              bg-color="white"
                              outlined
                              dense
                              style="width: 50px"
                            />
                            <span class="float-left">days</span>
                          </div>
                        </q-card>
                      </div>
                    </section>
                  </div>
                  <div class="row q-mt-lg">
                    <section style="width: 28px">
                      <q-checkbox
                        v-model="formRestrictions.allowAdminOnly"
                        color="teal-8"
                        dense
                      />
                    </section>
                    <section class="col">
                      <label class="text-body2 text-weight-regular q-my-sm"
                        >Allow only administrators to apply this leave on employee's
                        behalf</label
                      >
                    </section>
                  </div>
                  <div class="row q-mt-md items-center no-wrap">
                    <q-checkbox
                      v-model="formRestrictions.defineMinDays"
                      color="teal-8"
                      dense
                    />
                    <label class="text-body2 text-weight-regular q-my-sm q-mx-sm"
                      >Minimum leave allowed per leave request</label
                    >
                    <q-input
                      v-model="formRestrictions.minDaysPerRequest"
                      :disable="!formRestrictions.defineMinDays"
                      color="teal"
                      bg-color="white"
                      outlined
                      dense
                      style="width: 50px"
                    />
                  </div>
                  <div class="row q-mt-sm items-center no-wrap">
                    <q-checkbox
                      v-model="formRestrictions.defineMaxDays"
                      color="teal-8"
                      dense
                    />
                    <label class="text-body2 text-weight-regular q-my-sm q-mx-sm"
                      >Maximum leave allowed per leave request</label
                    >
                    <q-input
                      v-model="formRestrictions.maxDaysPerRequest"
                      :disable="!formRestrictions.defineMaxDays"
                      color="teal"
                      bg-color="white"
                      outlined
                      dense
                      style="width: 50px"
                    />
                  </div>
                  <div class="row q-mt-sm items-center no-wrap">
                    <q-checkbox
                      v-model="formRestrictions.defineMaxConsecutive"
                      color="teal-8"
                      dense
                    />
                    <label class="text-body2 text-weight-regular q-my-sm q-mx-sm"
                      >Maximum number of consecutive days of leave allowed</label
                    >
                    <q-input
                      v-model="formRestrictions.maxDaysConsecutive"
                      :disable="!formRestrictions.defineMaxConsecutive"
                      color="teal"
                      bg-color="white"
                      outlined
                      dense
                      style="width: 50px"
                    />
                  </div>
                  <div class="row q-mt-sm items-center no-wrap">
                    <q-checkbox
                      v-model="formRestrictions.defineGapDays"
                      color="teal-8"
                      dense
                    />
                    <label class="text-body2 text-weight-regular q-my-sm q-mx-sm"
                      >Minimum gap (in days) between two leave requests</label
                    >
                    <q-input
                      v-model="formRestrictions.minGapDaysBetweenRequest"
                      :disable="!formRestrictions.defineGapDays"
                      color="teal"
                      bg-color="white"
                      outlined
                      dense
                      style="width: 50px"
                    />
                  </div>
                  <div class="row q-mt-sm items-center no-wrap">
                    <label class="text-body2 text-weight-regular q-my-sm q-mr-sm"
                      >Maximum number of requests allowed within the specified
                      period</label
                    >
                    <q-input
                      v-model="formRestrictions.maxRequestsPerPeriod"
                      color="teal"
                      bg-color="white"
                      outlined
                      dense
                      style="width: 50px"
                    />
                    <label class="text-body2 text-weight-regular q-my-sm q-mx-sm"
                      >/</label
                    >
                    <q-select
                      v-model="formRestrictions.perPeriod"
                      color="teal"
                      bg-color="white"
                      outlined
                      dense
                      style="width: 88px"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-tab-panel>
        </q-tab-panels>
        <q-stepper-navigation class="row q-mx-xs q-py-md q-gutter-x-md q-mt-lg">
          <section class="col-3">
            <q-btn
              rounded
              flat
              no-caps
              class="fit text-white bg-black q-py-md"
              :label="formStatus.step === 4 ? 'Complete and Add' : 'Continue'"
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
                formStatus.step === 1 ? callLeavePolicy() : $refs.stepper.previous()
              "
            />
          </section>
          <section class="col q-px-sm">
            <label class="text-caption text-grey-7 float-right"
              >Fields with asterisk(<span class="text-red">*</span>) are mandatory.
            </label>
          </section>
        </q-stepper-navigation>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted } from "vue";
import { portalRouterStore } from "src/stores/store";
import useVuelidate from "@vuelidate/core";
import { required, requiredIf, helpers } from "@vuelidate/validators";
import { ShiftApi, OrganizationApi, DesignationApi, LeaveApi } from "src/api";
import { DocModel, LeaveModel } from "src/models";

// session
const session = ref({ dbname: "attofund" });

// component-related
const formStatus = ref({
  step: 1,
  newForm: true,
});
const formOptions = ref({
  unitTime: ["hours", "days", "weeks", "months", "years"],
  resetTime: [
    {
      effect: "one time",
      date: [
        "1st",
        "2nd",
        "3rd",
        "4th",
        "5th",
        "6th",
        "7th",
        "8th",
        "9th",
        "10th",
        "11th",
        "12th",
        "13th",
        "14th",
        "15th",
        "16th",
        "17th",
        "18th",
        "19th",
        "20th",
        "21th",
        "22th",
        "23th",
        "24th",
        "25th",
        "26th",
        "27th",
        "28th",
        "29th",
        "30th",
        "31th",
        "last day",
        "joining date",
        "birthday",
      ],
      period: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
        "joining month",
        "birth month",
      ],
    },
    {
      effect: "yearly",
      date: [
        "1st",
        "2nd",
        "3rd",
        "4th",
        "5th",
        "6th",
        "7th",
        "8th",
        "9th",
        "10th",
        "11th",
        "12th",
        "13th",
        "14th",
        "15th",
        "16th",
        "17th",
        "18th",
        "19th",
        "20th",
        "21th",
        "22th",
        "23th",
        "24th",
        "25th",
        "26th",
        "27th",
        "28th",
        "29th",
        "30th",
        "31th",
        "last day",
        "joining date",
        "birthday",
      ],
      period: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
        "joining month",
        "birth month",
      ],
    },
    {
      effect: "monthly",
      date: [
        "1st",
        "2nd",
        "3rd",
        "4th",
        "5th",
        "6th",
        "7th",
        "8th",
        "9th",
        "10th",
        "11th",
        "12th",
        "13th",
        "14th",
        "15th",
        "16th",
        "17th",
        "18th",
        "19th",
        "20th",
        "21th",
        "22th",
        "23th",
        "24th",
        "25th",
        "26th",
        "27th",
        "28th",
        "29th",
        "30th",
        "31th",
        "last day",
      ],
    },
    {
      effect: "half yearly",
      date: [
        "1st",
        "2nd",
        "3rd",
        "4th",
        "5th",
        "6th",
        "7th",
        "8th",
        "9th",
        "10th",
        "11th",
        "12th",
        "13th",
        "14th",
        "15th",
        "16th",
        "17th",
        "18th",
        "19th",
        "20th",
        "21th",
        "22th",
        "23th",
        "24th",
        "25th",
        "26th",
        "27th",
        "28th",
        "29th",
        "30th",
        "31th",
        "last day",
      ],
      period: [
        "January & July",
        "February & August",
        "March & September",
        "April & October",
        "May & November",
        "June & December",
      ],
    },
    {
      effect: "triannually",
      date: [
        "1st",
        "2nd",
        "3rd",
        "4th",
        "5th",
        "6th",
        "7th",
        "8th",
        "9th",
        "10th",
        "11th",
        "12th",
        "13th",
        "14th",
        "15th",
        "16th",
        "17th",
        "18th",
        "19th",
        "20th",
        "21th",
        "22th",
        "23th",
        "24th",
        "25th",
        "26th",
        "27th",
        "28th",
        "29th",
        "30th",
        "31th",
        "last day",
      ],
      period: [
        "January & May & September",
        "February & June & October",
        "March & July & November",
        "April & August & December",
      ],
    },
    {
      effect: "quarterly",
      date: [
        "1st",
        "2nd",
        "3rd",
        "4th",
        "5th",
        "6th",
        "7th",
        "8th",
        "9th",
        "10th",
        "11th",
        "12th",
        "13th",
        "14th",
        "15th",
        "16th",
        "17th",
        "18th",
        "19th",
        "20th",
        "21th",
        "22th",
        "23th",
        "24th",
        "25th",
        "26th",
        "27th",
        "28th",
        "29th",
        "30th",
        "31th",
        "last day",
      ],
      period: [
        "January & April & July & October",
        "February & May & November",
        "March & June & December",
      ],
    },
    {
      effect: "bi monthly",
      date: [
        "1st",
        "2nd",
        "3rd",
        "4th",
        "5th",
        "6th",
        "7th",
        "8th",
        "9th",
        "10th",
        "11th",
        "12th",
        "13th",
        "14th",
        "15th",
        "16th",
        "17th",
        "18th",
        "19th",
        "20th",
        "21th",
        "22th",
        "23th",
        "24th",
        "25th",
        "26th",
        "27th",
        "28th",
        "29th",
        "30th",
        "31th",
        "last day",
      ],
      period: [
        "January & March & May & July & September & November",
        "February & April & June & August & October & December",
      ],
    },
    {
      effect: "semi monthly",
      date: [
        "1 & 16",
        "2 & 17th",
        "3 & 18th",
        "4 & 19th",
        "5 & 20th",
        "6 & 21th",
        "7 & 22th",
        "8 & 23th",
        "9 & 24th",
        "10 & 25th",
        "11 & 26th",
        "12 & 27th",
        "13 & 28th",
        "14 & 29th",
        "15 & last day",
      ],
    },
    { effect: "bi weekly", date: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
    { effect: "weekly", date: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
  ],
  resetMeasure: ["percent", "unit"],
  profile: {
    marritalStatus: {
      label: "Marrital Status",
      value: ["single", "married", "separated", "divorced"],
    },
    gender: {
      label: "Gender",
      value: ["male", "female"],
    },
    department: {
      label: "Department",
      value: [],
    },
    designation: {
      label: "Designation",
      value: [],
    },
    shift: {
      label: "Shift",
      value: [],
    },
  },
  noClubbedWith: [],
  unitTimeDays: ["weeks", "biweeks", "semimonths", "months", "years"],
});
const formDetails = ref({});
const formEntitlement = ref({});
const formApplicability = ref({});
const formRestrictions = ref({});

// models
const dbURLModel = <DocModel.IDBURL>ref({});
const docURLModel = <DocModel.IDocURL>ref({});
const leavePolicyModel = <LeaveModel.ILeavePolicy>ref({
  name: null,
  isPaid: null,
  isAuto: null,
  unit: null,
  validPeriod: [null, null],
  entitlements: [
    {
      effectiveAfter: null,
      effectiveAfterUnit: null,
      scheduleTime: null,
      scheduleTimeUnit: null,
      scheduleWorkTime: null,
      scheduleWorkTimeUnit: null,
      defineAccrual: false,
      daysCredit: null,
      frequencyCredit: null,
      whichDayCredit: null,
      whichDayCreditPeriod: null,
      defineReset: false,
      frequencyReset: null,
      whichDayReset: null,
      whichDayResetPeriod: null,
      defineForward: false,
      forwardNumber: null,
      forwardUnitType: null,
      maxCarryForward: null,
      defineEncash: false,
      encashNumber: null,
      encashUnitType: null,
      maxEncashment: null,
    },
  ],
  applyProfile: {},
  exemptProfile: {},
  ruleExceedBalance: {
    define: false,
    treat: "lop",
  },
  ruleSandwich: {
    define: false,
    considerDaysWeekend: false,
    daysWeekend: null,
    considerDaysHoliday: false,
    daysHoliday: null,
  },
  noClubbingWith: [],
  docRequired: false,
  daysDocRequired: null,
  allowPastRequest: false,
  specifyDaysPastRequest: false,
  daysPastRequest: null,
  allowFutureRequest: false,
  specifyDaysFutureRequest: false,
  daysBeforeRequest: null,
  allowAdminOnly: false,
  defineMinDays: false,
  minDaysPerRequest: null,
  defineMaxDays: false,
  maxDaysPerRequest: null,
  defineMaxConsecutive: false,
  maxDaysConsecutive: null,
  defineGapDays: false,
  minGapDaysBetweenRequest: null,
  maxRequestsPerPeriod: null,
  perPeriod: null,
});
export default {
  setup() {
    return {
      formStatus,
      formOptions,
      formDetails,
      formEntitlement,
      formApplicability,
      formRestrictions,
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
      formDetails: {
        policyId: { required },
        name: { required },
        isPaid: { required },
        isAuto: { required },
        unit: { required },
        validFrom: {
          required,
        },
        expiresOn: {},
      },
      formEntitlement: {
        effectiveAfter: {},
        effectiveAfterUnit: {},
        scheduleTime: {},
        scheduleTimeUnit: {},
        scheduleWorkTime: {},
        scheduleWorkTimeUnit: {},
        defineAccrual: {},
        daysCredit: {},
        frequencyCredit: {},
        whichDayCredit: {},
        whichDayCreditPeriod: {},
        defineReset: {},
        frequencyReset: {},
        whichDayReset: {},
        whichDayResetPeriod: {},
        defineForward: {},
        forwardNumber: {},
        forwardUnitType: {},
        maxCarryForward: {},
        defineEncash: {},
        encashNumber: {},
        encashUnitType: {},
        maxEncashment: {},
      },
      formApplicability: {
        applyProfile: {
          marritalStatus: {},
          gender: {},
          department: {},
          designation: {},
          shift: {},
        },
        exemptProfile: {
          marritalStatus: {},
          gender: {},
          department: {},
          designation: {},
          shift: {},
        },
      },
      formRestrictions: {
        ruleExceedBalance: {
          define: {},
          treat: {},
        },
        ruleSandwich: {
          define: {},
          considerDaysWeekend: {},
          daysWeekend: {},
          considerDaysHoliday: {},
          daysHoliday: {},
        },
        noClubbingWith: {},
        docRequired: {},
        daysDocRequired: {},
        allowPastRequest: {},
        specifyDaysPastRequest: {},
        daysPastRequest: {},
        allowFutureRequest: {},
        specifyDaysFutureRequest: {},
        daysBeforeRequest: {},
        allowAdminOnly: {},
        defineMinDays: {},
        minDaysPerRequest: {},
        defineMaxDays: {},
        maxDaysPerRequest: {},
        defineMaxConsecutive: {},
        maxDaysConsecutive: {},
        defineGapDays: {},
        minGapDaysBetweenRequest: {},
        maxRequestsPerPeriod: {},
        perPeriod: {},
      },
    };
  },
  methods: {
    setUpOptions: async function () {
      const dataRegularShift = await this.getAllRegularShift();
      const dataFlexibleShift = await this.getAllFlexibleShift();
      const dataOrganization = await this.getAllDepartment();
      const dataDesignation = await this.getAllDesignation();

      this.formOptions.profile.department.value = [];
      this.formOptions.profile.designation.value = [];
      this.formOptions.profile.shift.value = [];

      dataOrganization.body.rows.forEach((elOrg) => {
        this.formOptions.profile.department.value.push({
          label: elOrg.value.name,
          value: elOrg.key,
        });
      });
      dataDesignation.body.rows.forEach((elJob) => {
        this.formOptions.profile.designation.value.push({
          label: elJob.value.name,
          value: elJob.key,
        });
      });
      dataRegularShift.body.rows.forEach((elRegular) => {
        this.formOptions.profile.shift.value.push({
          label: "Regular: " + elRegular.value.name,
          value: elRegular.key,
        });
      });
      dataFlexibleShift.body.rows.forEach((elFlexible) => {
        this.formOptions.profile.shift.value.push({
          label: "Flexible: " + elFlexible.value.name,
          value: elFlexible.key,
        });
      });
    },
    modelToForm() {
      formDetails.value = {
        policyId: leavePolicyModel.value.policyId,
        name: leavePolicyModel.value.name,
        isPaid: leavePolicyModel.value.isPaid,
        isAuto: leavePolicyModel.value.isAuto,
        unit: leavePolicyModel.value.unit,
        validFrom: leavePolicyModel.value.validPeriod[0],
        expiresOn: leavePolicyModel.value.validPeriod[1],
      };
      formEntitlement.value = {
        entitlements: leavePolicyModel.value.entitlements,
      };
      formApplicability.value = {
        applyProfile: this.profileToArray(leavePolicyModel.value.applyProfile),
        exemptProfile: this.profileToArray(leavePolicyModel.value.exemptProfile),
      };
      formRestrictions.value = {
        ruleExceedBalance: {
          define: leavePolicyModel.value.ruleExceedBalance.define,
          treat: leavePolicyModel.value.ruleExceedBalance.treat,
        },
        ruleSandwich: {
          define: leavePolicyModel.value.ruleSandwich.define,
          considerDaysWeekend: leavePolicyModel.value.ruleSandwich.considerDaysWeekend,
          daysWeekend: leavePolicyModel.value.ruleSandwich.daysWeekend,
          considerDaysHoliday: leavePolicyModel.value.ruleSandwich.considerDaysHoliday,
          daysHoliday: leavePolicyModel.value.ruleSandwich.daysHoliday,
        },
        noClubbingWith: leavePolicyModel.value.noClubbingWith,
        docRequired: leavePolicyModel.value.docRequired,
        daysDocRequired: leavePolicyModel.value.daysDocRequired,
        allowPastRequest: leavePolicyModel.value.allowPastRequest,
        specifyDaysPastRequest: leavePolicyModel.value.specifyDaysPastRequest,
        daysPastRequest: leavePolicyModel.value.daysPastRequest,
        allowFutureRequest: leavePolicyModel.value.allowFutureRequest,
        specifyDaysFutureRequest: leavePolicyModel.value.specifyDaysFutureRequest,
        daysBeforeRequest: leavePolicyModel.value.daysBeforeRequest,
        allowAdminOnly: leavePolicyModel.value.allowAdminOnly,
        defineMinDays: leavePolicyModel.value.defineMinDays,
        minDaysPerRequest: leavePolicyModel.value.minDaysPerRequest,
        defineMaxDays: leavePolicyModel.value.defineMaxDays,
        maxDaysPerRequest: leavePolicyModel.value.maxDaysPerRequest,
        defineMaxConsecutive: leavePolicyModel.value.defineMaxConsecutive,
        maxDaysConsecutive: leavePolicyModel.value.maxDaysConsecutive,
        defineGapDays: leavePolicyModel.value.defineGapDays,
        minGapDaysBetweenRequest: leavePolicyModel.value.minGapDaysBetweenRequest,
        maxRequestsPerPeriod: leavePolicyModel.value.maxRequestsPerPeriod,
        perPeriod: leavePolicyModel.value.perPeriod,
      };
    },
    formToModel() {
      leavePolicyModel.value = {
        policyId: this.formDetails.policyId,
        name: this.formDetails.name,
        isPaid: this.formDetails.isPaid,
        isAuto: this.formDetails.isAuto,
        unit: this.formDetails.unit,
        validPeriod: [this.formDetails.validFrom, this.formDetails.expiresOn],
        entitlements: this.formEntitlement.entitlements,
        appplyProfile: this.arrayToProfile(this.formApplicability.applyProfile),
        exemptProfile: this.arrayToProfile(this.formApplicability.exemptProfile),
        ruleExceedBalance: {
          define: this.formRestrictions.ruleExceedBalance.define,
          treat: this.formRestrictions.ruleExceedBalance.treat,
        },
        ruleSandwich: {
          define: this.formRestrictions.ruleSandwich.define,
          considerDaysWeekend: this.formRestrictions.ruleSandwich.considerDaysWeekend,
          daysWeekend: this.formRestrictions.ruleSandwich.daysWeekend,
          considerDaysHoliday: this.formRestrictions.ruleSandwich.considerDaysHoliday,
          daysHoliday: this.formRestrictions.ruleSandwich.daysHoliday,
        },
        noClubbingWith: this.formRestrictions.noClubbingWith,
        docRequired: this.formRestrictions.docRequired,
        daysDocRequired: this.formRestrictions.daysDocRequired,
        allowPastRequest: this.formRestrictions.allowPastRequest,
        specifyDaysPastRequest: this.formRestrictions.specifyDaysPastRequest,
        daysPastRequest: this.formRestrictions.daysPastRequest,
        allowFutureRequest: this.formRestrictions.allowFutureRequest,
        specifyDaysFutureRequest: this.formRestrictions.specifyDaysFutureRequest,
        daysBeforeRequest: this.formRestrictions.daysBeforeRequest,
        allowAdminOnly: this.formRestrictions.allowAdminOnly,
        defineMinDays: this.formRestrictions.defineMinDays,
        minDaysPerRequest: this.formRestrictions.minDaysPerRequest,
        defineMaxDays: this.formRestrictions.defineMaxDays,
        maxDaysPerRequest: this.formRestrictions.maxDaysPerRequest,
        defineMaxConsecutive: this.formRestrictions.defineMaxConsecutive,
        maxDaysConsecutive: this.formRestrictions.maxDaysConsecutive,
        defineGapDays: this.formRestrictions.defineGapDays,
        minGapDaysBetweenRequest: this.formRestrictions.minGapDaysBetweenRequest,
        maxRequestsPerPeriod: this.formRestrictions.maxRequestsPerPeriod,
        perPeriod: this.formRestrictions.perPeriod,
      };
    },
    profileToArray(data: any) {
      let array = [];
      for (const [_key, _value] of Object.entries(data)) {
        array.push({
          key: _key,
          value: _value,
        });
      }
      return array;
    },
    arrayToProfile(array: any) {
      let objModel = {} as { [key: string]: any[] };
      array.forEach((item) => {
        switch (item.label) {
          case "Marrital Status":
            objModel["marritalStatus"] = item.value;
            break;
          case "Gender":
            objModel["gender"] = item.value;
            break;
          case "Department":
            objModel["department"] = item.value;
            break;
          case "Designation":
            objModel["designation"] = item.value;
            break;
          case "Shift":
            objModel["shift"] = item.value;
            break;
        }
      });
      return objModel;
    },
    getProfileOptions(data: any) {
      let array = [];
      for (const obj of Object.values(this.formOptions.profile)) {
        let match = false;
        data.forEach((el) => {
          if (el.label === obj.label) {
            match = true;
          }
        });
        if (!match) {
          array.push(obj.label);
        }
      }
      return array;
    },
    getProfileOptionValues(_label: string) {
      let array = [];
      for (const obj of Object.values(this.formOptions.profile)) {
        if (obj.label === _label) {
          array = obj.value;
        }
      }
      return array;
    },
    getResetOptions(_label: string, _key: string) {
      let array = [];
      for (const obj of Object.values(this.formOptions.resetTime)) {
        if (obj.effect === _label) {
          if (_key === "date" && "date" in obj) {
            array = obj.date;
          } else if (_key === "period" && "period" in obj) {
            array = obj.period;
          }
        }
      }
      return array;
    },
    setUpLeavePolicyModel: async function () {
      this.docURLModel = {
        dbname: session.value.dbname,
        docid: this.tab.viewLeavePolicyId,
      };
      const data = await this.getLeavePolicy();
      this.formStatus.newForm = false;
      this.leavePolicyModel = data.body;
      this.modelToForm();
    },
    getAllDepartment: async function () {
      const res = await OrganizationApi.getAllOrganization(dbURLModel.value);
      return res;
    },
    getAllDesignation: async function () {
      const res = await DesignationApi.getAllDesignation(dbURLModel.value);
      return res;
    },
    getAllRegularShift: async function () {
      const res = await ShiftApi.getAllRegularShift(dbURLModel.value);
      return res;
    },
    getAllFlexibleShift: async function () {
      const res = await ShiftApi.getAllFlexibleShift(dbURLModel.value);
      return res;
    },
    getLeavePolicy: async function () {
      const res = await LeaveApi.getLeavePolicy(this.docURLModel);
      return res;
    },
    createLeavePolicy: async function () {
      await this.formToModel();
      const res = await LeaveApi.createLeavePolicy(
        dbURLModel.value,
        leavePolicyModel.value
      );
      this.setUpLeavePolicyModel();
      return res;
    },
    updateLeavePolicy: async function () {
      await this.formToModel();
      const res = await LeaveApi.updateLeavePolicy(
        this.docURLModel,
        leavePolicyModel.value
      );
      this.setUpLeavePolicyModel();
      return res;
    },
    formContinue: async function () {
      let validated: boolean;
      if (this.formStatus.step === 1) {
        const result = await this.v$.formDetails.$validate();
        validated = result;
      } else if (this.formStatus.step === 2) {
        const result = await this.v$.formEntitlement.$validate();
        validated = result;
      } else if (this.formStatus.step === 3) {
        const result = await this.v$.formApplicability.$validate();
        validated = result;
      } else if (this.formStatus.step === 4) {
        const result = await this.v$.formRestrictions.$validate();
        validated = result;
      }

      if (validated) {
        if (this.formStatus.newForm && this.formStatus.step === 4) {
          this.createLeavePolicy();
          this.callLeavePolicy();
        } else {
          this.formStatus.step++;
          //this.updateLeavePolicy();
        }
      }
    },
    callLeaves() {
      this.tab.empTab = "leaves";
    },
    callLeavePolicy() {
      this.tab.empTab = "leavepolicy";
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
