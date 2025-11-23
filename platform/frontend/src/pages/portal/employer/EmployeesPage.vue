<template>
  <q-page class="row window-height flex">
    <q-splitter v-model="splitterModel" unit="px" class="full-width" :limits="[200, 200]">
      <template v-slot:before>
        <q-tabs
          v-model="tab.empTab"
          vertical
          dense
          class="fixed width-full bg-white"
          indicator-color="transparent"
        >
          <div class="q-pa-md">
            <span class="text-label text-grey text-weight-medium">Employee</span>
          </div>
          <q-tab
            :class="
              tab.empTab === 'employees' ||
              tab.empTab === 'editemployee' ||
              tab.empTab === 'viewemployee'
                ? 'text-black bg-grey-3'
                : ''
            "
            no-caps
            name="employees"
            style="justify-content: initial"
            ><span class="q-pl-sm text-body2 text-weight-medium"
              >All Employees</span
            ></q-tab
          >
          <q-tab
            :class="tab.empTab === 'holidays' ? 'text-black bg-grey-3' : ''"
            no-caps
            name="holidays"
            style="justify-content: initial"
            ><span class="q-pl-sm text-body2 text-weight-medium">Holidays</span></q-tab
          >
          <q-tab
            :class="
              tab.empTab === 'leaves' ||
              tab.empTab === 'leavebalance' ||
              tab.empTab === 'leavepolicy' ||
              tab.empTab === 'editleavepolicy'
                ? 'text-black bg-grey-3'
                : ''
            "
            no-caps
            name="leaves"
            style="justify-content: initial"
            ><span class="q-pl-sm text-body2 text-weight-medium">Leaves</span></q-tab
          >
          <q-tab
            :class="tab.empTab === 'shifts' ? 'text-black bg-grey-3' : ''"
            no-caps
            name="shifts"
            style="justify-content: initial"
            ><span class="q-pl-sm text-body2 text-weight-medium">Shifts</span></q-tab
          >
          <q-tab
            :class="tab.empTab === 'groups' ? 'text-black bg-grey-3' : ''"
            no-caps
            name="groups"
            style="justify-content: initial"
            ><span class="q-pl-sm text-body2 text-weight-medium"
              >Organization</span
            ></q-tab
          >
          <q-tab
            :class="tab.empTab === 'roles' ? 'text-black bg-grey-3' : ''"
            no-caps
            name="roles"
            style="justify-content: initial"
            ><span class="q-pl-sm text-body2 text-weight-medium">Designation</span></q-tab
          >
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab.empTab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
          class="row fit bg-blue-grey-1"
        >
          <q-tab-panel name="viewemployee" class="q-pt-lg q-px-lg">
            <ViewEmployeePanel />
          </q-tab-panel>

          <q-tab-panel name="editemployee" class="q-pt-lg q-px-lg">
            <EditEmployeePanel />
          </q-tab-panel>

          <q-tab-panel name="employees" class="q-pt-lg q-px-lg">
            <EmployeePanel />
          </q-tab-panel>

          <q-tab-panel name="holidays" class="q-pt-lg q-px-lg">
            <HolidaysPanel />
          </q-tab-panel>

          <q-tab-panel name="leaves" class="q-pt-lg q-px-lg">
            <LeavesPanel />
          </q-tab-panel>

          <q-tab-panel name="leavebalance" class="q-pt-lg q-px-lg">
            <LeaveBalancePanel />
          </q-tab-panel>

          <q-tab-panel name="leavepolicy" class="q-pt-lg q-px-lg">
            <LeavePolicyPanel />
          </q-tab-panel>

          <q-tab-panel name="shifts" class="q-pt-lg q-px-lg">
            <ShiftsPanel />
          </q-tab-panel>

          <q-tab-panel name="editleavepolicy" class="q-pt-lg q-px-lg">
            <EditLeavePolicyPanel />
          </q-tab-panel>

          <q-tab-panel name="roles" class="q-pt-lg q-px-lg">
            <DesignationPanel />
          </q-tab-panel>

          <q-tab-panel name="groups" class="q-pt-lg q-px-lg">
            <OrganizationPanel />
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
  EmployeePanel,
  EditEmployeePanel,
  EditLeavePolicyPanel,
  ShiftsPanel,
  ViewEmployeePanel,
  DesignationPanel,
  HolidaysPanel,
  LeavesPanel,
  LeaveBalancePanel,
  LeavePolicyPanel,
  OrganizationPanel,
} from "src/views";

const metaData = {
  title: "Attofund Payroll - Employees",
};

export default {
  setup() {
    useMeta(metaData);
    return {
      splitterModel: ref(200),
      date: ref(null),
    };
  },
  components: {
    EmployeePanel,
    EditEmployeePanel,
    EditLeavePolicyPanel,
    ShiftsPanel,
    ViewEmployeePanel,
    DesignationPanel,
    HolidaysPanel,
    LeavesPanel,
    LeaveBalancePanel,
    LeavePolicyPanel,
    OrganizationPanel,
  },
  data() {
    const tab = ref(portalRouterStore());
    if (tab.value.empTab === undefined) {
      tab.value.empTab = "employees";
    }
    return {
      tab,
    };
  },
  methods: {},
};
</script>
