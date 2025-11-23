<template>
  <div>
    <h3 class="text-h5 text-weight-medium q-ma-none">Attendance</h3>
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
          <q-breadcrumbs-el label="Attendance" />
        </q-breadcrumbs>
      </div>
      <div class="q-gutter-x-sm">
        <q-btn
          no-caps
          rounded
          class="text-white bg-teal-8"
          icon="las la-plus"
          label="Add Attendance"
          @click="callAddDialog"
        />
      </div>
    </div>
    <div class="row q-gutter-x-lg q-pt-md">
      <section class="col">
        <q-input outlined bg-color="white" color="teal-8" label="Employee Name" />
      </section>
      <section class="col">
        <q-input type="date" outlined bg-color="white" color="teal-8" label="From" />
      </section>
      <section class="col">
        <q-input type="date" outlined bg-color="white" color="teal-8" label="To" />
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
            <th v-for="date in dates" :key="date">
              {{ getDateWithFormat(date, "YYYY-MM-DD", "MMM DD (ddd)") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(el, index) in attendanceList"
            :key="index"
            :class="index % 2 === 0 ? 'bg-grey-2' : 'bg-white'"
          >
            <td>
              {{ (pagination.currentPage - 1) * pagination.rowsPerPage + index + 1 }}
            </td>
            <td>{{ el.attendee }}</td>
            <td v-for="date in dates" :key="date" class="text-center">
              <q-icon
                v-if="attendanceMap.get(el.attendee + date)"
                color="teal"
                name="las la-check"
              />
              <q-icon v-else color="red" name="las la-times" />
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
    <q-dialog v-model="addDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="text-center">
          <h6 class="text-center q-ma-none">Add Attendance</h6>
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-none q-pb-sm">
          <label>Employee<span class="text-red">*</span></label>
          <q-input v-model="attendanceModel.attendee" color="teal" dense outlined />
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-none q-pb-sm">
          <label>Date<span class="text-red">*</span></label>
          <q-input
            type="date"
            v-model="attendanceModel.date"
            color="teal"
            dense
            outlined
          />
        </q-card-section>
        <q-card-section class="q-px-lg q-py-sm">
          <label class="text-body2 text-weight-regular">Clock In-Out</label>
          <div :class="attendanceModel.clockLog.length !== 0 ? 'bg-grey-3 q-pa-md' : ''">
            <div
              v-for="(clockEl, clockIndex) in attendanceModel.clockLog"
              :key="clockIndex"
              :class="
                clockIndex !== attendanceModel.clockLog.length - 1
                  ? 'row items-center q-gutter-x-md q-pb-xs'
                  : 'row items-center q-gutter-x-md q-mb-none'
              "
            >
              <section class="col">
                <q-input
                  type="time"
                  v-model="clockEl.clockIn"
                  color="teal"
                  bg-color="white"
                  dense
                  outlined
                  label="Clock in"
                />
              </section>
              <section class="col">
                <q-input
                  type="time"
                  v-model="clockEl.clockOut"
                  color="teal"
                  bg-color="white"
                  dense
                  outlined
                  label="Clock out"
                />
              </section>
              <section>
                <q-btn
                  dense
                  class="text-grey-8 bg-grey-3 q-pa-sm"
                  style="border: 1px solid #cfd8dc"
                  icon="las la-trash-alt"
                  @click="attendanceModel.clockLog.splice(clockIndex, 1)"
                />
              </section>
            </div>
          </div>
          <q-btn
            flat
            no-caps
            class="text-grey-9 bg-grey-3 q-mt-sm"
            style="border: 1px solid #cfd8dc"
            label="Add Clock In-Out"
            @click="attendanceModel.clockLog.push({ clockIn: '', clockOut: '' })"
          />
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-none q-pb-sm">
          <label>Attendance Id<span class="text-red">*</span></label>
          <q-input v-model="attendanceModel.attendanceId" color="teal" dense outlined />
        </q-card-section>
        <q-card-section class="row justify-end">
          <q-btn no-caps flat label="Cancel" v-close-popup />
          <q-btn
            no-caps
            flat
            class="text-white bg-teal-8 q-px-lg q-py-xs"
            label="Save"
            @click="createAttendance"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted } from "vue";
import { AttendanceApi } from "src/api";
import { DocModel, AttendanceModel } from "src/models";
import { getDateWithFormat } from "src/utils/dateformat";

// session
const session = ref({ dbname: "attofund" });

// component-related
const attendanceBatch = ref([]);
const attendanceList = ref([]);
const attendanceMap = ref(new Map());
const addDialog = ref(false);
const deleteDialog = ref(false);
const editDialog = ref(false);

const pagination = ref({
  currentPage: 1,
  totalPage: 1,
  rowsPerPage: 10,
  batch: 5,
});
const startkeyIndex = ref(new Map());
const dates = ref();

// models
const dbURLModel = ref<DocModel.IDBURL>({});
const docURLModel = ref<DocModel.IDocURL>({});
const attendanceModel = ref<AttendanceModel.IAttendance>({});

export default {
  setup() {
    return {
      attendanceList,
      attendanceMap,
      addDialog,
      editDialog,
      deleteDialog,
      attendanceModel,
      pagination,
      dates,
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
      attendanceBatch.value = [];
      data.forEach((el: any) => {
        attendanceBatch.value.push(el);
      });
    },
    batchToList(index: number) {
      const indexFrom = index;
      const indexTil =
        indexFrom + this.pagination.rowsPerPage > attendanceBatch.value.length
          ? attendanceBatch.value.length
          : indexFrom + this.pagination.rowsPerPage;
      attendanceList.value = [];
      attendanceMap.value.clear();
      for (let i = indexFrom; i < indexTil; i++) {
        attendanceList.value.push(attendanceBatch.value[i]);
        attendanceBatch.value[i].attendance.forEach((el) => {
          attendanceMap.value.set(attendanceBatch.value[i].attendee + el.date, el.status);
        });
      }
    },
    storeStartKey(page: number, startkey: string) {
      if (!startkeyIndex.value.has(page)) {
        startkeyIndex.value.set(page, startkey);
      }
    },
    async setUpPagination() {
      this.pagination.currentPage = 1;
      startkeyIndex.value.clear();
      this.dbURLModel = {
        dbname: session.value.dbname,
      };
      const dataNewBatch = await this.getAllAttendance();
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
        this.storeStartKey(
          Math.ceil(this.pagination.currentPage / this.pagination.batch) + 1,
          dataNewBatch.body.rows.length - 1
        );
      }
      this.dataToBatch(dataNewBatch.body.rows);
      this.batchToList(0);
    },
    generateDateRange(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const dateArray = [];
      let currentDate = start;
      while (currentDate <= end) {
        dateArray.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dateArray;
    },
    getDateWithFormat,
    async getAllAttendance() {
      return await AttendanceApi.getAllEmployeeAttendance(this.dbURLModel);
    },
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
        const dataNewBatch = await this.getAllAttendance();
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
    dates.value = this.generateDateRange("2024-08-01", "2024-08-31");
    this.setUpPagination();
    dbURLModel.value.dbname = session.value.dbname;
    docURLModel.value.dbname = session.value.dbname;
  },
};
</script>
