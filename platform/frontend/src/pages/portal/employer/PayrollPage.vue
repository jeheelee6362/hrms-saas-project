<template>
  <q-page class="flex">
    <q-splitter v-model="splitterModel" unit="px" class="full-width" :limits="[200, 200]">
      <template v-slot:before>
        <q-tabs
          v-model="tab.payTab"
          vertical
          dense
          class="fixed width-full bg-white"
          indicator-color="transparent"
          active-class="text-black bg-grey-3"
        >
          <div class="q-pa-md">
            <span class="text-label text-grey text-weight-medium">Payroll</span>
          </div>
          <q-tab no-caps name="payrolltable" style="justify-content: initial"
            ><span class="q-pl-sm text-body2 text-weight-medium"
              >Payroll Table</span
            ></q-tab
          >
          <q-tab no-caps name="PayrollComponents" style="justify-content: initial"
            ><span class="q-pl-sm text-body2 text-weight-medium"
              >Payroll Components</span
            ></q-tab
          >
          <q-tab
            :class="
              tab.payTab === 'salary' || tab.payTab === 'payslip'
                ? 'text-black bg-grey-3'
                : ''
            "
            no-caps
            name="salary"
            style="justify-content: initial"
            ><span class="q-pl-sm text-body2 text-weight-medium"
              >Employee Salary</span
            ></q-tab
          >
          <q-tab
            :class="
              tab.payTab === 'pf' || tab.payTab === 'history'
                ? 'text-black bg-grey-3'
                : ''
            "
            no-caps
            name="pf"
            style="justify-content: initial"
            ><span class="q-pl-sm text-body2 text-weight-medium"
              >Provident Fund</span
            ></q-tab
          >
          <q-tab
            :class="
              tab.payTab === 'ondemand' ||
              tab.payTab === 'accesshistory' ||
              tab.payTab === 'accesspolicy'
                ? 'text-black bg-grey-3'
                : ''
            "
            no-caps
            name="ondemand"
            style="justify-content: initial"
            ><span class="q-pl-sm text-body2 text-weight-medium"
              >On Demand Pay</span
            ></q-tab
          >
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab.payTab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
          class="row fit bg-blue-grey-1"
        >
          <q-tab-panel name="salary" class="q-pt-lg q-px-lg"><SalaryPanel /></q-tab-panel>
          <q-tab-panel name="payrolltable" class="q-pt-lg q-px-lg"
            ><PayrollTablePanel
          /></q-tab-panel>
          <q-tab-panel name="PayrollComponents" class="q-pt-lg q-px-lg"
            ><PayrollComponentsPanel
          /></q-tab-panel>
          <q-tab-panel name="payslip" class="q-pt-lg q-px-lg"
            ><PayslipPanel
          /></q-tab-panel>
          <q-tab-panel name="pf" class="q-pt-lg q-px-lg">
            <ProvidentFundPanel />
          </q-tab-panel>
          <q-tab-panel name="history" class="q-pt-lg q-px-lg">
            <ContributionHistoryPanel />
          </q-tab-panel>
          <q-tab-panel name="ondemand" class="q-pt-lg q-px-lg">
            <OnDemandPayPanel />
          </q-tab-panel>
          <q-tab-panel name="accesshistory" class="q-pt-lg q-px-lg">
            <AccessHistoryPanel />
          </q-tab-panel>
          <q-tab-panel name="accesspolicy" class="q-pt-lg q-px-lg">
            <AccessPolicyPanel />
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useMeta } from "quasar";
import { portalRouterStore } from "src/stores/store";
import {
  ProvidentFundPanel,
  AccessHistoryPanel,
  ContributionHistoryPanel,
  OnDemandPayPanel,
  SalaryPanel,
  PayrollTablePanel,
  PayrollComponentsPanel,
  PayslipPanel,
  AccessPolicyPanel,
} from "src/views";

const metaData = {
  title: "Attofund Payroll - Payroll",
};

export default {
  setup() {
    useMeta(metaData);
    return {
      splitterModel: ref(200),
      date: ref(null),
      ratio_frequency: ref("weekly"),
      ratio_days: ref("mon"),
    };
  },
  data() {
    const tab = ref(portalRouterStore());
    if (tab.value.payTab === undefined) {
      tab.value.payTab = "payrolltable";
    }
    return {
      tab,
    };
  },
  components: {
    ProvidentFundPanel,
    AccessHistoryPanel,
    ContributionHistoryPanel,
    OnDemandPayPanel,
    SalaryPanel,
    PayrollTablePanel,
    PayrollComponentsPanel,
    PayslipPanel,
    AccessPolicyPanel,
  },
  methods: {},
};
</script>
