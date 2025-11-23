<template>
  <div>
    <h3 class="text-h5 text-weight-medium q-ma-none">Employee</h3>
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
          <q-breadcrumbs-el label="Employee" />
        </q-breadcrumbs>
      </div>

      <div class="q-gutter-x-sm">
        <q-btn
          outline
          dense
          class="bg-white"
          :class="mode === 'grid' ? 'text-teal-8' : 'text-black'"
          icon="las la-table"
          @click="mode = 'grid'"
        />
        <q-btn
          outline
          dense
          class="bg-white"
          :class="mode === 'list' ? 'text-teal-8' : 'text-black'"
          icon="las la-list"
          @click="mode = 'list'"
        />
        <q-btn
          no-caps
          rounded
          class="text-white bg-teal-8"
          icon="las la-user-plus"
          label="Add Employee"
          @click="callAddEmployee()"
        />
      </div>
    </div>
    <div class="row q-gutter-lg">
      <section class="col">
        <q-input
          color="teal"
          bg-color="white"
          outlined
          v-model="searchParams.id"
          label="Employee ID"
        />
      </section>
      <section class="col">
        <q-input
          color="teal"
          bg-color="white"
          outlined
          v-model="searchParams.name"
          label="Employee Name"
        />
      </section>
      <section class="col">
        <q-input
          color="teal"
          bg-color="white"
          outlined
          v-model="searchParams.contact"
          label="Employee Contact"
        />
      </section>
      <section class="col">
        <q-select
          color="teal"
          bg-color="white"
          outlined
          v-model="searchParams.designation"
          :options="designationList"
          label="Designation"
          emit-value
          map-options
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
          <span class="text-grey-9">
            · {{ stats.totalResults !== undefined ? stats.totalResults : 0 }} results
            found</span
          >
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

      <!-- Display employee in card view (grid) -->
      <div class="row justify-center q-mt-lg q-gutter-sm" v-if="mode === 'grid'">
        <q-intersection
          v-for="(el, index) in employeeList"
          :key="index"
          once
          transition="scale"
        >
          <q-card class="relative-position q-py-sm">
            <q-item flat bordered class="q-ma-sm">
              <q-item-section class="flex flex-center q-px-xl">
                <q-avatar class="bg-teal-8 text-uppercase" size="72px" text-color="white">
                  {{ el.value.givenName[0] }}
                </q-avatar>
              </q-item-section>
            </q-item>
            <q-item
              ><q-item-section>
                <div
                  class="row flex-center text-subtitle1 text-weight-medium text-grey-10"
                  caption
                  lines="1"
                >
                  {{ el.value.givenName + " " + el.value.surname }}
                </div>
                <q-item-label class="row flex-center" caption lines="1">{{
                  el.value.designation
                }}</q-item-label>
              </q-item-section></q-item
            >
            <q-btn
              dense
              round
              size="md"
              flat
              class="absolute-top-right"
              icon="las la-ellipsis-v"
              style="top: 2px"
            >
              <q-popup-proxy>
                <q-card>
                  <q-item
                    class="flex items-center q-pr-xl"
                    dense
                    clickable
                    @click="callViewEmployee(el.key)"
                    v-close-popup
                    ><q-icon name="las la-search" class="q-mr-sm" />View...</q-item
                  >
                  <q-item
                    class="flex items-center q-pr-xl"
                    dense
                    clickable
                    @click="
                      callDeleteDialog(el.key, el.value.givenName, el.value.surname)
                    "
                    v-close-popup
                    ><q-icon name="las la-trash-alt" class="q-mr-sm" />Delete</q-item
                  >
                </q-card>
              </q-popup-proxy>
            </q-btn>
          </q-card>
        </q-intersection>
      </div>
      <!-- Display employee in table view (list) -->
      <q-markup-table class="q-mt-lg" v-if="mode === 'list'">
        <thead>
          <tr class="text-h6 text-weight-bol text-left text-white bg-grey-10">
            <th>#</th>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Join Date</th>
            <th>Job Title</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(el, index) in employeeList"
            :key="index"
            :class="index % 2 === 0 ? 'bg-grey-2' : 'bg-white'"
          >
            <td>
              {{ (pagination.currentPage - 1) * pagination.rowsPerPage + index + 1 }}
            </td>
            <td>{{ el.value.givenName + " " + el.value.surname }}</td>
            <td>{{ el.value.employeeId }}</td>
            <td>{{ el.value.emailAddress }}</td>
            <td>{{ el.value.mobileNumber }}</td>
            <td>
              {{ getDateWithFormat(el.value.joinDate, "YYYY-MM-DD", "MMMM DD, YYYY") }}
            </td>
            <td>{{ el.value.designation }}</td>
            <td>{{ el.value.department }}</td>
            <td>
              <q-btn dense round size="md" flat icon="las la-ellipsis-v">
                <q-popup-proxy>
                  <q-card>
                    <q-item
                      class="flex items-center q-pr-xl"
                      dense
                      clickable
                      v-close-popup
                      @click="callViewEmployee(el.key)"
                      ><q-icon name="las la-search" class="q-mr-sm" />View...</q-item
                    >
                    <q-item
                      class="flex items-center q-pr-xl"
                      dense
                      clickable
                      v-close-popup
                      @click="
                        callDeleteDialog(el.key, el.value.givenName, el.value.surname)
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
          <h6 class="text-center q-ma-none">Delete Employee</h6>
          <div class="q-mx-lg q-mt-md">
            Are you sure you want to delete <br /><strong
              >'{{ employeeModel.givenName + " " + employeeModel.surname }}'</strong
            ><br />
            from the designation list?
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
            @click="removeEmployee()"
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
import { EmployeeApi, DesignationApi } from "src/api";
import { DocModel, EmployeeModel } from "src/models";
import { portalRouterStore } from "src/stores/store";
import { getDateWithFormat } from "src/utils/dateformat";

// session
const session = ref({ dbname: "attofund" });

// component-related
const mode = ref("list"); // list | grid
const employeeBatch = ref([]);
const employeeList = ref([]);
const designationList = ref([]);
const deleteDialog = ref(false);
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
  id: null,
  name: null,
  contact: null,
  designation: null,
});
const startkeyIndex = ref(new Map());

// models
const dbURLModel = <Doc.IDBURL>ref({});
const docURLModel = <DocModel.IDocURL>ref({});
const docPaginationModel = <DocModel.IDocPagination>ref({});

export default {
  setup() {
    return {
      mode,
      employeeList,
      designationList,
      deleteDialog,
      stats,
      searchParams,
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
    callDeleteDialog(key: string, _givenName: string, _surname: string) {
      docURLModel.value.docid = key;
      this.employeeModel = {
        givenName: _givenName,
        surname: _surname,
      };
      deleteDialog.value = true;
    },
    dataToBatch(data: any) {
      // this method is component specific
      employeeBatch.value = [];
      data.forEach((el) => {
        employeeBatch.value.push(el);
      });
    },
    dataToDesignationList(data: any) {
      // this method is component specific
      designationList.value = [
        {
          label: "All designations",
          value: null,
        },
      ];
      data.forEach((el) => {
        designationList.value.push({
          label: el.value.name,
          value: el.key,
        });
      });
    },
    batchToList: async function (index: number) {
      // this method is component specific
      const indexFrom = index;
      const indexTil =
        indexFrom + this.pagination.rowsPerPage > employeeBatch.value.length
          ? employeeBatch.value.length
          : indexFrom + this.pagination.rowsPerPage;
      employeeList.value = [];
      for (let i = indexFrom; i < indexTil; i++) {
        employeeList.value.push(employeeBatch.value.at(i));
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
          searchParams.value.id,
          searchParams.value.name,
          searchParams.value.contact,
          searchParams.value.designation,
        ]),
      };
      const dataNewBatch = await this.getPagEmployeeForTableRow();
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
    getPagEmployeeForTableRow: async function () {
      const res = await EmployeeApi.getPagEmployeeForTableRow(this.docPaginationModel);
      return res;
    },
    getAllDesignationByName: async function () {
      const res = await DesignationApi.getAllDesignationByName(dbURLModel.value);
      return res;
    },
    removeEmployee: async function () {
      const res = await EmployeeApi.removeEmployee(docURLModel.value);
      this.setUpPagination();
      return res;
    },
    getDateWithFormat,
    callAddEmployee() {
      this.tab.empTab = "editemployee";
    },
    callViewEmployee(_id: string) {
      this.tab.viewEmployeeId = _id;
      this.tab.empTab = "viewemployee";
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
    const dataDesignation = await this.getAllDesignationByName();
    this.dataToDesignationList(dataDesignation.body.rows);
  },
};
</script>
