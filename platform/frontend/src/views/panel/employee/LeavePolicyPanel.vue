<template>
  <div class="q-pb-xl">
    <h3 class="text-h5 text-weight-medium q-ma-none">Leave Policy</h3>
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
          <q-breadcrumbs-el label="Leave Policy" />
        </q-breadcrumbs>
      </div>

      <div class="q-gutter-x-sm">
        <q-btn
          no-caps
          rounded
          class="text-white bg-teal-8"
          icon="las la-plus"
          label="Add Custom Policy"
          @click="callEditLeavePolicy"
        />
      </div>
    </div>
    <div class="q-mt-xl q-gutter-y-sm">
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
          <tr class="text-body1 text-weight-bold text-left text-white bg-grey-10">
            <th>#</th>
            <th>Policy ID</th>
            <th>Policy Name</th>
            <th>Leave Pay</th>
            <th>Entitlement</th>
            <th>Unit</th>
            <th>Unused Leave</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(el, index) in leavePolicyList"
            :key="index"
            :class="index % 2 === 0 ? 'bg-grey-2' : 'bg-white'"
          >
            <td>
              {{ (pagination.currentPage - 1) * pagination.rowsPerPage + index + 1 }}
            </td>
            <td>{{ el.value.policyId }}</td>
            <td>{{ el.value.name }}</td>
            <td>{{ el.value.isPaid ? "Paid" : "Unpaid" }}</td>
            <td>{{ el.value.isAuto ? "Auto" : "Granted" }}</td>
            <td>{{ el.value.unit }}</td>
            <td>
              {{
                el.value.defineForward && el.value.defineEncash
                  ? "Carry forward & Encashed"
                  : el.value.defineForward
                  ? "Carry forward"
                  : el.value.defineEncash
                  ? "Encashed"
                  : "Reset"
              }}
            </td>
            <td>
              <q-toggle color="teal-8" />
            </td>
            <td>
              <q-btn dense round size="md" flat icon="las la-ellipsis-v">
                <q-popup-proxy>
                  <q-card>
                    <q-item
                      class="flex items-center q-pr-xl"
                      dense
                      clickable
                      @click="callEditLeavePolicy"
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
import { portalRouterStore } from "src/stores/store";
import { LeaveApi } from "src/api";
import { DocModel, LeaveModel } from "src/models";

// session
const session = ref({ dbname: "attofund" });

// component-related
const leavePolicyBatch = ref([]);
const leavePolicyList = ref([]);
const deleteDialog = ref(false);

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

export default {
  setup() {
    return {
      leavePolicyList,
      deleteDialog,
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
    callDeleteDialog(key: string) {
      docURLModel.value.docid = key;
      deleteDialog.value = true;
    },
    dataToBatch(data: any) {
      leavePolicyBatch.value = [];
      data.forEach((el) => {
        leavePolicyBatch.value.push(el);
      });
    },
    batchToList(index: number) {
      // this method is component specific
      const indexFrom = index;
      const indexTil =
        indexFrom + this.pagination.rowsPerPage > leavePolicyBatch.value.length
          ? leavePolicyBatch.value.length
          : indexFrom + this.pagination.rowsPerPage;
      leavePolicyList.value = [];
      for (let i = indexFrom; i < indexTil; i++) {
        leavePolicyList.value.push(leavePolicyBatch.value.at(i));
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
      const dataNewBatch = await this.getPagLeavePolicy();
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
    getPagLeavePolicy: async function () {
      const res = await LeaveApi.getPagLeavePolicy(this.docPaginationModel);
      console.log(res);
      return res;
    },
    removeLeavePolicy: async function () {
      const res = await LeaveApi.removeLeavePolicy(docURLModel.value);
      this.setUpPagination();
      return res;
    },
    callLeaves() {
      this.tab.empTab = "leaves";
    },
    callEditLeavePolicy() {
      this.tab.empTab = "editleavepolicy";
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
        const dataNewBatch = await this.getPagLeavePolicy();
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
    docURLModel.value.dbname = session.value.dbname;
  },
};
</script>
