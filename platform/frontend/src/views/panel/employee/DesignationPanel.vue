<template>
  <div>
    <h3 class="text-h5 text-weight-medium q-ma-none">Designation</h3>
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
          <q-breadcrumbs-el label="Designation" />
        </q-breadcrumbs>
      </div>

      <div class="q-gutter-x-sm">
        <q-btn
          no-caps
          rounded
          class="text-white bg-teal-8"
          icon="las la-plus"
          label="Add Designation"
          @click="callAddDialog()"
        />
      </div>
    </div>
    <div>
      <div class="q-pb-sm">
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
    </div>
    <div class="q-mt-md">
      <!--Designation Table-->
      <q-markup-table>
        <thead>
          <tr class="text-h6 text-weight-bol text-left text-white bg-grey-10">
            <th>#</th>
            <th>Designation</th>
            <th>Designation ID</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(el, index) in designationList"
            :key="index"
            :class="index % 2 === 0 ? 'bg-grey-2' : 'bg-white'"
          >
            <td>
              {{ (pagination.currentPage - 1) * pagination.rowsPerPage + index + 1 }}
            </td>
            <td>{{ el.value.name }}</td>
            <td>{{ el.value.designationId }}</td>
            <td class="text-capitalize">
              {{ organizationMap.get(el.value.department) }}
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
                        callEditDialog(
                          el.key,
                          el.value.designationId,
                          el.value.name,
                          el.value.department
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
                          el.value.designationId,
                          el.value.name,
                          el.value.department
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
          <h6 class="text-center q-ma-none">Delete Designation</h6>
          <div class="q-mx-lg q-mt-md">
            Are you sure you want to delete <br /><strong
              >'{{ designationModel.name }}'</strong
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
            @click="removeDesignation()"
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
          <h6 class="text-center q-ma-none">Add Designation</h6>
        </q-card-section>

        <q-card-section class="q-px-lg q-pt-none q-pb-sm">
          <div>
            <label>Department<span class="text-red">*</span></label>
            <q-select
              color="teal"
              class="text-capitalize"
              v-model="designationModel.department"
              :options="departmentList"
              dense
              outlined
              emit-value
              map-options
            />
          </div>
          <div class="q-mt-md">
            <label>Designation<span class="text-red">*</span></label>
            <q-input color="teal" v-model="designationModel.name" dense outlined />
          </div>
          <div class="q-mt-md">
            <label>Designation Id<span class="text-red">*</span></label>
            <q-input
              color="teal"
              v-model="designationModel.designationId"
              dense
              outlined
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
            @click="createDesignation()"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Edit Dialog -->
    <q-dialog v-model="editDialog" persistent>
      <div class="row">
        <q-card style="width: 460px; max-width: 80vw">
          <q-card-section class="text-center">
            <h6 class="text-center q-ma-none">Edit Designation</h6>
          </q-card-section>

          <q-card-section class="q-px-lg q-pt-none q-pb-sm">
            <div>
              <label>Department<span class="text-red">*</span></label>
              <q-select
                color="teal"
                class="text-capitalize"
                v-model="designationModel.department"
                :options="departmentList"
                dense
                outlined
                emit-value
                map-options
              />
            </div>
            <div class="q-mt-md">
              <label>Designation<span class="text-red">*</span></label>
              <q-input color="teal" v-model="designationModel.name" dense outlined />
            </div>
            <div class="q-mt-md">
              <label>Designation Id<span class="text-red">*</span></label>
              <q-input
                color="teal"
                input-class="text-grey-6"
                v-model="designationModel.designationId"
                dense
                outlined
                readonly
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
              v-close-popup
              @click="updateDesignation()"
            />
          </q-card-section>
        </q-card>
      </div>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted } from "vue";
import { underscoreToSpace } from "src/utils/textformat";
import { DesignationApi, OrganizationApi } from "src/api";
import { DocModel, EmployerModel } from "src/models";

// session
const session = ref({ dbname: "attofund" });

// component-related
const designationBatch = ref([]);
const designationList = ref([]);
const departmentList = ref([]);
const addDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const organizationMap = ref(new Map());
const stats = ref({
  totalResults: null,
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
const designationModel = <EmployerModel.IDesignation>ref({});

export default {
  setup() {
    return {
      designationList,
      departmentList,
      organizationMap,
      addDialog,
      editDialog,
      deleteDialog,
      designationModel,
      stats,
      pagination,
    };
  },
  methods: {
    callAddDialog() {
      addDialog.value = true;
      this.designationModel = {
        designationId: "",
        name: "",
        department: "",
      };
    },
    callEditDialog(key: string, _desId: string, _name: string, _org: any) {
      docURLModel.value.docid = key;
      this.designationModel = {
        designationId: _desId,
        name: _name,
        department: _org,
      };
      editDialog.value = true;
    },
    callDeleteDialog(key: string, _desId: string, _name: string, _org: any) {
      docURLModel.value.docid = key;
      this.designationModel = {
        designationId: _desId,
        name: _name,
        department: _org,
      };
      deleteDialog.value = true;
    },
    underscoreToSpace,
    dataToDesignationBatch(data: any) {
      // this method is component specific
      designationBatch.value = [];
      data.forEach((el) => {
        designationBatch.value.push(el);
      });
    },
    dataToDepartmentList(data: any) {
      // this method is component specific
      departmentList.value = [];
      data.forEach((el) => {
        departmentList.value.push({
          label: el.value.name,
          value: el.key,
        });
        organizationMap.value.set(el.id, el.value.name);
      });
    },
    batchToList(index: number) {
      // this method is component specific
      const indexFrom = index;
      const indexTil =
        indexFrom + this.pagination.rowsPerPage > designationBatch.value.length
          ? designationBatch.value.length
          : indexFrom + this.pagination.rowsPerPage;
      designationList.value = [];
      for (let i = indexFrom; i < indexTil; i++) {
        designationList.value.push(designationBatch.value.at(i));
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
        startkey: "",
        limit: this.pagination.rowsPerPage * this.pagination.batch + 1,
      };
      const dataNewBatch = await this.getPagDesignation();
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
      this.dataToDesignationBatch(dataNewBatch.body.rows); // put updated getPag response into batch
      this.batchToList(0);
    },
    getAllDepartment: async function () {
      const res = await OrganizationApi.getAllOrganization(dbURLModel.value);
      return res;
    },
    getPagDesignation: async function () {
      const res = await DesignationApi.getPagDesignation(this.docPaginationModel);
      return res;
    },
    createDesignation: async function () {
      const res = await DesignationApi.createDesignation(
        dbURLModel.value,
        designationModel.value
      );
      this.setUpPagination();
      return res;
    },
    updateDesignation: async function () {
      const res = await DesignationApi.updateDesignation(
        docURLModel.value,
        designationModel.value
      );
      this.setUpPagination();
      return res;
    },
    removeDesignation: async function () {
      const res = await DesignationApi.removeDesignation(docURLModel.value);
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
    /**
     * Get Department list for designation assign
     */
    dbURLModel.value.dbname = session.value.dbname;
    docURLModel.value.dbname = session.value.dbname;
    const res = await this.getAllDepartment();
    this.dataToDepartmentList(res.body.rows);
  },
};
</script>
