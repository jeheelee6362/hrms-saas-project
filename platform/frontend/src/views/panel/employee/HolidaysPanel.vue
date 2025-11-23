<template>
  <div>
    <h3 class="text-h5 text-weight-medium q-ma-none">Holidays</h3>
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
          <q-breadcrumbs-el label="Holidays" />
        </q-breadcrumbs>
      </div>
      <div class="q-gutter-x-sm">
        <q-btn
          no-caps
          rounded
          class="text-white bg-teal-8"
          icon="las la-plus"
          label="Add Holiday"
          @click="callAddDialog()"
        />
      </div>
    </div>
    <div>
      <div class="row q-gutter-lg">
        <section class="col">
          <q-input
            v-model="searchParams.name"
            color="teal"
            bg-color="white"
            outlined
            label="Holiday Name"
          />
        </section>
        <section class="col">
          <q-select
            v-model="searchParams.type"
            :options="holidayTypeOptions"
            color="teal"
            bg-color="white"
            outlined
            label="Select Type"
            emit-value
            map-options
          />
        </section>
        <section class="col">
          <q-input
            v-model="searchParams.dateFrom"
            color="teal"
            bg-color="white"
            type="date"
            outlined
            label="From"
          />
        </section>
        <section class="col">
          <q-input
            v-model="searchParams.dateTo"
            color="teal"
            bg-color="white"
            type="date"
            outlined
            label="To"
          />
        </section>
        <section class="col">
          <q-btn
            dense
            class="fit text-body1 text-white bg-black text-weight-medium"
            label="search"
            @click="setUpPagination"
          />
        </section>
      </div>
      <div class="q-mt-md">
        <label class="text-body2 q-mt-sm">
          <span>Show </span>
          <select v-model="pagination.rowsPerPage">
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span> entries</span
          ><span class="text-grey-9"> · {{ stats.totalResults }} results found</span>
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
            <th>Title</th>
            <th>Holiday ID</th>
            <th>Holiday Date</th>
            <th>Weekday</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(el, index) in holidayList"
            :key="index"
            :class="index % 2 === 0 ? 'bg-grey-2' : 'bg-white'"
          >
            <td>
              {{ (pagination.currentPage - 1) * pagination.rowsPerPage + index + 1 }}
            </td>
            <td>{{ el.value.name }}</td>
            <td>{{ el.value.holidayId }}</td>
            <td>{{ el.value.date }}</td>
            <td>{{ getDateWithFormat(el.value.date, "YYYY-MM-DD", "dddd") }}</td>
            <td>{{ el.value.holidayType }}</td>
            <td>
              <q-btn
                dense
                round
                size="md"
                flat
                icon="las la-ellipsis-v"
                :disable="el.value.holidayType === 'Public' ? true : false"
                :text-color="el.value.holidayType === 'Public' ? 'grey-6' : 'grey-10'"
              >
                <q-popup-proxy>
                  <q-card>
                    <q-item
                      class="flex items-center q-pr-xl"
                      dense
                      clickable
                      v-close-popup
                      @click="
                        callEditDialog(
                          el.key,
                          el.value.holidayId,
                          el.value.name,
                          el.value.date
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
                        callDeleteDialog(
                          el.key,
                          el.value.holidayId,
                          el.value.name,
                          el.value.date
                        )
                      "
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

    <!-- Delete Dialog -->
    <q-dialog v-model="deleteDialog" persistent>
      <q-card>
        <q-card-section class="text-center">
          <h6 class="text-center q-ma-none">Delete Holiday</h6>
          <div class="q-mx-lg q-mt-md">
            Are you sure you want to delete <br /><strong
              >'{{ holidayModel.name }}'</strong
            ><br />
            as company holiday?
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
            @click="removeHoliday()"
            v-close-popup
            >YES</q-item
          >
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Add Dialog -->
    <q-dialog v-model="addDialog" persistent>
      <q-card style="width: 460px; max-width: 80vw">
        <q-card-section class="text-center">
          <h6 class="text-center q-ma-none">Add Holiday</h6>
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-none q-pb-sm">
          <div>
            <label>Date of Holiday<span class="text-red">*</span></label>
            <q-input type="date" v-model="holidayModel.date" dense outlined />
          </div>
          <div class="q-mt-md">
            <label>Display Name<span class="text-red">*</span></label>
            <q-input v-model="holidayModel.name" dense outlined />
          </div>
          <div class="q-mt-md">
            <label>Holiday Id<span class="text-red">*</span></label>
            <q-input v-model="holidayModel.holidayId" dense outlined />
          </div>
        </q-card-section>
        <q-card-section class="row justify-end">
          <q-btn no-caps flat class="" label="Cancel" v-close-popup />
          <q-btn
            @click="createHoliday()"
            no-caps
            flat
            class="text-white bg-teal-8 q-px-lg q-py-xs"
            label="Save"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Edit Dialog -->
    <q-dialog v-model="editDialog" persistent>
      <q-card style="width: 460px; max-width: 80vw">
        <q-card-section class="text-center">
          <h6 class="text-center q-ma-none">Edit Holiday</h6>
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-none q-pb-sm">
          <div>
            <label>Date of Holiday<span class="text-red">*</span></label>
            <q-input type="date" v-model="holidayModel.date" dense outlined />
          </div>
          <div class="q-mt-md">
            <label>Display Name<span class="text-red">*</span></label>
            <q-input v-model="holidayModel.name" dense outlined />
          </div>
          <div class="q-mt-md">
            <label>Holiday Id<span class="text-red">*</span></label>
            <q-input
              input-class="text-grey-6"
              v-model="holidayModel.holidayId"
              dense
              outlined
              readonly
            />
          </div>
        </q-card-section>
        <q-card-section class="row justify-end">
          <q-btn no-caps flat class="" label="Cancel" v-close-popup />
          <q-btn
            @click="updateHoliday()"
            no-caps
            flat
            class="text-white bg-teal-8 q-px-lg q-py-xs"
            label="Save"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted } from "vue";
import { HolidayApi } from "src/api";
import { DocModel, EmployerModel } from "src/models";
import { portalRouterStore } from "src/stores/store";
import { getDateWithFormat } from "src/utils/dateformat";

// session
const session = ref({ dbname: "attofund" });

// component-related
const holidayBatch = ref([]);
const holidayList = ref([]);
const addDialog = ref(false);
const deleteDialog = ref(false);
const editDialog = ref(false);
const stats = ref({
  totalResults: null,
});

const pagination = ref({
  currentPage: 1,
  totalPage: 1,
  rowsPerPage: 10,
  batch: 5,
});
const searchParams = ref({
  name: null,
  type: "all",
  dateFrom: null,
  dateTo: null,
});
const holidayTypeOptions = ref([
  {
    label: "All holidays",
    value: "all",
  },
  {
    label: "Public holidays",
    value: "public",
  },
  {
    label: "Custom",
    value: "custom",
  },
]);
const startkeyIndex = ref(new Map());

// models
const dbURLModel = <DocModel.IDBURL>ref({});
const docURLModel = <DocModel.IDocURL>ref({});
const docPaginationModel = <DocModel.IDocPagination>ref({});
const holidayModel = <EmployerModel.IHoliday>ref({});

export default {
  setup() {
    return {
      holidayList,
      searchParams,
      holidayTypeOptions,
      stats,
      addDialog,
      editDialog,
      deleteDialog,
      holidayModel,
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
      this.holidayModel = {
        name: "",
        holidayId: "",
        date: null,
      };
    },
    callEditDialog(key: string, _id: string, _name: string, _date: string) {
      docURLModel.value.docid = key;
      this.holidayModel = {
        name: _name,
        holidayId: _id,
        date: _date,
      };
      editDialog.value = true;
    },
    callDeleteDialog(key: string, _id: string, _name: string, _date: string) {
      docURLModel.value.docid = key;
      this.holidayModel = {
        name: _name,
        holidayId: _id,
        date: _date,
      };
      deleteDialog.value = true;
    },
    dataToBatch(data: any) {
      // this method is component specific
      holidayBatch.value = [];
      data.forEach((el) => {
        holidayBatch.value.push(el);
      });
    },
    batchToList(index: number) {
      // this method is component specific
      const indexFrom = index;
      const indexTil =
        indexFrom + this.pagination.rowsPerPage > holidayBatch.value.length
          ? holidayBatch.value.length
          : indexFrom + this.pagination.rowsPerPage;
      holidayList.value = [];
      for (let i = indexFrom; i < indexTil; i++) {
        holidayList.value.push(holidayBatch.value.at(i));
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
          searchParams.value.name,
          searchParams.value.type,
          searchParams.value.dateFrom,
        ]),
        endkey: JSON.stringify([
          searchParams.value.name,
          searchParams.value.type,
          searchParams.value.dateTo,
        ]),
      };
      const dataNewBatch = await this.getPagHoliday();
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
    getDateWithFormat,
    getPagHoliday: async function () {
      const res = await HolidayApi.getPagHoliday(this.docPaginationModel);
      return res;
    },
    createHoliday: async function () {
      const res = await HolidayApi.createHoliday(dbURLModel.value, holidayModel.value);
      this.setUpPagination();
      return res;
    },
    updateHoliday: async function () {
      const res = await HolidayApi.updateHoliday(docURLModel.value, holidayModel.value);
      this.setUpPagination();
      return res;
    },
    removeHoliday: async function () {
      const res = await HolidayApi.removeHoliday(docURLModel.value);
      this.setUpPagination();
      return res;
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
        const dataNewBatch = await this.getPagDesignation();
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
        this.dataToDesignationBatch(dataNewBatch.body.rows); // put updated getPag response into batch
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
  },
};
</script>
