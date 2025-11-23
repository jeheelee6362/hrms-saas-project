<template>
  <q-page class="flex">
    <q-splitter v-model="splitterModel" unit="px" class="full-width" :limits="[200, 200]">
      <template v-slot:before>
        <q-tabs
          v-model="tab.tatTab"
          vertical
          dense
          class="fixed width-full bg-white"
          indicator-color="transparent"
          active-class="text-black bg-grey-3"
        >
          <div class="q-pa-md">
            <span class="text-label text-grey text-weight-medium">Time Tracking</span>
          </div>
          <q-tab no-caps name="attendance" style="justify-content: initial"
            ><span class="q-pl-sm text-body2 text-weight-medium">Attendance</span></q-tab
          >
          <q-tab no-caps name="timesheet" style="justify-content: initial"
            ><span class="q-pl-sm text-body2 text-weight-medium">Timesheet</span></q-tab
          >
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab.tatTab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
          class="row fit bg-blue-grey-1"
        >
          <q-tab-panel name="attendance" class="q-pt-lg q-px-lg"
            ><AttendancePanel
          /></q-tab-panel>
          <q-tab-panel name="timesheet" class="q-pt-lg q-px-lg"
            ><TimesheetPanel
          /></q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useMeta } from "quasar";
import { portalRouterStore } from "src/stores/store";
import { AttendancePanel, TimesheetPanel } from "src/views";

const metaData = {
  title: "Attofund Payroll - Payroll",
};

export default {
  setup() {
    useMeta(metaData);
    return {
      splitterModel: ref(200),
    };
  },
  data() {
    const tab = ref(portalRouterStore());
    if (tab.value.tatTab === undefined) {
      tab.value.tatTab = "attendance";
    }
    return {
      tab,
    };
  },
  components: { AttendancePanel, TimesheetPanel },
  methods: {},
};
</script>
