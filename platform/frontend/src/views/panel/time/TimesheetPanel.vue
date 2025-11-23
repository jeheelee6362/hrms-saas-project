<template>
  <div>
    <h3 class="text-h5 text-weight-medium q-ma-none">Timesheet</h3>
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
          <q-breadcrumbs-el label="Timesheet" />
        </q-breadcrumbs>
      </div>
      <div class="q-gutter-x-sm">
        <q-btn
          no-caps
          rounded
          class="text-white bg-teal-8"
          icon="las la-plus"
          label="Add Timesheet"
          @click="callAddDialog"
        />
      </div>
    </div>
    <div class="row q-gutter-lg q-pt-md">
      <section class="col">
        <q-card bordered flat class="q-pa-md full-height"
          ><div class="flex flex-center text-subtitle1 text-weight-regular">
            Today Assigned Hours
          </div>
          <div class="flex flex-center text-h5 text-weight-bold">
            {{ convertToHoursMinutes(stats.totalAssignedHours) }}
          </div></q-card
        >
      </section>
      <section class="col">
        <q-card bordered flat class="q-pa-md full-height"
          ><div class="flex flex-center text-subtitle1 text-weight-regular">
            Total Hours Worked
          </div>
          <div class="flex flex-center text-h5 text-weight-bold">
            {{ convertToHoursMinutes(stats.totalHoursWorked) }}
          </div></q-card
        >
      </section>
      <section class="col">
        <q-card bordered flat class="q-pa-md full-height"
          ><div class="flex flex-center text-subtitle1 text-weight-regular">
            Total Overtime Hours
          </div>
          <div class="flex flex-center text-h5 text-weight-bold">
            {{ "830:15" }}
          </div></q-card
        >
      </section>
      <section class="col">
        <q-card bordered flat class="q-pa-md full-height"
          ><div class="flex flex-center text-subtitle1 text-weight-regular">
            Total Missing Hours
          </div>
          <div class="flex flex-center text-h5 text-weight-bold">
            {{ convertToHoursMinutes(stats.totalMissingHours) }}
          </div></q-card
        >
      </section>
    </div>
    <div class="row q-gutter-x-lg q-pt-md">
      <section class="col">
        <q-input outlined bg-color="white" color="teal-8" label="Employee Name" />
      </section>
      <section class="col">
        <q-select outlined bg-color="white" color="teal-8" label="Designation" />
      </section>
      <section class="col">
        <q-select outlined bg-color="white" color="teal-8" label="Department" />
      </section>
      <section class="col">
        <q-select
          type="date"
          outlined
          bg-color="white"
          color="teal-8"
          label="Select Period"
        />
      </section>
      <section class="col">
        <q-btn flat class="text-white bg-black fit" label="Search" />
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
      <q-markup-table class="q-mt-lg">
        <thead>
          <tr class="text-h6 text-weight-bol text-left text-white bg-grey-10">
            <th>#</th>
            <th>Name</th>
            <th>Job Title</th>
            <th>Department</th>
            <th>Assigned Hours</th>
            <th>Hours Worked</th>
            <th>Overtime Hours</th>
            <th>Missing Hours</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(el, index) in timesheetList"
            :key="index"
            :class="index % 2 === 0 ? 'bg-grey-2' : 'bg-white'"
          >
            <td>
              {{ (pagination.currentPage - 1) * pagination.rowsPerPage + index + 1 }}
            </td>
            <td>{{ el.givenName + " " + el.surname }}</td>
            <td>{{ el.designation }}</td>
            <td>{{ el.department }}</td>
            <td>{{ el.assignedHoursInMonth + " hours" }}</td>
            <td>{{ el.totalHours + " hours" }}</td>
            <td>{{ "10h" }}</td>
            <td>{{ el.missingHours + " hours" }}</td>
            <td>
              <q-btn dense round size="md" flat icon="las la-ellipsis-v">
                <q-popup-proxy>
                  <q-card>
                    <q-item class="flex items-center q-pr-xl" dense clickable
                      ><q-icon name="las la-pencil-alt" class="q-mr-sm" />Edit</q-item
                    >
                    <q-item class="flex items-center q-pr-xl" dense clickable
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
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted } from "vue";
import { AttendanceApi } from "src/api";
import { DocModel, AttendanceModel } from "src/models";
import { convertToHoursMinutes } from "src/utils/dateformat";

// session
const session = ref({ dbname: "attofund" });

// component-related
const timesheetBatch = ref([]);
const timesheetList = ref([]);
const addDialog = ref(false);
const deleteDialog = ref(false);
const editDialog = ref(false);

const stats = ref({
  totalAssignedHours: null,
  totalHoursWorked: null,
  totalMissingHours: null,
});
const pagination = ref({
  currentPage: 1,
  totalPage: 1,
  rowsPerPage: 10,
  batch: 5,
});
const startkeyIndex = ref(new Map());

// models
const dbURLModel = ref<DocModel.IDBURL>({});
const docURLModel = ref<DocModel.IDocURL>({});
const attendanceModel = ref<AttendanceModel.IAttendance>({});

export default {
  setup() {
    return {
      timesheetList,
      addDialog,
      editDialog,
      deleteDialog,
      stats,
      attendanceModel,
      pagination,
    };
  },
  methods: {
    callAddDialog() {
      addDialog.value = true;
      this.attendanceModel = {
        attendanceId: "",
        attendee: "",
        date: null,
        clockLog: [],
      };
    },
    callEditDialog(
      key: string,
      _id: string,
      _attendee: string,
      _date: string,
      _clockLog: AttendanceModel.IClockEvent[]
    ) {
      docURLModel.value.docid = key;
      this.attendanceModel = {
        attendanceId: _id,
        attendee: _attendee,
        date: _date,
        clockLog: _clockLog,
      };
      editDialog.value = true;
    },
    callDeleteDialog(
      key: string,
      _id: string,
      _attendee: string,
      _date: string,
      _clockLog: AttendanceModel.IClockEvent[]
    ) {
      docURLModel.value.docid = key;
      this.attendanceModel = {
        attendanceId: _id,
        attendee: _attendee,
        date: _date,
        clockLog: _clockLog,
      };
      deleteDialog.value = true;
    },
    dataToBatch(data: any) {
      timesheetBatch.value = [];
      data.forEach((el: any) => {
        timesheetBatch.value.push(el);
      });
    },
    batchToList(index: number) {
      const indexFrom = index;
      const indexTil =
        indexFrom + this.pagination.rowsPerPage > timesheetBatch.value.length
          ? timesheetBatch.value.length
          : indexFrom + this.pagination.rowsPerPage;
      timesheetList.value = [];
      for (let i = indexFrom; i < indexTil; i++) {
        timesheetList.value.push(timesheetBatch.value[i]);
      }
    },
    storeStartKey(page: number, startKey: string) {
      if (!startkeyIndex.value.has(page)) {
        startkeyIndex.value.set(page, startKey);
      }
    },
    async setUpPagination() {
      this.pagination.currentPage = 1;
      startkeyIndex.value.clear();
      this.dbURLModel = {
        dbname: session.value.dbname,
      };
      //
      const dataNewBatch = await this.getAllAttendanceByTimesheet();
      stats.value = {
        totalAssignedHours: dataNewBatch.body.title.totalAssignedHours,
        totalHoursWorked: dataNewBatch.body.title.totalHoursWorked,
        totalMissingHours: dataNewBatch.body.title.totalMissingHours,
      };
      this.pagination.totalPage = Math.ceil(
        dataNewBatch.body.rows.length / this.pagination.rowsPerPage
      );
      this.storeStartKey(
        Math.ceil(this.pagination.currentPage / this.pagination.batch),
        0
      );
      if (
        dataNewBatch.body.rows.length ===
        this.pagination.rowsPerPage * this.pagination.batch + 1
      ) {
        // add startkey for next batch, if exists
        this.storeStartKey(
          Math.ceil(this.pagination.currentPage / this.pagination.batch) + 1,
          dataNewBatch.body.rows.length - 1
        );
      }
      this.dataToBatch(dataNewBatch.body.rows); // put updated getPag response into batch
      this.batchToList(0);
    },
    async getAllAttendanceByTimesheet() {
      return await AttendanceApi.getAllEmployeeAttendanceByTimesheet(this.dbURLModel);
    },
    convertToHoursMinutes,
    async createAttendance() {
      await AttendanceApi.createEmployeeAttendance(
        dbURLModel.value,
        attendanceModel.value
      );
      this.setUpPagination();
    },
    async updateAttendance() {
      await AttendanceApi.updateEmployeeAttendance(
        docURLModel.value,
        attendanceModel.value
      );
      this.setUpPagination();
    },
    async removeAttendance() {
      await AttendanceApi.removeEmployeeAttendance(docURLModel.value);
      this.setUpPagination();
    },
  },
  watch: {
    "pagination.currentPage": async function (newVal: number, oldVal: number) {
      const movePage =
        Math.ceil(newVal / this.pagination.batch) -
        Math.ceil(oldVal / this.pagination.batch);
      const pageIndex =
        newVal % this.pagination.batch === 0
          ? (this.pagination.batch - 1) * this.pagination.rowsPerPage
          : ((newVal % this.pagination.batch) - 1) * this.pagination.rowsPerPage;
      if (movePage !== 0) {
        if (movePage > 0) {
          this.docPaginationModel.startkey = startkeyIndex.value.get(
            Math.ceil(oldVal / this.pagination.batch) + 1
          );
        } else {
          this.docPaginationModel.startkey = startkeyIndex.value.get(
            Math.ceil(oldVal / this.pagination.batch) - 1
          );
        }
        const dataNewBatch = await this.getAllAttendanceByTimesheet();
        this.pagination.totalPage = Math.ceil(
          dataNewBatch.body.total_rows / this.pagination.rowsPerPage
        );
        this.storeStartKey(
          Math.ceil(this.pagination.currentPage / this.pagination.batch),
          dataNewBatch.body.rows[0].id
        );
        if (
          dataNewBatch.body.rows.length ===
          this.pagination.rowsPerPage * this.pagination.batch + 1
        ) {
          this.storeStartKey(
            Math.ceil(this.pagination.currentPage / this.pagination.batch) + 1,
            dataNewBatch.body.rows[dataNewBatch.body.rows.length - 1].id
          );
        }
        this.dataToBatch(dataNewBatch.body.rows);
      }
      this.batchToList(pageIndex);
    },
    "pagination.rowsPerPage": async function () {
      this.setUpPagination();
    },
  },
  mounted() {
    this.setUpPagination();
    dbURLModel.value.dbname = session.value.dbname;
    docURLModel.value.dbname = session.value.dbname;
  },
};
</script>
