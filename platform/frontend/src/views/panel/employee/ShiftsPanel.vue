<template>
  <div>
    <h3 class="text-h5 text-weight-medium q-ma-none">Shifts</h3>
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
          <q-breadcrumbs-el label="Shifts" />
        </q-breadcrumbs>
      </div>

      <div class="q-gutter-x-sm">
        <q-btn-dropdown
          no-caps
          rounded
          class="text-white bg-teal-8"
          icon="las la-plus"
          label="Add Shifts"
        >
          <q-card>
            <q-item
              class="flex items-center q-pr-xl"
              dense
              clickable
              v-close-popup
              @click="callAddRegularDialog"
              >Regular Shift</q-item
            >
            <q-item
              class="flex items-center q-pr-xl"
              dense
              clickable
              v-close-popup
              @click="callAddFlexibleDialog"
              >Flexible Shift</q-item
            >
          </q-card></q-btn-dropdown
        >
      </div>
    </div>
    <div>
      <q-tabs
        v-model="tab"
        dense
        align="left"
        narrow-indicator
        class="text-grey-9 q-mt-md"
        active-class="text-black"
        indicator-color="teal-8"
      >
        <q-tab no-caps name="regular" label="Regular" />
        <q-tab no-caps name="flexible" label="Flexible" />
      </q-tabs>
      <q-separator />
    </div>
    <div class="q-mt-md">
      <!-- Tab Panels -->
      <q-tab-panels class="full-width bg-blue-grey-1" v-model="tab" animated>
        <q-tab-panel name="regular">
          <div>
            <label class="text-body2 q-mt-sm">
              <span>Show </span>
              <select v-model="paginationRegular.rowsPerPage">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span> entries</span>
              <span class="text-grey-9">
                · {{ stats.totalResultsRegular }} results found</span
              >
            </label>
            <q-btn-group flat class="float-right">
              <q-btn
                class="text-label text-weight-medium q-px-sm q-py-none"
                label="csv"
              />
              <q-btn
                class="text-label text-weight-medium q-px-sm q-py-none"
                label="pdf"
              />
              <q-btn
                class="text-label text-weight-medium q-px-sm q-py-none q-ml-sm"
                color="light-blue-8"
                icon="las la-print"
                label="print"
              />
            </q-btn-group>
          </div>
          <q-markup-table class="q-mt-lg">
            <thead>
              <tr class="text-h6 text-weight-bol text-left text-white bg-grey-10">
                <th>#</th>
                <th>Shift Name</th>
                <th>Shift ID</th>
                <th>Schedule</th>
                <th>Break Time</th>
                <th>Applied Days</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(el, index) in regularShiftList"
                :key="index"
                :class="index % 2 === 0 ? 'bg-grey-2' : 'bg-white'"
              >
                <td>
                  {{
                    (paginationRegular.currentPage - 1) * paginationRegular.rowsPerPage +
                    index +
                    1
                  }}
                </td>
                <td>{{ el.value.name }}</td>
                <td>{{ el.value.shiftId }}</td>
                <td>{{ el.value.schedule[0] + " - " + el.value.schedule[1] }}</td>
                <td>
                  <div v-for="(breakEl, breakIndex) in el.value.break" :key="breakIndex">
                    {{ breakEl[0] + " - " + breakEl[1] }}
                  </div>
                </td>
                <td>
                  <span v-for="(appEl, appIndex) in el.value.appliedDays" :key="appIndex">
                    {{
                      appIndex === el.value.appliedDays.length - 1 ? appEl : appEl + ", "
                    }}
                  </span>
                </td>
                <td>
                  <q-btn dense round size="md" flat icon="las la-ellipsis-v">
                    <q-popup-proxy>
                      <q-card>
                        <q-item
                          class="flex items-center q-pr-xl"
                          dense
                          clickable
                          v-close-popup
                          @click="
                            callEditRegularDialog(
                              el.key,
                              el.value.shiftId,
                              el.value.name,
                              el.value.schedule,
                              el.value.break,
                              el.value.appliedDays
                            )
                          "
                          ><q-icon name="las la-pencil-alt" class="q-mr-sm" />Edit</q-item
                        >
                        <q-item
                          class="flex items-center q-pr-xl"
                          dense
                          clickable
                          v-close-popup
                          @click="
                            callDeleteRegularDialog(
                              el.key,
                              el.value.shiftId,
                              el.value.name,
                              el.value.schedule,
                              el.value.break,
                              el.value.appliedDays
                            )
                          "
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
          <div class="q-pa-lg flex flex-center">
            <q-pagination
              v-model="paginationRegular.currentPage"
              color="black"
              :max="paginationRegular.totalPage"
              :max-pages="paginationRegular.batch"
              dense
              :boundary-numbers="false"
              :ellipses="false"
              direction-links
            />
          </div> </q-tab-panel
        ><q-tab-panel name="flexible">
          <div>
            <label class="text-body2 q-mt-sm">
              <span>Show </span>
              <select v-model="paginationFlexible.rowsPerPage">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span> entries</span>
              <span class="text-grey-9">
                · {{ stats.totalResultsFlexible }} results found</span
              >
            </label>
            <q-btn-group flat class="float-right">
              <q-btn
                class="text-label text-weight-medium q-px-sm q-py-none"
                label="csv"
              />
              <q-btn
                class="text-label text-weight-medium q-px-sm q-py-none"
                label="pdf"
              />
              <q-btn
                class="text-label text-weight-medium q-px-sm q-py-none q-ml-sm"
                color="light-blue-8"
                icon="las la-print"
                label="print"
              />
            </q-btn-group>
          </div>
          <q-markup-table class="q-mt-lg">
            <thead>
              <tr class="text-h6 text-weight-bol text-left text-white bg-grey-10">
                <th>#</th>
                <th>Shift Name</th>
                <th>Shift ID</th>
                <th>Assigned Hours</th>
                <th>per Period</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(el, index) in flexibleShiftList"
                :key="index"
                :class="index % 2 === 0 ? 'bg-grey-2' : 'bg-white'"
              >
                <td>
                  {{
                    (paginationFlexible.currentPage - 1) *
                      paginationFlexible.rowsPerPage +
                    index +
                    1
                  }}
                </td>
                <td>{{ el.value.name }}</td>
                <td>{{ el.value.shiftId }}</td>
                <td>{{ el.value.assignedHours + " hours" }}</td>
                <td>{{ el.value.assignedHoursPeriod }}</td>
                <td>
                  <q-btn dense round size="md" flat icon="las la-ellipsis-v">
                    <q-popup-proxy>
                      <q-card>
                        <q-item
                          class="flex items-center q-pr-xl"
                          dense
                          clickable
                          v-close-popup
                          @click="
                            callEditFlexibleDialog(
                              el.key,
                              el.value.shiftId,
                              el.value.name,
                              el.value.assignedHours,
                              el.value.assignedHoursPeriod
                            )
                          "
                          ><q-icon name="las la-pencil-alt" class="q-mr-sm" />Edit</q-item
                        >
                        <q-item
                          class="flex items-center q-pr-xl"
                          dense
                          clickable
                          v-close-popup
                          @click="
                            callDeleteFlexibleDialog(
                              el.key,
                              el.value.shiftId,
                              el.value.name,
                              el.value.assignedHours,
                              el.value.assignedHoursPeriod
                            )
                          "
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
          <div class="q-pa-lg flex flex-center">
            <q-pagination
              v-model="paginationFlexible.currentPage"
              color="black"
              :max="paginationFlexible.totalPage"
              :max-pages="paginationFlexible.batch"
              dense
              :boundary-numbers="false"
              :ellipses="false"
              direction-links
            /></div></q-tab-panel
      ></q-tab-panels>
    </div>
    <!-- Delete Regular Shift Dialog -->
    <q-dialog v-model="deleteRegularDialog" persistent>
      <q-card>
        <q-card-section class="text-center">
          <h6 class="text-center q-ma-none">Delete Regular Shift</h6>
          <div class="q-mx-lg q-mt-md">
            Are you sure you want to delete <br /><strong
              >'{{ regularShiftModel.name }}'</strong
            ><br />
            from the shift list?
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="row q-pa-none">
          <q-item dense clickable class="col flex-center q-py-md" v-close-popup
            >NO</q-item
          >
          <q-separator vertical />
          <q-item
            dense
            clickable
            class="col flex-center q-py-md text-red"
            @click="removeRegularShift()"
            v-close-popup
            >YES</q-item
          >
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Delete Flexible Shift Dialog -->
    <q-dialog v-model="deleteFlexibleDialog" persistent>
      <q-card>
        <q-card-section class="text-center">
          <h6 class="text-center q-ma-none">Delete Flexible Shift</h6>
          <div class="q-mx-lg q-mt-md">
            Are you sure you want to delete <br /><strong
              >'{{ flexibleShiftModel.name }}'</strong
            ><br />
            from the shift list?
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="row q-pa-none">
          <q-item dense clickable class="col flex-center q-py-md" v-close-popup
            >NO</q-item
          >
          <q-separator vertical />
          <q-item
            dense
            clickable
            class="col flex-center q-py-md text-red"
            @click="removeFlexibleShift()"
            v-close-popup
            >YES</q-item
          >
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Add Regular Shift Dialog -->
    <q-dialog v-model="addRegularDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="text-center">
          <h6 class="text-center q-ma-none">Add Regular Shift</h6>
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-none q-pb-sm">
          <label>Shift Name<span class="text-red">*</span></label>
          <q-input v-model="regularShiftModel.name" color="teal" dense outlined />
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-none q-pb-sm">
          <label>Shift Id<span class="text-red">*</span></label>
          <q-input v-model="regularShiftModel.shiftId" color="teal" dense outlined />
        </q-card-section>
        <q-card-section class="q-px-lg q-py-sm">
          <label class="text-body2 text-weight-regular"
            >Schedule<span class="text-red">*</span></label
          >
          <div class="row q-gutter-x-lg">
            <section class="col">
              <q-input
                type="time"
                v-model="regularShiftModel.schedule[0]"
                color="teal"
                dense
                outlined
                label="Start time"
              />
            </section>
            <section class="col">
              <q-input
                type="time"
                v-model="regularShiftModel.schedule[1]"
                color="teal"
                dense
                outlined
                label="End time"
              />
            </section>
          </div>
        </q-card-section>
        <q-card-section class="q-px-lg q-py-sm">
          <label class="text-body2 text-weight-regular">Break Time</label>
          <div :class="regularShiftModel.break.length !== 0 ? 'bg-grey-3 q-pa-md' : ''">
            <div
              v-for="(breakEl, breakIndex) in regularShiftModel.break"
              :key="breakIndex"
              :class="
                breakIndex !== regularShiftModel.break.length - 1
                  ? 'row items-center q-gutter-x-md q-pb-xs'
                  : 'row items-center q-gutter-x-md q-mb-none'
              "
            >
              <section class="col">
                <q-input
                  type="time"
                  v-model="breakEl[0]"
                  color="teal"
                  bg-color="white"
                  dense
                  outlined
                  label="Start time"
                />
              </section>
              <section class="col">
                <q-input
                  type="time"
                  v-model="breakEl[1]"
                  color="teal"
                  bg-color="white"
                  dense
                  outlined
                  label="End time"
                />
              </section>
              <section>
                <q-btn
                  dense
                  class="text-grey-8 bg-grey-3 q-pa-sm"
                  style="border: 1px solid #cfd8dc"
                  icon="las la-trash-alt"
                  @click="regularShiftModel.break.splice(breakIndex, 1)"
                />
              </section>
            </div>
          </div>
          <q-btn
            flat
            no-caps
            class="text-grey-9 bg-grey-3 q-mt-sm"
            style="border: 1px solid #cfd8dc"
            label="Add Break Time"
            @click="regularShiftModel.break.push(['', ''])"
          />
        </q-card-section>
        <q-card-section class="q-px-lg q-py-sm">
          <label class="text-body2 text-weight-regular">Work Days</label>
          <div class="row text-caption q-gutter-x-sm">
            <q-checkbox
              v-model="regularShiftModel.appliedDays"
              dense
              val="Mon"
              label="Mon"
              color="teal-8"
            />
            <q-checkbox
              v-model="regularShiftModel.appliedDays"
              dense
              val="Tue"
              label="Tue"
              color="teal-8"
            />
            <q-checkbox
              v-model="regularShiftModel.appliedDays"
              dense
              val="Wed"
              label="Wed"
              color="teal-8"
            />
            <q-checkbox
              v-model="regularShiftModel.appliedDays"
              dense
              val="Thu"
              label="Thu"
              color="teal-8"
            />
            <q-checkbox
              v-model="regularShiftModel.appliedDays"
              dense
              val="Fri"
              label="Fri"
              color="teal-8"
            />
            <q-checkbox
              v-model="regularShiftModel.appliedDays"
              dense
              val="Sat"
              label="Sat"
              color="teal-8"
            />
            <q-checkbox
              v-model="regularShiftModel.appliedDays"
              dense
              val="Sun"
              label="Sun"
              color="teal-8"
            />
          </div>
        </q-card-section>
        <q-card-section class="row justify-end">
          <q-btn no-caps flat class="" label="Cancel" v-close-popup />
          <q-btn
            no-caps
            flat
            class="text-white bg-teal-8 q-px-lg q-py-xs"
            label="Save"
            @click="createRegularShift()"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Add Flexible Shift Dialog -->
    <q-dialog v-model="addFlexibleDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="text-center">
          <h6 class="text-center q-ma-none">Add Flexible Shift</h6>
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-none q-pb-sm">
          <label>Shift Name<span class="text-red">*</span></label>
          <q-input v-model="flexibleShiftModel.name" color="teal" dense outlined />
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-none q-pb-sm">
          <label>Shift Id<span class="text-red">*</span></label>
          <q-input v-model="flexibleShiftModel.shiftId" color="teal" dense outlined />
        </q-card-section>
        <q-card-section class="q-px-lg q-py-sm">
          <div class="row q-gutter-x-lg">
            <section class="col">
              <label class="text-body2 text-weight-regular"
                >Assigned Hours<span class="text-red">*</span></label
              >
              <q-input
                v-model="flexibleShiftModel.assignedHours"
                color="teal"
                dense
                outlined
              />
            </section>
            <section class="col">
              <label class="text-body2 text-weight-regular"
                >Per Period<span class="text-red">*</span></label
              >
              <q-select
                v-model="flexibleShiftModel.assignedHoursPeriod"
                :options="periodOptions"
                color="teal"
                dense
                outlined
                label="Select period"
              />
            </section>
          </div>
        </q-card-section>
        <q-card-section class="row justify-end">
          <q-btn no-caps flat class="" label="Cancel" v-close-popup />
          <q-btn
            no-caps
            flat
            class="text-white bg-teal-8 q-px-lg q-py-xs"
            label="Save"
            @click="createFlexibleShift()"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Edit Regular Shift Dialog -->
    <q-dialog v-model="editRegularDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="text-center">
          <h6 class="text-center q-ma-none">Edit Regular Shift</h6>
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-none q-pb-sm">
          <label>Shift Name<span class="text-red">*</span></label>
          <q-input v-model="regularShiftModel.name" color="teal" dense outlined />
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-none q-pb-sm">
          <label>Shift Id<span class="text-red">*</span></label>
          <q-input
            v-model="regularShiftModel.shiftId"
            input-class="text-grey-6"
            color="teal"
            dense
            outlined
            readonly
          />
        </q-card-section>
        <q-card-section class="q-px-lg q-py-sm">
          <label class="text-body2 text-weight-regular"
            >Schedule<span class="text-red">*</span></label
          >
          <div class="row q-gutter-x-lg">
            <section class="col">
              <q-input
                type="time"
                v-model="regularShiftModel.schedule[0]"
                color="teal"
                dense
                outlined
                label="Start time"
              />
            </section>
            <section class="col">
              <q-input
                type="time"
                v-model="regularShiftModel.schedule[1]"
                color="teal"
                dense
                outlined
                label="End time"
              />
            </section>
          </div>
        </q-card-section>
        <q-card-section class="q-px-lg q-py-sm">
          <label class="text-body2 text-weight-regular">Break Time</label>
          <div :class="regularShiftModel.break.length !== 0 ? 'bg-grey-3 q-pa-md' : ''">
            <div
              v-for="(breakEl, breakIndex) in regularShiftModel.break"
              :key="breakIndex"
              :class="
                breakIndex !== regularShiftModel.break.length - 1
                  ? 'row items-center q-gutter-x-md q-pb-xs'
                  : 'row items-center q-gutter-x-md q-mb-none'
              "
            >
              <section class="col">
                <q-input
                  type="time"
                  v-model="breakEl[0]"
                  color="teal"
                  bg-color="white"
                  dense
                  outlined
                  label="Start time"
                />
              </section>
              <section class="col">
                <q-input
                  type="time"
                  v-model="breakEl[1]"
                  color="teal"
                  bg-color="white"
                  dense
                  outlined
                  label="End time"
                />
              </section>
              <section>
                <q-btn
                  dense
                  class="text-grey-8 bg-grey-3 q-pa-sm"
                  style="border: 1px solid #cfd8dc"
                  icon="las la-trash-alt"
                  @click="regularShiftModel.break.splice(breakIndex, 1)"
                />
              </section>
            </div>
          </div>
          <q-btn
            flat
            no-caps
            class="text-grey-9 bg-grey-3 q-mt-sm"
            style="border: 1px solid #cfd8dc"
            label="Add Break Time"
            @click="regularShiftModel.break.push(['', ''])"
          />
        </q-card-section>
        <q-card-section class="q-px-lg q-py-sm">
          <label class="text-body2 text-weight-regular">Work Days</label>
          <div class="row text-caption q-gutter-x-sm">
            <q-checkbox
              v-model="regularShiftModel.appliedDays"
              dense
              val="Mon"
              label="Mon"
              color="teal-8"
            />
            <q-checkbox
              v-model="regularShiftModel.appliedDays"
              dense
              val="Tue"
              label="Tue"
              color="teal-8"
            />
            <q-checkbox
              v-model="regularShiftModel.appliedDays"
              dense
              val="Wed"
              label="Wed"
              color="teal-8"
            />
            <q-checkbox
              v-model="regularShiftModel.appliedDays"
              dense
              val="Thu"
              label="Thu"
              color="teal-8"
            />
            <q-checkbox
              v-model="regularShiftModel.appliedDays"
              dense
              val="Fri"
              label="Fri"
              color="teal-8"
            />
            <q-checkbox
              v-model="regularShiftModel.appliedDays"
              dense
              val="Sat"
              label="Sat"
              color="teal-8"
            />
            <q-checkbox
              v-model="regularShiftModel.appliedDays"
              dense
              val="Sun"
              label="Sun"
              color="teal-8"
            />
          </div>
        </q-card-section>
        <q-card-section class="row justify-end">
          <q-btn no-caps flat class="" label="Cancel" v-close-popup />
          <q-btn
            no-caps
            flat
            class="text-white bg-teal-8 q-px-lg q-py-xs"
            label="Save"
            @click="updateRegularShift()"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Edit Flexible Shift Dialog -->
    <q-dialog v-model="editFlexibleDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="text-center">
          <h6 class="text-center q-ma-none">Edit Flexible Shift</h6>
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-none q-pb-sm">
          <label>Shift Name<span class="text-red">*</span></label>
          <q-input v-model="flexibleShiftModel.name" color="teal" dense outlined />
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-none q-pb-sm">
          <label>Shift Id<span class="text-red">*</span></label>
          <q-input
            v-model="flexibleShiftModel.shiftId"
            input-class="text-grey-6"
            color="teal"
            dense
            outlined
            readonly
          />
        </q-card-section>
        <q-card-section class="q-px-lg q-py-sm">
          <div class="row q-gutter-x-lg">
            <section class="col">
              <label class="text-body2 text-weight-regular"
                >Assigned Hours<span class="text-red">*</span></label
              >
              <q-input
                v-model="flexibleShiftModel.assignedHours"
                color="teal"
                dense
                outlined
              />
            </section>
            <section class="col">
              <label class="text-body2 text-weight-regular"
                >Per Period<span class="text-red">*</span></label
              >
              <q-select
                v-model="flexibleShiftModel.assignedHoursPeriod"
                :options="periodOptions"
                color="teal"
                dense
                outlined
                label="Select period"
              />
            </section>
          </div>
        </q-card-section>
        <q-card-section class="row justify-end">
          <q-btn no-caps flat class="" label="Cancel" v-close-popup />
          <q-btn
            no-caps
            flat
            class="text-white bg-teal-8 q-px-lg q-py-xs"
            label="Save"
            @click="updateFlexibleShift()"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted } from "vue";
import { ShiftApi } from "src/api";
import { DocModel, EmployerModel } from "src/models";

// session
const session = ref({ dbname: "attofund" });

// component-related
const tab = ref("regular");
const regularShiftBatch = ref([]);
const flexibleShiftBatch = ref([]);
const regularShiftList = ref([]);
const flexibleShiftList = ref([]);
const addRegularDialog = ref(false); // dialogs for regular shift modification
const editRegularDialog = ref(false);
const deleteRegularDialog = ref(false);
const addFlexibleDialog = ref(false); // dialogs for flexible shift modification
const editFlexibleDialog = ref(false);
const deleteFlexibleDialog = ref(false);
const periodOptions = ref(["Monthly", "Semimonthly", "Biweekly", "Weekly"]);
const stats = ref({
  totalResultsRegular: null,
  totalResultsFlexible: null,
});

const paginationRegular = {
  currentPage: 1,
  totalPage: 1,
  rowsPerPage: 10,
  batch: 5,
};
const paginationFlexible = {
  currentPage: 1,
  totalPage: 1,
  rowsPerPage: 10,
  batch: 5,
};
const startkeyIndex = ref({
  regularShift: new Map(), // start key index saving for regular shift
  flexibleShift: new Map(), // start key index saving for flesible shift
});

// models
const dbURLModel = <DocModel.IDBURL>ref({});
const docURLModel = <DocModel.IDocURL>ref({});
const docPaginationModel = <DocModel.IDocPagination>ref({});
const regularShiftModel = <EmployerModel.IRegularShift>ref({});
const flexibleShiftModel = <EmployerModel.IFlexibleShift>ref({});

export default {
  setup() {
    return {
      regularShiftList,
      flexibleShiftList,
      addRegularDialog,
      addFlexibleDialog,
      editRegularDialog,
      editFlexibleDialog,
      deleteRegularDialog,
      deleteFlexibleDialog,
      stats,
      periodOptions,
      regularShiftModel,
      flexibleShiftModel,
      paginationRegular,
      paginationFlexible,
      tab,
    };
  },
  methods: {
    callAddRegularDialog() {
      addRegularDialog.value = true;
      this.regularShiftModel = {
        name: "",
        shiftId: "",
        schedule: ["", ""],
        break: [["", ""]],
        appliedDays: [],
      };
    },
    callAddFlexibleDialog() {
      addFlexibleDialog.value = true;
      this.flexibleShiftModel = {
        name: "",
        shiftId: "",
        assignedHours: null,
        assignedHoursPeriod: null,
      };
    },
    callEditRegularDialog(
      key: string,
      _id: string,
      _name: string,
      _schedule: [string, string],
      _break: [string, string][],
      _appliedDays: string[]
    ) {
      docURLModel.value.docid = key;
      this.regularShiftModel = {
        name: _name,
        shiftId: _id,
        schedule: _schedule,
        break: _break,
        appliedDays: _appliedDays,
      };
      editRegularDialog.value = true;
    },
    callEditFlexibleDialog(
      key: string,
      _id: string,
      _name: string,
      _assignedHours: number,
      _assignedHoursPeriod: string
    ) {
      docURLModel.value.docid = key;
      this.flexibleShiftModel = {
        name: _name,
        shiftId: _id,
        assignedHours: _assignedHours,
        assignedHoursPeriod: _assignedHoursPeriod,
      };
      editFlexibleDialog.value = true;
    },
    callDeleteRegularDialog(
      key: string,
      _id: string,
      _name: string,
      _schedule: [string, string],
      _break: [string, string][],
      _appliedDays: string[]
    ) {
      docURLModel.value.docid = key;
      this.regularShiftModel = {
        name: _name,
        shiftId: _id,
        schedule: _schedule,
        break: _break,
        appliedDays: _appliedDays,
      };
      deleteRegularDialog.value = true;
    },
    callDeleteFlexibleDialog(
      key: string,
      _id: string,
      _name: string,
      _assignedHours: number,
      _assignedHoursPeriod: string
    ) {
      docURLModel.value.docid = key;
      this.flexibleShiftModel = {
        name: _name,
        shiftId: _id,
        assignedHours: _assignedHours,
        assignedHoursPeriod: _assignedHoursPeriod,
      };
      deleteFlexibleDialog.value = true;
    },
    dataToRegularShiftBatch(data: any) {
      // this method is component specific
      regularShiftBatch.value = [];
      data.forEach((el) => {
        regularShiftBatch.value.push(el);
      });
    },
    dataToFlexibleShiftBatch(data: any) {
      // this method is component specific
      flexibleShiftBatch.value = [];
      data.forEach((el) => {
        flexibleShiftBatch.value.push(el);
      });
    },
    batchToListRegularShift(index: number) {
      // this method is component specific
      const indexFrom = index;
      const indexTil =
        indexFrom + this.paginationRegular.rowsPerPage > regularShiftBatch.value.length
          ? regularShiftBatch.value.length
          : indexFrom + this.paginationRegular.rowsPerPage;
      regularShiftList.value = [];
      for (let i = indexFrom; i < indexTil; i++) {
        regularShiftList.value.push(regularShiftBatch.value.at(i));
      }
    },
    batchToListFlexibleShift(index: number) {
      // this method is component specific
      const indexFrom = index;
      const indexTil =
        indexFrom + this.paginationFlexible.rowsPerPage > flexibleShiftBatch.value.length
          ? flexibleShiftBatch.value.length
          : indexFrom + this.paginationFlexible.rowsPerPage;
      flexibleShiftList.value = [];
      for (let i = indexFrom; i < indexTil; i++) {
        flexibleShiftList.value.push(flexibleShiftBatch.value.at(i));
      }
    },
    storeRegularShiftStartKey(page: number, startkey: string) {
      if (!startkeyIndex.value.regularShift.has(page)) {
        startkeyIndex.value.regularShift.set(page, startkey);
      }
    },
    storeFlexibleShiftStartKey(page: number, startkey: string) {
      if (!startkeyIndex.value.flexibleShift.has(page)) {
        startkeyIndex.value.flexibleShift.set(page, startkey);
      }
    },
    setUpPaginationRegular: async function () {
      this.paginationRegular.currentPage = 1;
      startkeyIndex.value.regularShift.clear();
      //
      this.docPaginationModel = {
        dbname: session.value.dbname,
        startkey: "",
        limit: this.paginationRegular.rowsPerPage * this.paginationRegular.batch + 1,
      };
      const dataNewBatch = await this.getPagRegularShift();
      stats.value.totalResultsRegular = dataNewBatch.body.total_rows;
      this.paginationRegular.totalPage = Math.ceil(
        dataNewBatch.body.total_rows / this.paginationRegular.rowsPerPage
      ); // update number of total pages
      this.storeRegularShiftStartKey(
        Math.ceil(this.paginationRegular.currentPage / this.paginationRegular.batch),
        dataNewBatch.body.rows[0].id
      ); // add startkey for this batch
      if (
        dataNewBatch.body.rows.length ===
        this.paginationRegular.rowsPerPage * this.paginationRegular.batch + 1
      ) {
        // add startkey for next batch, if exists
        this.storeRegularShiftStartKey(
          Math.ceil(this.paginationRegular.currentPage / this.paginationRegular.batch) +
            1,
          dataNewBatch.body.rows[dataNewBatch.body.rows.length - 1].id
        );
      }
      this.dataToRegularShiftBatch(dataNewBatch.body.rows); // put updated getPag response into batch
      this.batchToListRegularShift(0);
    },
    setUpPaginationFlexible: async function () {
      this.paginationFlexible.currentPage = 1;
      startkeyIndex.value.flexibleShift.clear();
      //
      this.docPaginationModel = {
        dbname: session.value.dbname,
        startkey: "",
        limit: this.paginationFlexible.rowsPerPage * this.paginationFlexible.batch + 1,
      };
      const dataNewBatch = await this.getPagFlexibleShift();
      stats.value.totalResultsFlexible = dataNewBatch.body.total_rows;
      this.paginationFlexible.totalPage = Math.ceil(
        dataNewBatch.body.total_rows / this.paginationFlexible.rowsPerPage
      ); // update number of total pages
      this.storeFlexibleShiftStartKey(
        Math.ceil(this.paginationFlexible.currentPage / this.paginationFlexible.batch),
        dataNewBatch.body.rows[0].id
      ); // add startkey for this batch
      if (
        dataNewBatch.body.rows.length ===
        this.paginationFlexible.rowsPerPage * this.paginationFlexible.batch + 1
      ) {
        // add startkey for next batch, if exists
        this.storeFlexibleShiftStartKey(
          Math.ceil(this.paginationFlexible.currentPage / this.paginationFlexible.batch) +
            1,
          dataNewBatch.body.rows[dataNewBatch.body.rows.length - 1].id
        );
      }
      this.dataToFlexibleShiftBatch(dataNewBatch.body.rows); // put updated getPag response into batch
      this.batchToListFlexibleShift(0);
    },
    getPagRegularShift: async function () {
      const res = await ShiftApi.getPagRegularShift(this.docPaginationModel);
      return res;
    },
    getPagFlexibleShift: async function () {
      const res = await ShiftApi.getPagFlexibleShift(this.docPaginationModel);
      return res;
    },
    createRegularShift: async function () {
      const res = await ShiftApi.createRegularShift(
        dbURLModel.value,
        regularShiftModel.value
      );
      this.setUpPaginationRegular();
      return res;
    },
    createFlexibleShift: async function () {
      const res = await ShiftApi.createFlexibleShift(
        dbURLModel.value,
        flexibleShiftModel.value
      );
      this.setUpPaginationFlexible();
      return res;
    },
    updateRegularShift: async function () {
      const res = await ShiftApi.updateRegularShift(
        docURLModel.value,
        regularShiftModel.value
      );
      this.setUpPaginationRegular();
      return res;
    },
    updateFlexibleShift: async function () {
      const res = await ShiftApi.updateFlexibleShift(
        docURLModel.value,
        flexibleShiftModel.value
      );
      this.setUpPaginationFlexible();
      return res;
    },
    removeRegularShift: async function () {
      const res = await ShiftApi.removeRegularShift(docURLModel.value);
      this.setUpPaginationRegular();
      return res;
    },
    removeFlexibleShift: async function () {
      const res = await ShiftApi.removeFlexibleShift(docURLModel.value);
      this.setUpPaginationFlexible();
      return res;
    },
  },
  watch: {
    "paginationRegular.currentPage": async function (newVal: number, oldVal: number) {
      const movePage =
        Math.ceil(newVal / this.paginationRegular.batch) -
        Math.ceil(oldVal / this.paginationRegular.batch); // +1 moved to next, -1 moved to previous, 0 current batch
      const pageIndex =
        newVal % this.paginationRegular.batch === 0
          ? (this.paginationRegular.batch - 1) * this.paginationRegular.rowsPerPage
          : ((newVal % this.paginationRegular.batch) - 1) *
            this.paginationRegular.rowsPerPage;
      if (movePage !== 0) {
        if (movePage > 0) {
          // move to the next batch
          this.docPaginationModel.startkey = startkeyIndex.value.regularShift.get(
            Math.ceil(oldVal / this.paginationRegular.batch) + 1
          );
        } else {
          // move to the previous batch
          this.docPaginationModel.startkey = startkeyIndex.value.regularShift.get(
            Math.ceil(oldVal / this.paginationRegular.batch) - 1
          );
        }
        const dataNewBatch = await this.getPagRegularShift();
        this.paginationRegular.totalPage = Math.ceil(
          dataNewBatch.body.total_rows / this.paginationRegular.rowsPerPage
        ); // update number of total pages
        this.storeRegularShiftStartKey(
          Math.ceil(this.paginationRegular.currentPage / this.paginationRegular.batch),
          dataNewBatch.body.rows[0].id
        ); // add startkey for this batch
        if (
          dataNewBatch.body.rows.length ===
          this.paginationRegular.rowsPerPage * this.paginationRegular.batch + 1
        ) {
          // add startkey for next batch, if exists
          this.storeRegularShiftStartKey(
            Math.ceil(this.paginationRegular.currentPage / this.paginationRegular.batch) +
              1,
            dataNewBatch.body.rows[dataNewBatch.body.rows.length - 1].id
          );
        }
        this.dataToRegularShiftBatch(dataNewBatch.body.rows); // put updated getPag response into batch
      }
      this.batchToListRegularShift(pageIndex);
    },
    "paginationFlexible.currentPage": async function (newVal: number, oldVal: number) {
      const movePage =
        Math.ceil(newVal / this.paginationFlexible.batch) -
        Math.ceil(oldVal / this.paginationFlexible.batch); // +1 moved to next, -1 moved to previous, 0 current batch
      const pageIndex =
        newVal % this.paginationFlexible.batch === 0
          ? (this.paginationFlexible.batch - 1) * this.paginationFlexible.rowsPerPage
          : ((newVal % this.paginationFlexible.batch) - 1) *
            this.paginationFlexible.rowsPerPage;
      if (movePage !== 0) {
        if (movePage > 0) {
          // move to the next batch
          this.docPaginationModel.startkey = startkeyIndex.value.flexibleShift.get(
            Math.ceil(oldVal / this.paginationFlexible.batch) + 1
          );
        } else {
          // move to the previous batch
          this.docPaginationModel.startkey = startkeyIndex.value.flexibleShift.get(
            Math.ceil(oldVal / this.paginationFlexible.batch) - 1
          );
        }
        const dataNewBatch = await this.getPagFlexibleShift();
        this.paginationFlexible.totalPage = Math.ceil(
          dataNewBatch.body.total_rows / this.paginationFlexible.rowsPerPage
        ); // update number of total pages
        this.storeFlexibleShiftStartKey(
          Math.ceil(this.paginationFlexible.currentPage / this.paginationFlexible.batch),
          dataNewBatch.body.rows[0].id
        ); // add startkey for this batch
        if (
          dataNewBatch.body.rows.length ===
          this.paginationFlexible.rowsPerPage * this.paginationFlexible.batch + 1
        ) {
          // add startkey for next batch, if exists
          this.storeFlexibleShiftStartKey(
            Math.ceil(
              this.paginationFlexible.currentPage / this.paginationFlexible.batch
            ) + 1,
            dataNewBatch.body.rows[dataNewBatch.body.rows.length - 1].id
          );
        }
        this.dataToFlexibleShiftBatch(dataNewBatch.body.rows); // put updated getPag response into batch
      }
      this.batchToListFlexibleShift(pageIndex);
    },
    "paginationRegular.rowsPerPage": async function (newVal: number) {
      this.setUpPaginationRegular();
    },
    "paginationFlexible.rowsPerPage": async function (newVal: number) {
      this.setUpPaginationFlexible();
    },
  },
  mounted: async function mounted() {
    this.setUpPaginationRegular();
    this.setUpPaginationFlexible();
    dbURLModel.value.dbname = session.value.dbname;
    docURLModel.value.dbname = session.value.dbname;
  },
};
</script>
