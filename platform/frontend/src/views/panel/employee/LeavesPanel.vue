<template>
  <div>
    <h3 class="text-h5 text-weight-medium q-ma-none">Leaves</h3>
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
          <q-breadcrumbs-el label="Leaves" />
        </q-breadcrumbs>
      </div>
      <div class="q-gutter-x-sm">
        <q-btn
          @click="callLeavePolicy"
          flat
          no-caps
          class="text-grey-10 bg-grey-3"
          style="border: 1px solid #e0e0e0"
          ><div class="flex justify-start items-center">
            <q-icon size="18px" name="las la-flag" /><span class="q-pl-xs">Policy</span>
          </div></q-btn
        >
        <q-btn
          no-caps
          rounded
          class="text-white bg-teal-8"
          icon="las la-plus"
          label="Add Leave"
          @click="callAddDialog()"
        />
      </div>
    </div>
    <div class="row q-gutter-lg q-pt-md">
      <section class="col">
        <q-card bordered flat class="q-pa-md"
          ><div class="flex flex-center text-subtitle1 text-weight-regular">
            Total Requests
          </div>
          <div class="flex flex-center text-h5 text-weight-bold">
            {{ "12" }}
          </div></q-card
        >
      </section>
      <section class="col">
        <q-card bordered flat class="q-pa-md"
          ><div class="flex flex-center text-subtitle1 text-weight-regular">
            Approved Requests
          </div>
          <div class="flex flex-center text-h5 text-weight-bold">
            {{ "12" }}
          </div></q-card
        >
      </section>
      <section class="col">
        <q-card bordered flat class="q-pa-md"
          ><div class="flex flex-center text-subtitle1 text-weight-regular">
            Declined Requests
          </div>
          <div class="flex flex-center text-h5 text-weight-bold">
            {{ "0" }}
          </div></q-card
        >
      </section>
      <section class="col">
        <q-card bordered flat class="q-pa-md"
          ><div class="flex flex-center text-subtitle1 text-weight-regular">
            Pending Requests
          </div>
          <div class="flex flex-center text-h5 text-weight-bold">
            {{ "12" }}
          </div></q-card
        >
      </section>
    </div>
    <div class="row q-gutter-x-lg q-pt-md">
      <section class="col">
        <q-select
          v-model="searchParams.assignee"
          :options="employeeList"
          outlined
          dense
          bg-color="white"
          color="teal-8"
          label="Employee Name"
          emit-value
          map-options
        />
      </section>
      <section class="col">
        <q-select
          v-model="searchParams.leavePolicy"
          :options="leavePolicyList"
          outlined
          dense
          bg-color="white"
          color="teal-8"
          label="Leave Type"
          emit-value
          map-options
        />
      </section>
      <section class="col">
        <q-select
          v-model="searchParams.leaveStatus"
          :options="['approved', 'declined', 'pending']"
          outlined
          dense
          bg-color="white"
          color="teal-8"
          label="Leave Status"
        />
      </section>
      <section class="col">
        <q-input
          v-model="searchParams.dateFrom"
          outlined
          dense
          bg-color="white"
          color="teal-8"
          type="date"
          label="From"
        />
      </section>
      <section class="col">
        <q-input
          v-model="searchParams.dateTo"
          outlined
          dense
          bg-color="white"
          color="teal-8"
          type="date"
          label="To"
        />
      </section>
      <section class="col">
        <q-btn
          flat
          class="text-white bg-black fit"
          label="Search"
          @click="setUpPagination"
        />
      </section>
    </div>
    <div class="q-mt-md">
      <div>
        <label class="text-body2 q-mt-sm">
          <span>Show </span>
          <select v-model="pagination.rowsPerPage">
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span> entries</span>
          <span class="text-grey-9"> · {{ stats.totalResults }} results found</span>
        </label>
        <q-btn-group flat class="float-right">
          <q-btn class="text-label text-weight-medium q-px-sm q-py-none" label="csv" />
          <q-btn class="text-label text-weight-medium q-px-sm q-py-none" label="pdf" />
          <q-btn
            class="text-label text-weight-medium q-px-sm q-py-none q-ml-sm"
            color="light-blue-8"
            icon="las la-print"
            label="print"
          />
        </q-btn-group>
      </div>
      <!-- Leave Table -->
      <q-markup-table class="q-mt-lg">
        <thead>
          <tr class="text-body1 text-weight-bold text-left text-white bg-grey-10">
            <th>#</th>
            <th>Request ID</th>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>Leave Days</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Attachment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(el, index) in leaveRequestList"
            :key="index"
            :class="index % 2 === 0 ? 'bg-grey-2' : 'bg-white'"
          >
            <td>
              {{ (pagination.currentPage - 1) * pagination.rowsPerPage + index + 1 }}
            </td>
            <td>{{ el.value.requestId }}</td>
            <td>{{ el.value.assignee }}</td>
            <td>{{ el.value.leavePolicy }}</td>
            <td>{{ el.value.leaveSchedule[0] }}</td>
            <td>{{ el.value.leaveSchedule[1] }}</td>
            <td>{{ "1 day" }}</td>
            <td>{{ el.value.reason }}</td>

            <td>
              <span class="text-light-blue-8">{{ el.value.status }}</span>
            </td>
            <td>
              <q-btn
                no-caps
                flat
                square
                class="text-white bg-light-blue-8"
                label="Download"
              />
            </td>
            <td>
              <q-btn dense round size="md" flat icon="las la-ellipsis-v">
                <q-popup-proxy>
                  <q-card>
                    <q-item
                      @click="callLeaveBalance"
                      class="flex items-center q-pr-xl"
                      dense
                      clickable
                      v-close-popup
                      ><q-icon name="las la-search" class="q-mr-sm" />Balance</q-item
                    >
                    <q-item
                      class="flex items-center q-pr-xl"
                      dense
                      clickable
                      @click="callEditDialog()"
                      v-close-popup
                      ><q-icon name="las la-pencil-alt" class="q-mr-sm" />Edit</q-item
                    >
                    <q-item
                      class="flex items-center q-pr-xl"
                      dense
                      clickable
                      @click="callDeleteDialog(el.id)"
                      v-close-popup
                      ><q-icon name="las la-trash-alt" class="q-mr-sm" />Delete</q-item
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
          v-model="pagination.currentPage"
          color="black"
          :max="pagination.totalPage"
          :max-pages="pagination.batch"
          dense
          :boundary-numbers="false"
          :ellipses="false"
          direction-links
        />
      </div>
    </div>
    <!-- Add Leave Record Dialog -->
    <q-dialog v-model="addDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="text-center">
          <h6 class="text-center q-ma-none">Add Leave Record</h6>
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-none q-pb-sm">
          <label>Grant To<span class="text-red">*</span></label>
          <q-select
            v-model="leaveRequestModel.assignee"
            :options="employeeList"
            color="teal"
            dense
            outlined
            emit-value
            map-options
          />
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-none q-pb-sm">
          <label>Request Id<span class="text-red">*</span></label>
          <q-input
            v-model="leaveRequestModel.requestId"
            color="teal"
            dense
            outlined
            emit-value
            map-options
          />
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-none q-pb-sm">
          <label>Leave Policy<span class="text-red">*</span></label>
          <q-select
            v-model="leaveRequestModel.leavePolicy"
            :options="leavePolicyList"
            color="teal"
            dense
            outlined
            emit-value
            map-options
          />
        </q-card-section>
        <q-card-section class="q-px-lg q-py-sm">
          <div class="row q-gutter-x-lg">
            <section class="col">
              <label class="text-body2 text-weight-regular"
                >Start From<span class="text-red">*</span></label
              >
              <q-input
                type="date"
                v-model="leaveRequestModel.leaveSchedule[0]"
                color="teal"
                dense
                outlined
              />
            </section>
            <section class="col">
              <label class="text-body2 text-weight-regular"
                >End On<span class="text-red">*</span></label
              >
              <q-input
                type="date"
                v-model="leaveRequestModel.leaveSchedule[1]"
                color="teal"
                dense
                outlined
              />
            </section>
          </div>
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-none q-py-sm">
          <label>Leave Purpose/Reason</label>
          <q-input v-model="leaveRequestModel.reason" color="teal" dense outlined />
        </q-card-section>
        <q-card-section class="row justify-end">
          <q-btn no-caps flat class="" label="Cancel" v-close-popup />
          <q-btn
            no-caps
            flat
            class="text-white bg-teal-8 q-px-lg q-py-xs"
            label="Save"
            @click="createLeaveRequest()"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Delete Dialog -->
    <q-dialog v-model="deleteDialog" persistent>
      <q-card>
        <q-card-section class="text-center">
          <h6 class="text-center q-ma-none">Delete Leave Record</h6>
          <div class="q-mx-lg q-mt-md">
            Are you sure you want to delete <br />this leave record?
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
            @click="removeLeaveRequest()"
            v-close-popup
            >YES</q-item
          >
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted } from "vue";
import { portalRouterStore } from "src/stores/store";
import { EmployeeApi, LeaveApi } from "src/api";
import { DocModel, LeaveModel } from "src/models";
import { getDifferenceInDays } from "src/utils/dateformat";

// session
const session = ref({ dbname: "attofund" });

// component-related
const leaveRequestBatch = ref([]);
const leaveRequestList = ref([]);
const employeeList = ref([]);
const leavePolicyList = ref([]);
const addDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const stats = ref({
  totalResults: null,
});
const searchParams = ref({
  assignee: null,
  leavePolicy: null,
  leaveStatus: null,
  dateFrom: null,
  dateTo: null,
});

const pagination = ref({
  currentPage: 1,
  totalPage: 1,
  rowsPerPage: 10,
  batch: 5,
});
const startkeyIndex = ref(new Map());

// models
const dbURLModel = <DocModel.IDBURL>ref({});
const docURLModel = <DocModel.IDocURL>ref({});
const docPaginationModel = <DocModel.IDocPagination>ref({});
const leaveRequestModel = <LeaveModel.ILeaveRequest>ref({});

export default {
  setup() {
    return {
      leaveRequestList,
      employeeList,
      leavePolicyList,
      stats,
      searchParams,
      addDialog,
      editDialog,
      deleteDialog,
      leaveRequestModel,
      pagination,
    };
  },
  data() {
    const tab = ref(portalRouterStore());
    return {
      tab,
    };
  },
  methods: {
    callAddDialog() {
      addDialog.value = true;
      this.leaveRequestModel = {
        requestId: null,
        leavePolicy: null,
        assignee: null,
        leaveSchedule: [null, null],
        reason: null,
        status: "approved",
        attachment: null,
      };
    },
    callEditDialog() {
      editDialog.value = true;
    },
    callDeleteDialog(key: string) {
      docURLModel.value.docid = key;
      deleteDialog.value = true;
    },
    dataToEmployeeList(data: any) {
      // this method is component specific
      employeeList.value = [];
      data.forEach((el) => {
        employeeList.value.push({
          label: el.value.givenName + " " + el.value.surname,
          value: el.key,
        });
      });
    },
    dataToLeavePolicyList(data: any) {
      // this method is component specific
      leavePolicyList.value = [];
      data.forEach((el) => {
        leavePolicyList.value.push({
          label: el.value.name,
          value: el.key,
        });
      });
    },
    dataToBatch(data: any) {
      // this method is component specific
      leaveRequestBatch.value = [];
      data.forEach((el) => {
        leaveRequestBatch.value.push(el);
      });
    },
    batchToList(index: number) {
      // this method is component specific
      const indexFrom = index;
      const indexTil =
        indexFrom + this.pagination.rowsPerPage > leaveRequestBatch.value.length
          ? leaveRequestBatch.value.length
          : indexFrom + this.pagination.rowsPerPage;
      leaveRequestList.value = [];
      for (let i = indexFrom; i < indexTil; i++) {
        leaveRequestList.value.push(leaveRequestBatch.value.at(i));
      }
    },
    storeStartKey(page: number, startkey: string) {
      if (!startkeyIndex.value.has(page)) {
        startkeyIndex.value.set(page, startkey);
      }
    },
    setUpPagination: async function () {
      this.pagination.currentPage = 1;
      startkeyIndex.value.clear();
      //
      this.docPaginationModel = {
        dbname: session.value.dbname,
        startkey: JSON.stringify([
          searchParams.value.assingee,
          searchParams.value.leavePolicy,
          searchParams.value.leaveStatus,
          searchParams.value.dateFrom,
          searchParams.value.dateTo,
        ]),
      };
      const dataNewBatch = await this.getPagLeaveRequest();
      stats.value.totalResults = dataNewBatch.body.total_rows;
      this.pagination.totalPage = Math.ceil(
        dataNewBatch.body.total_rows / this.pagination.rowsPerPage
      ); // update number of total pages
      this.storeStartKey(
        Math.ceil(this.pagination.currentPage / this.pagination.batch),
        dataNewBatch.body.rows[0].id
      ); // add startkey for this batch
      if (
        dataNewBatch.body.rows.length ===
        this.pagination.rowsPerPage * this.pagination.batch + 1
      ) {
        // add startkey for next batch, if exists
        this.storeStartKey(
          Math.ceil(this.pagination.currentPage / this.pagination.batch) + 1,
          dataNewBatch.body.rows[dataNewBatch.body.rows.length - 1].id
        );
      }
      this.dataToBatch(dataNewBatch.body.rows); // put updated getPag response into batch
      this.batchToList(0);
    },
    getAllEmployeeByName: async function () {
      const res = await EmployeeApi.getAllEmployeeByName(dbURLModel.value);
      return res;
    },
    getAllLeavePolicyByName: async function () {
      const res = await LeaveApi.getAllLeavePolicyByName(dbURLModel.value);
      return res;
    },
    getPagLeaveRequest: async function () {
      const res = await LeaveApi.getPagLeaveRequest(this.docPaginationModel);
      console.log(this.docPaginationModel);
      console.log(res);
      return res;
    },
    createLeaveRequest: async function () {
      const res = await LeaveApi.createLeaveRequest(
        dbURLModel.value,
        leaveRequestModel.value
      );
      this.setUpPagination();
      return res;
    },
    removeLeaveRequest: async function () {
      const res = await LeaveApi.removeLeaveRequest(docURLModel.value);
      this.setUpPagination();
      return res;
    },
    callLeaveBalance() {
      this.tab.empTab = "leavebalance";
    },
    callLeavePolicy() {
      this.tab.empTab = "leavepolicy";
    },
  },
  watch: {
    "pagination.currentPage": async function (newVal: number, oldVal: number) {
      const movePage =
        Math.ceil(newVal / this.pagination.batch) -
        Math.ceil(oldVal / this.pagination.batch); // +1 moved to next, -1 moved to previous, 0 current batch
      const pageIndex =
        newVal % this.pagination.batch === 0
          ? (this.pagination.batch - 1) * this.pagination.rowsPerPage
          : ((newVal % this.pagination.batch) - 1) * this.pagination.rowsPerPage;
      if (movePage !== 0) {
        if (movePage > 0) {
          // move to the next batch
          this.docPaginationModel.startkey = startkeyIndex.value.get(
            Math.ceil(oldVal / this.pagination.batch) + 1
          );
        } else {
          // move to the previous batch
          this.docPaginationModel.startkey = startkeyIndex.value.get(
            Math.ceil(oldVal / this.pagination.batch) - 1
          );
        }
        const dataNewBatch = await this.getPagLeaveRequest();
        this.pagination.totalPage = Math.ceil(
          dataNewBatch.body.total_rows / this.pagination.rowsPerPage
        ); // update number of total pages
        this.storeStartKey(
          Math.ceil(this.pagination.currentPage / this.pagination.batch),
          dataNewBatch.body.rows[0].id
        ); // add startkey for this batch
        if (
          dataNewBatch.body.rows.length ===
          this.pagination.rowsPerPage * this.pagination.batch + 1
        ) {
          // add startkey for next batch, if exists
          this.storeStartKey(
            Math.ceil(this.pagination.currentPage / this.pagination.batch) + 1,
            dataNewBatch.body.rows[dataNewBatch.body.rows.length - 1].id
          );
        }
        this.dataToBatch(dataNewBatch.body.rows); // put updated getPag response into batch
      }
      this.batchToList(pageIndex);
    },
    "pagination.rowsPerPage": async function (newVal: number) {
      this.setUpPagination();
    },
  },
  mounted: async function mounted() {
    this.setUpPagination();
    dbURLModel.value.dbname = session.value.dbname;
    docURLModel.value.dbname = session.value.dbname;
    const dataEmployee = await this.getAllEmployeeByName();
    const dataLeavePolicy = await this.getAllLeavePolicyByName();
    this.dataToEmployeeList(dataEmployee.body.rows);
    this.dataToLeavePolicyList(dataLeavePolicy.body.rows);
  },
};
</script>
