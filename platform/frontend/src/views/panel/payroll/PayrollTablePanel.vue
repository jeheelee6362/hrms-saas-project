<template>
  <div>
    <h3 class="text-h5 text-weight-medium q-ma-none">Payroll Table</h3>
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
          <q-breadcrumbs-el label="Payroll Table" />
        </q-breadcrumbs>
      </div>
      <div class="q-gutter-x-sm">
        <q-btn
          no-caps
          rounded
          class="text-white bg-teal-8"
          icon="las la-plus"
          label="Assign Item"
        />
      </div>
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
      <q-markup-table class="q-mt-lg" separator="vertical">
        <thead>
          <tr
            class="text-h6 text-weight-bol text-center text-white text-uppercase bg-grey-10"
            separator="vertical"
          >
            <th colspan="3">Employee Details</th>
            <th colspan="6">Base Salary</th>
            <th colspan="2">Add: Other Earnings</th>
            <!-- colspan should be algined with custom earnings items-->
            <th colspan="2">Less: Contributions</th>
            <th colspan="1">Less: Other Deductions</th>
            <!-- colspan should be algined with custom deductions items-->
            <th>Net Pay</th>
            <th>Action</th>
          </tr>
          <tr class="text-h6 text-weight-bol text-left text-white bg-grey-10">
            <!---->
            <th>Name</th>
            <th style="border-left: 0 !important">Job Title</th>
            <th style="border-left: 0 !important">Department</th>
            <!---->
            <th>Assigned Hours</th>
            <th style="border-left: 0 !important">Hours Worked</th>
            <th style="border-left: 0 !important">Overtime Hours</th>
            <th style="border-left: 0 !important">Pay Rate</th>
            <th style="border-left: 0 !important">Overtime Rate</th>
            <th style="border-left: 0 !important">Gross Pay</th>
            <!---->
            <th>Leave Pay</th>
            <th style="border-left: 0 !important">Bonus</th>
            <!---->
            <th>MPF</th>
            <th style="border-left: 0 !important">Voluntary</th>
            <!---->
            <th>Absent Amount</th>
            <!---->
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="index in 10"
            :key="index"
            :class="index % 2 === 0 ? 'bg-grey-2' : 'bg-white'"
          >
            <td>{{ "Jehee Lee" }}</td>
            <td>{{ "Project Manager" }}</td>
            <td>{{ "Executive" }}</td>
            <!---->
            <td>{{ "160" }} HRS</td>
            <td>{{ "140" }} HRS</td>
            <td>{{ "10" }} HRS</td>
            <td>${{ "100" }}/{{ "hr" }}</td>
            <td>{{ "1" }}x</td>
            <td>${{ "15,000" }}</td>
            <!---->
            <td>${{ "1000" }}</td>
            <td>${{ "0" }}</td>
            <!---->
            <td>${{ "800" }}</td>
            <td>${{ "0" }}</td>
            <!---->
            <td>${{ "0" }}</td>
            <!---->
            <td>
              <strong>${{ "15,200" }}</strong>
            </td>
            <!---->
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

export default {
  setup() {
    return {};
  },
  methods: {},
};
</script>
