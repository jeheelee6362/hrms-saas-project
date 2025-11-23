<template>
  <div>
    <h3 class="text-h5 text-weight-medium q-ma-none">Payroll Components</h3>
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
          <q-breadcrumbs-el label="Payroll Components" />
        </q-breadcrumbs>
      </div>
      <div class="q-gutter-x-sm">
        <q-btn-dropdown
          no-caps
          rounded
          class="text-white bg-teal-8"
          icon="las la-plus"
          label="Add Item"
        >
          <q-card>
            <q-item
              class="flex items-center q-pr-xl"
              dense
              clickable
              v-close-popup
              @click="callAddEarningsDialog"
              >Earnings</q-item
            >
            <q-item
              class="flex items-center q-pr-xl"
              dense
              clickable
              v-close-popup
              @click="callAddDeductionsDialog"
              >Deductions</q-item
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
        <q-tab no-caps name="earnings" label="Earnings" />
        <q-tab no-caps name="deductions" label="Deductions" />
      </q-tabs>
      <q-separator />
    </div>
    <div class="q-mt-md">
      <!-- Tab Panels -->
      <q-tab-panels class="full-width bg-blue-grey-1" v-model="tab" animated>
        <q-tab-panel name="earnings">
          <div>
            <label class="text-body2 q-mt-sm">
              <span>Show </span>
              <select v-model="paginationEarnings.rowsPerPage">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span> entries</span>
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
                <th>Name</th>
                <th>Component ID</th>
                <th>Unit</th>
                <th>Rate</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(el, index) in earningsComponentList"
                :key="index"
                :class="index % 2 === 0 ? 'bg-grey-2' : 'bg-white'"
              >
                <td>
                  {{
                    (paginationEarnings.currentPage - 1) *
                      paginationEarnings.rowsPerPage +
                    index +
                    1
                  }}
                </td>
                <td>{{ el.value.name }}</td>
                <td>{{ el.value.componentId }}</td>
                <td>{{ el.value.unit }}</td>
                <td>
                  <span
                    v-if="el.value.rate.base !== null && el.value.rate.value !== null"
                    >{{ el.value.rate.base + " x" + el.value.rate.value }}</span
                  >
                </td>
                <td>{{ el.value.type }}</td>
                <td>
                  <q-btn dense round size="md" flat icon="las la-ellipsis-v">
                    <q-popup-proxy>
                      <q-card>
                        <q-item
                          class="flex items-center q-pr-xl"
                          dense
                          clickable
                          v-close-popup
                          ><q-icon name="las la-pencil-alt" class="q-mr-sm" />Edit</q-item
                        >
                        <q-item
                          class="flex items-center q-pr-xl"
                          dense
                          clickable
                          v-close-popup
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
              v-model="paginationEarnings.currentPage"
              color="black"
              :max="paginationEarnings.totalPage"
              :max-pages="paginationEarnings.batch"
              dense
              :boundary-numbers="false"
              :ellipses="false"
              direction-links
            />
          </div> </q-tab-panel
        ><q-tab-panel name="deductions">
          <div>
            <label class="text-body2 q-mt-sm">
              <span>Show </span>
              <select v-model="paginationDeductions.rowsPerPage">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span> entries</span>
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
                <th>Name</th>
                <th>Component ID</th>
                <th>Unit</th>
                <th>Rate</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(el, index) in deductionsComponentList"
                :key="index"
                :class="index % 2 === 0 ? 'bg-grey-2' : 'bg-white'"
              >
                <td>
                  {{
                    (paginationDeductions.currentPage - 1) *
                      paginationDeductions.rowsPerPage +
                    index +
                    1
                  }}
                </td>
                <td>{{ el.value.name }}</td>
                <td>{{ el.value.componentId }}</td>
                <td>{{ el.value.unit }}</td>
                <td>
                  <span
                    v-if="el.value.rate.base !== null && el.value.rate.value !== null"
                    >{{ el.value.rate.base + " x" + el.value.rate.value }}</span
                  >
                </td>
                <td>{{ el.value.type }}</td>
                <td>
                  <q-btn dense round size="md" flat icon="las la-ellipsis-v">
                    <q-popup-proxy>
                      <q-card>
                        <q-item class="flex items-center q-pr-xl" dense clickable
                          ><q-icon name="las la-pencil-alt" class="q-mr-sm" />Edit</q-item
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
          <div class="q-pa-lg flex flex-center">
            <q-pagination
              v-model="paginationDeductions.currentPage"
              color="black"
              :max="paginationDeductions.totalPage"
              :max-pages="paginationDeductions.batch"
              dense
              :boundary-numbers="false"
              :ellipses="false"
              direction-links
            /></div></q-tab-panel
      ></q-tab-panels>
    </div>
    <!-- Add Earnings Component Dialog -->
    <q-dialog v-model="addEarningsDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="text-center">
          <h6 class="text-center q-ma-none">Add Earnings</h6>
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-none q-pb-sm">
          <label>Name<span class="text-red">*</span></label>
          <q-input v-model="payrollComponentModel.name" color="teal" dense outlined />
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-none q-pb-sm">
          <label>Component Id<span class="text-red">*</span></label>
          <q-input
            v-model="payrollComponentModel.componentId"
            color="teal"
            dense
            outlined
          />
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-none q-pb-sm">
          <label>Unit Amount</label>
          <q-input v-model="payrollComponentModel.unit" color="teal" dense outlined />
        </q-card-section>
        <q-card-section class="q-px-lg q-py-sm">
          <div class="row q-gutter-x-lg">
            <section class="col">
              <label class="text-body2 text-weight-regular">Rate</label>
              <q-input
                v-model="payrollComponentModel.rate.value"
                color="teal"
                dense
                outlined
              />
            </section>
            <section class="col">
              <label class="text-body2 text-weight-regular">Base (for rate)</label>
              <q-select
                v-model="payrollComponentModel.rate.base"
                :options="['Hourly', 'Daily']"
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
            @click="createEarningsComponent()"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Add Deductions Component Dialog -->
    <q-dialog v-model="addDeductionsDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="text-center">
          <h6 class="text-center q-ma-none">Add Deductions</h6>
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-none q-pb-sm">
          <label>Name<span class="text-red">*</span></label>
          <q-input v-model="payrollComponentModel.name" color="teal" dense outlined />
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-none q-pb-sm">
          <label>Component Id<span class="text-red">*</span></label>
          <q-input
            v-model="payrollComponentModel.componentId"
            color="teal"
            dense
            outlined
          />
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-none q-pb-sm">
          <label>Unit Amount</label>
          <q-input v-model="payrollComponentModel.unit" color="teal" dense outlined />
        </q-card-section>
        <q-card-section class="q-px-lg q-py-sm">
          <div class="row q-gutter-x-lg">
            <section class="col">
              <label class="text-body2 text-weight-regular">Rate</label>
              <q-input
                v-model="payrollComponentModel.rate.value"
                color="teal"
                dense
                outlined
              />
            </section>
            <section class="col">
              <label class="text-body2 text-weight-regular">Base (for rate)</label>
              <q-select
                v-model="payrollComponentModel.rate.base"
                :options="['Hourly', 'Daily']"
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
            @click="createDeductionsComponent()"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted } from "vue";
import { PayrollComponentApi } from "src/api";
import { DocModel, PayrollComponentModel } from "src/models";

// session
const session = ref({ dbname: "attofund" });

// component-related
const tab = ref("earnings");
const earningsComponentBatch = ref([]);
const deductionsComponentBatch = ref([]);
const earningsComponentList = ref([]);
const deductionsComponentList = ref([]);
const addEarningsDialog = ref(false); // dialogs for earnings payroll component modification
const editEarningsDialog = ref(false);
const deleteEarningsDialog = ref(false);
const addDeductionsDialog = ref(false); // dialogs for deductions payroll component modification
const editDeductionsDialog = ref(false);
const deleteDeductionsDialog = ref(false);

const paginationEarnings = {
  currentPage: 1,
  totalPage: 1,
  rowsPerPage: 10,
  batch: 5,
};
const paginationDeductions = {
  currentPage: 1,
  totalPage: 1,
  rowsPerPage: 10,
  batch: 5,
};
const startkeyIndex = ref({
  earningsComponent: new Map(), // start key index saving for earnings component
  deductionsComponent: new Map(), // start key index saving for deductions component
});

// models
const dbURLModel = <DocModel.IDBURL>ref({});
const docURLModel = <DocModel.IDocURL>ref({});
const docPaginationModel = <DocModel.IDocPagination>ref({});
const payrollComponentModel = <PayrollComponentModel.IPayrollComponent>ref({});

export default {
  setup() {
    return {
      earningsComponentList,
      deductionsComponentList,
      addEarningsDialog,
      addDeductionsDialog,
      editEarningsDialog,
      editDeductionsDialog,
      deleteEarningsDialog,
      deleteDeductionsDialog,
      payrollComponentModel,
      paginationEarnings,
      paginationDeductions,
      tab,
    };
  },
  methods: {
    callAddEarningsDialog() {
      addEarningsDialog.value = true;
      this.payrollComponentModel = {
        componentId: null,
        name: null,
        unit: null,
        rate: {
          value: null,
          base: null,
        },
        type: "Custom",
      };
    },
    callAddDeductionsDialog() {
      addDeductionsDialog.value = true;
      this.payrollComponentModel = {
        componentId: null,
        name: null,
        unit: null,
        rate: {
          value: null,
          base: null,
        },
        type: "Custom",
      };
    },
    callEditEarningsDialog(
      key: string,
      _id: string,
      _name: string,
      _unit: number,
      _ratevalue: number,
      _ratebase: string,
      _type: string
    ) {
      docURLModel.value.docid = key;
      this.payrollComponentModel = {
        componentId: _id,
        name: _name,
        unit: _unit,
        rate: {
          value: _ratevalue,
          base: _ratebase,
        },
        type: _type,
      };
      editEarningsDialog.value = true;
    },
    callEditDeductionsDialog(
      key: string,
      _id: string,
      _name: string,
      _unit: number,
      _ratevalue: number,
      _ratebase: string,
      _type: string
    ) {
      docURLModel.value.docid = key;
      this.payrollComponentModel = {
        componentId: _id,
        name: _name,
        unit: _unit,
        rate: {
          value: _ratevalue,
          base: _ratebase,
        },
        type: _type,
      };
      editDeductionsDialog.value = true;
    },
    callDeleteEarningsDialog(
      key: string,
      _id: string,
      _name: string,
      _unit: number,
      _ratevalue: number,
      _ratebase: string,
      _type: string
    ) {
      docURLModel.value.docid = key;
      this.payrollComponentModel = {
        componentId: _id,
        name: _name,
        unit: _unit,
        rate: {
          value: _ratevalue,
          base: _ratebase,
        },
        type: _type,
      };
      deleteEarningsDialog.value = true;
    },
    callDeleteDeductionsDialog(
      key: string,
      _id: string,
      _name: string,
      _unit: number,
      _ratevalue: number,
      _ratebase: string,
      _type: string
    ) {
      docURLModel.value.docid = key;
      this.payrollComponentModel = {
        componentId: _id,
        name: _name,
        unit: _unit,
        rate: {
          value: _ratevalue,
          base: _ratebase,
        },
        type: _type,
      };
      deleteDeductionsDialog.value = true;
    },
    dataToEarningsComponentBatch(data: any) {
      // this method is component specific
      earningsComponentBatch.value = [];
      data.forEach((el) => {
        earningsComponentBatch.value.push(el);
      });
    },
    dataToDeductionsComponentBatch(data: any) {
      // this method is component specific
      deductionsComponentBatch.value = [];
      data.forEach((el) => {
        deductionsComponentBatch.value.push(el);
      });
    },
    batchToListEarningsComponent(index: number) {
      // this method is component specific
      const indexFrom = index;
      const indexTil =
        indexFrom + this.paginationEarnings.rowsPerPage >
        earningsComponentBatch.value.length
          ? earningsComponentBatch.value.length
          : indexFrom + this.paginationEarnings.rowsPerPage;
      earningsComponentList.value = [];
      for (let i = indexFrom; i < indexTil; i++) {
        earningsComponentList.value.push(earningsComponentBatch.value.at(i));
      }
    },
    batchToListDeductionsComponent(index: number) {
      // this method is component specific
      const indexFrom = index;
      const indexTil =
        indexFrom + this.paginationDeductions.rowsPerPage >
        deductionsComponentBatch.value.length
          ? deductionsComponentBatch.value.length
          : indexFrom + this.paginationDeductions.rowsPerPage;
      deductionsComponentList.value = [];
      for (let i = indexFrom; i < indexTil; i++) {
        deductionsComponentList.value.push(deductionsComponentBatch.value.at(i));
      }
    },
    storeEarningsComponentStartKey(page: number, startkey: string) {
      if (!startkeyIndex.value.earningsComponent.has(page)) {
        startkeyIndex.value.earningsComponent.set(page, startkey);
      }
    },
    storeDeductionsComponentStartKey(page: number, startkey: string) {
      if (!startkeyIndex.value.deductionsComponent.has(page)) {
        startkeyIndex.value.deductionsComponent.set(page, startkey);
      }
    },
    setUpPaginationEarnings: async function () {
      this.paginationEarnings.currentPage = 1;
      startkeyIndex.value.earningsComponent.clear();
      //
      this.docPaginationModel = {
        dbname: session.value.dbname,
        startkey: "",
        limit: this.paginationEarnings.rowsPerPage * this.paginationEarnings.batch + 1,
      };
      const dataNewBatch = await this.getPagEarningsComponent();
      this.paginationEarnings.totalPage = Math.ceil(
        dataNewBatch.body.total_rows / this.paginationEarnings.rowsPerPage
      ); // update number of total pages
      this.storeEarningsComponentStartKey(
        Math.ceil(this.paginationEarnings.currentPage / this.paginationEarnings.batch),
        dataNewBatch.body.rows[0].id
      ); // add startkey for this batch
      if (
        dataNewBatch.body.rows.length ===
        this.paginationEarnings.rowsPerPage * this.paginationEarnings.batch + 1
      ) {
        // add startkey for next batch, if exists
        this.storeEarningsComponentStartKey(
          Math.ceil(this.paginationEarnings.currentPage / this.paginationEarnings.batch) +
            1,
          dataNewBatch.body.rows[dataNewBatch.body.rows.length - 1].id
        );
      }
      this.dataToEarningsComponentBatch(dataNewBatch.body.rows); // put updated getPag response into batch
      this.batchToListEarningsComponent(0);
    },
    setUpPaginationDeductions: async function () {
      this.paginationDeductions.currentPage = 1;
      startkeyIndex.value.deductionsComponent.clear();
      //
      this.docPaginationModel = {
        dbname: session.value.dbname,
        startkey: "",
        limit:
          this.paginationDeductions.rowsPerPage * this.paginationDeductions.batch + 1,
      };
      const dataNewBatch = await this.getPagDeductionsComponent();
      this.paginationDeductions.totalPage = Math.ceil(
        dataNewBatch.body.total_rows / this.paginationDeductions.rowsPerPage
      ); // update number of total pages
      this.storeDeductionsComponentStartKey(
        Math.ceil(
          this.paginationDeductions.currentPage / this.paginationDeductions.batch
        ),
        dataNewBatch.body.rows[0].id
      ); // add startkey for this batch
      if (
        dataNewBatch.body.rows.length ===
        this.paginationDeductions.rowsPerPage * this.paginationDeductions.batch + 1
      ) {
        // add startkey for next batch, if exists
        this.storeEarningsComponentStartKey(
          Math.ceil(
            this.paginationDeductions.currentPage / this.paginationDeductions.batch
          ) + 1,
          dataNewBatch.body.rows[dataNewBatch.body.rows.length - 1].id
        );
      }
      this.dataToDeductionsComponentBatch(dataNewBatch.body.rows); // put updated getPag response into batch
      this.batchToListDeductionsComponent(0);
    },
    getPagEarningsComponent: async function () {
      const res = await PayrollComponentApi.getPagEarningsComponent(
        this.docPaginationModel
      );
      return res;
    },
    getPagDeductionsComponent: async function () {
      const res = await PayrollComponentApi.getPagDeductionsComponent(
        this.docPaginationModel
      );
      return res;
    },
    createEarningsComponent: async function () {
      const res = await PayrollComponentApi.createEarningsComponent(
        dbURLModel.value,
        payrollComponentModel.value
      );
      this.setUpPaginationEarnings();
      return res;
    },
    createDeductionsComponent: async function () {
      const res = await PayrollComponentApi.createDeductionsComponent(
        dbURLModel.value,
        payrollComponentModel.value
      );
      this.setUpPaginationDeductions();
      return res;
    },
    updateEarningsComponent: async function () {
      const res = await PayrollComponentApi.updateEarningsComponent(
        docURLModel.value,
        payrollComponentModel.value
      );
      this.setUpPaginationEarnings();
      return res;
    },
    updateDeductionsComponent: async function () {
      const res = await PayrollComponentApi.updateDeductionsComponent(
        docURLModel.value,
        payrollComponentModel.value
      );
      this.setUpPaginationDeductions();
      return res;
    },
    removeEarningsComponent: async function () {
      const res = await PayrollComponentApi.removeEarningsComponent(docURLModel.value);
      this.setUpPaginationEarnings();
      return res;
    },
    removeDeductionsComponent: async function () {
      const res = await PayrollComponentApi.removeDeductionsComponent(docURLModel.value);
      this.setUpPaginationDeductions();
      return res;
    },
  },
  watch: {
    "paginationEarnings.currentPage": async function (newVal: number, oldVal: number) {
      const movePage =
        Math.ceil(newVal / this.paginationEarnings.batch) -
        Math.ceil(oldVal / this.paginationEarnings.batch); // +1 moved to next, -1 moved to previous, 0 current batch
      const pageIndex =
        newVal % this.paginationEarnings.batch === 0
          ? (this.paginationEarnings.batch - 1) * this.paginationEarnings.rowsPerPage
          : ((newVal % this.paginationEarnings.batch) - 1) *
            this.paginationEarnings.rowsPerPage;
      if (movePage !== 0) {
        if (movePage > 0) {
          // move to the next batch
          this.docPaginationModel.startkey = startkeyIndex.value.earningsComponent.get(
            Math.ceil(oldVal / this.paginationEarnings.batch) + 1
          );
        } else {
          // move to the previous batch
          this.docPaginationModel.startkey = startkeyIndex.value.earningsComponent.get(
            Math.ceil(oldVal / this.paginationEarnings.batch) - 1
          );
        }
        const dataNewBatch = await this.getPagEarningsComponent();
        this.paginationEarnings.totalPage = Math.ceil(
          dataNewBatch.body.total_rows / this.paginationEarnings.rowsPerPage
        ); // update number of total pages
        this.storeEarningsComponentStartKey(
          Math.ceil(this.paginationEarnings.currentPage / this.paginationEarnings.batch),
          dataNewBatch.body.rows[0].id
        ); // add startkey for this batch
        if (
          dataNewBatch.body.rows.length ===
          this.paginationEarnings.rowsPerPage * this.paginationEarnings.batch + 1
        ) {
          // add startkey for next batch, if exists
          this.storeEarningsComponentStartKey(
            Math.ceil(
              this.paginationEarnings.currentPage / this.paginationEarnings.batch
            ) + 1,
            dataNewBatch.body.rows[dataNewBatch.body.rows.length - 1].id
          );
        }
        this.dataToEarningsComponentBatch(dataNewBatch.body.rows); // put updated getPag response into batch
      }
      this.batchToListEarningsComponent(pageIndex);
    },
    "paginationDeductions.currentPage": async function (newVal: number, oldVal: number) {
      const movePage =
        Math.ceil(newVal / this.paginationDeductions.batch) -
        Math.ceil(oldVal / this.paginationDeductions.batch); // +1 moved to next, -1 moved to previous, 0 current batch
      const pageIndex =
        newVal % this.paginationDeductions.batch === 0
          ? (this.paginationDeductions.batch - 1) * this.paginationDeductions.rowsPerPage
          : ((newVal % this.paginationDeductions.batch) - 1) *
            this.paginationDeductions.rowsPerPage;
      if (movePage !== 0) {
        if (movePage > 0) {
          // move to the next batch
          this.docPaginationModel.startkey = startkeyIndex.value.deductionsComponent.get(
            Math.ceil(oldVal / this.paginationDeductions.batch) + 1
          );
        } else {
          // move to the previous batch
          this.docPaginationModel.startkey = startkeyIndex.value.deductionsComponent.get(
            Math.ceil(oldVal / this.paginationDeductions.batch) - 1
          );
        }
        const dataNewBatch = await this.getPagDeductionsComponent();
        this.paginationDeductions.totalPage = Math.ceil(
          dataNewBatch.body.total_rows / this.paginationDeductions.rowsPerPage
        ); // update number of total pages
        this.storeDeductionsComponentStartKey(
          Math.ceil(
            this.paginationDeductions.currentPage / this.paginationDeductions.batch
          ),
          dataNewBatch.body.rows[0].id
        ); // add startkey for this batch
        if (
          dataNewBatch.body.rows.length ===
          this.paginationDeductions.rowsPerPage * this.paginationDeductions.batch + 1
        ) {
          // add startkey for next batch, if exists
          this.storeDeductionsComponentStartKey(
            Math.ceil(
              this.paginationDeductions.currentPage / this.paginationDeductions.batch
            ) + 1,
            dataNewBatch.body.rows[dataNewBatch.body.rows.length - 1].id
          );
        }
        this.dataToDeductionsComponentBatch(dataNewBatch.body.rows); // put updated getPag response into batch
      }
      this.batchToListDeductionsComponent(pageIndex);
    },
    "paginationEarnings.rowsPerPage": async function (newVal: number) {
      this.setUpPaginationEarnings();
    },
    "paginationDeductions.rowsPerPage": async function (newVal: number) {
      this.setUpPaginationDeductions();
    },
  },
  mounted: async function mounted() {
    this.setUpPaginationEarnings();
    this.setUpPaginationDeductions();
    dbURLModel.value.dbname = session.value.dbname;
    docURLModel.value.dbname = session.value.dbname;
  },
};
</script>
