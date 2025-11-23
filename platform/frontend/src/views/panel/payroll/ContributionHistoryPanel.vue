<template>
  <div>
    <h3 class="text-h5 text-weight-medium q-ma-none">Contribution History</h3>
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
          <q-breadcrumbs-el
            @click="callProvidentFund"
            class="hover-underline"
            label="Provident Fund"
          />
          <q-breadcrumbs-el label="Contribution History" />
        </q-breadcrumbs>
      </div>
    </div>
    <div class="row q-gutter-lg q-pt-md items-end">
      <section class="col">
        <q-card bordered flat class="relative-position q-py-sm">
          <q-item flat bordered>
            <q-item-section class="flex flex-center q-px-xl">
              <q-avatar class="bg-teal-8" size="72px" text-color="white">
                {{ "J" }}
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
                {{ "Jehee" + " " + "Lee" }}
              </div>
              <q-item-label class="row flex-center" caption lines="1">{{
                "Project Manager"
              }}</q-item-label>
            </q-item-section></q-item
          >
        </q-card>
      </section>
      <section class="col">
        <q-card bordered flat class="q-pa-md"
          ><div class="flex flex-center text-subtitle1 text-weight-regular">Since</div>
          <div class="flex flex-center text-h5 text-weight-bold">
            {{ "AUG 2024" }}
          </div></q-card
        >
      </section>
      <section class="col">
        <q-card bordered flat class="q-pa-md"
          ><div class="flex flex-center text-subtitle1 text-weight-regular">
            Account Balance
          </div>
          <div class="flex flex-center text-h5 text-weight-bold">
            <span class="text-caption text-weight-medium text-grey-9 q-mr-xs">HK$</span
            >{{ "34,500" }}
          </div></q-card
        >
      </section>
      <section class="col">
        <q-card bordered flat class="q-pa-md"
          ><div class="flex flex-center text-subtitle1 text-weight-regular">
            Contributions
          </div>
          <div class="flex flex-center text-h5 text-weight-bold">
            {{ "12" }}
          </div></q-card
        >
      </section>
    </div>
    <div class="row q-gutter-x-lg q-pt-md">
      <section class="col">
        <q-select dense outlined bg-color="white" color="teal-8" label="Scheme Type" />
      </section>
      <section class="col">
        <q-select dense outlined bg-color="white" color="teal-8" label="Scheme Policy" />
      </section>
      <section class="col">
        <q-select dense outlined bg-color="white" color="teal-8" label="Trustee" />
      </section>
      <section class="col">
        <q-input
          type="date"
          dense
          outlined
          bg-color="white"
          color="teal-8"
          label="From"
        />
      </section>
      <section class="col">
        <q-input type="date" dense outlined bg-color="white" color="teal-8" label="To" />
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
            <th>#</th>
            <th>Scheme Type</th>
            <th>Trustee</th>
            <th>Scheme Policy</th>
            <th>Period</th>
            <th>Contribution (ER)</th>
            <th>Contribution (EE)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="index in 10"
            :key="index"
            :class="index % 2 === 0 ? 'bg-grey-2' : 'bg-white'"
          >
            <td>{{ index }}</td>
            <td>{{ "MPF" }}</td>
            <td>{{ "Manulife" }}</td>
            <td>{{ "Sun Life Rainbow MPF Scheme" }}</td>
            <td>{{ "Aug 10, 2025" }}</td>
            <td>HK${{ "500" }}</td>
            <td>HK${{ "500" }}</td>
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
    callProvidentFund() {
      this.tab.payTab = "pf";
    },
  },
};
</script>
