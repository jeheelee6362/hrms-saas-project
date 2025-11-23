<template>
  <q-page class="flex">
    <q-splitter v-model="splitterModel" unit="px" class="full-width" :limits="[200, 200]">
      <template v-slot:before>
        <q-tabs
          v-model="tab.repTab"
          vertical
          dense
          class="fixed width-full bg-white"
          indicator-color="transparent"
          active-class="text-black bg-grey-3"
        >
          <div class="q-pa-md">
            <span class="text-label text-grey text-weight-medium">Report Generation</span>
          </div>
          <q-tab no-caps name="template" style="justify-content: initial"
            ><span class="q-pl-sm text-body2 text-weight-medium">Template</span></q-tab
          >
          <q-tab no-caps name="recipient" style="justify-content: initial"
            ><span class="q-pl-sm text-body2 text-weight-medium">Recipient</span></q-tab
          >
          <q-tab no-caps name="scheduler" style="justify-content: initial"
            ><span class="q-pl-sm text-body2 text-weight-medium">Scheduler</span></q-tab
          >
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab.repTab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
          class="row fit bg-blue-grey-1"
        >
          <q-tab-panel name="template" class="q-pt-lg q-px-lg"></q-tab-panel>
          <q-tab-panel name="recipient" class="q-pt-lg q-px-lg"></q-tab-panel>
          <q-tab-panel name="scheduler" class="q-pt-lg q-px-lg"></q-tab-panel>
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
  title: "Attofund Payroll - Report",
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
    if (tab.value.repTab === undefined) {
      tab.value.repTab = "template";
    }
    return {
      tab,
    };
  },
  components: {},
  methods: {},
};
</script>
