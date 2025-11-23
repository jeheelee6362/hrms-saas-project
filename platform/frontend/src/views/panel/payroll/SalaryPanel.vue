<template>
  <div>
    <h3 class="text-h5 text-weight-medium q-ma-none">Employee Salary</h3>
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
          <q-breadcrumbs-el label="Salary" />
        </q-breadcrumbs>
      </div>
      <div class="q-gutter-x-sm">
        <q-btn
          no-caps
          rounded
          class="text-white bg-teal-8"
          icon="las la-plus"
          label="Add Salary"
        />
      </div>
    </div>
    <div class="row q-gutter-x-lg q-pt-md">
      <section class="col">
        <q-input outlined bg-color="white" color="teal-8" label="Employee Name" />
      </section>
      <section class="col">
        <q-select outlined bg-color="white" color="teal-8" label="Payment Method" />
      </section>
      <section class="col">
        <q-select outlined bg-color="white" color="teal-8" label="Payment Status" />
      </section>
      <section class="col">
        <q-select outlined bg-color="white" color="teal-8" label="Select Period" />
      </section>
      <section class="col">
        <q-btn flat class="text-white bg-black fit" label="Search" />
      </section>
    </div>
    <div class="q-mt-md">
      <div>
        <label class="text-body2 q-mt-sm">
          <span>Show </span>
          <select @change="fetchNew()" v-model="entry_limit">
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
      <!-- Salary Table -->
      <q-markup-table class="q-mt-lg">
        <thead>
          <tr class="text-h6 text-weight-bol text-left text-white bg-grey-10">
            <th>Name</th>
            <th>Employee ID</th>
            <th>Job Title</th>
            <th>Salary</th>
            <th>Pay day</th>
            <th>Method</th>
            <th>Status</th>
            <th>Payslip</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="index in 10"
            :key="index"
            :class="index % 2 === 0 ? 'bg-grey-2' : 'bg-white'"
          >
            <td>{{ "Jehee Lee" }}</td>
            <td>{{ "56167519" }}</td>
            <td>{{ "Project Manager" }}</td>
            <td>{{ "HK$" + "40000" }}</td>
            <td>{{ "Aug 30, 2024" }}</td>
            <td>{{ "Cheque" }}</td>
            <td>{{ "Paid" }}</td>
            <td>
              <q-btn
                flat
                no-caps
                @click="callPayslip"
                class="text-white bg-teal-8"
                label="Generate Slip"
              />
            </td>
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
          v-model="current"
          color="black"
          max="12"
          max-pages="6"
          boundary-numbers="false"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { portalRouterStore } from "src/stores/store";

export default {
  setup() {
    return {};
  },
  data() {
    const tab = ref(portalRouterStore());
    return {
      tab,
    };
  },
  methods: {
    callPayslip() {
      this.tab.payTab = "payslip";
    },
  },
};
</script>
