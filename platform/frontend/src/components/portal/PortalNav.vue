<template>
  <q-drawer
    show-if-above
    :mini="miniState"
    :breakpoint="500"
    :mini-width="54"
    class="bg-blue-grey-10"
  >
    <q-scroll-area class="fit">
      <q-list>
        <q-item
          to="/portal/employer/dashboard"
          clickable
          class="text-blue-grey-6"
          active-class="drawer-active"
          v-ripple
        >
          <q-item-section avatar>
            <q-icon size="sm" name="las la-compass" />
          </q-item-section>
          <q-tooltip
            class="bg-white text-black shadow-1"
            anchor="center right"
            self="center left"
            :offset="[10, 10]"
          >
            Dashboard
          </q-tooltip>
        </q-item>

        <q-item
          to="/portal/employer/people"
          clickable
          class="text-blue-grey-6"
          active-class="drawer-active"
          v-ripple
        >
          <q-item-section avatar>
            <q-icon size="xs" name="las la-user-friends" />
          </q-item-section>
          <q-tooltip
            class="bg-white text-black shadow-1"
            anchor="center right"
            self="center left"
            :offset="[10, 10]"
          >
            Employee
          </q-tooltip>
        </q-item>

        <q-item
          to="/portal/employer/payroll"
          clickable
          class="text-blue-grey-6"
          active-class="drawer-active"
          v-ripple
        >
          <q-item-section avatar>
            <q-icon size="xs" name="las la-wallet" />
          </q-item-section>
          <q-tooltip
            class="bg-white text-black shadow-1"
            anchor="center right"
            self="center left"
            :offset="[10, 10]"
          >
            Payroll
          </q-tooltip>
        </q-item>

        <q-item
          to="/portal/employer/time-attendance"
          clickable
          class="text-blue-grey-6"
          active-class="drawer-active"
          v-ripple
        >
          <q-item-section avatar>
            <q-icon size="xs" name="las la-clock" />
          </q-item-section>
          <q-tooltip
            class="bg-white text-black shadow-1"
            anchor="center right"
            self="center left"
            :offset="[10, 10]"
          >
            Time Tracking
          </q-tooltip>
        </q-item>

        <q-item
          to="/portal/employer/report"
          clickable
          class="text-blue-grey-6"
          active-class="drawer-active"
          v-ripple
        >
          <q-item-section avatar>
            <q-icon size="xs" name="las la-file-invoice" />
          </q-item-section>
          <q-tooltip
            class="bg-white text-black shadow-1"
            anchor="center right"
            self="center left"
            :offset="[10, 10]"
          >
            Report
          </q-tooltip>
        </q-item>

        <q-item
          to="/portal/employer/data-export"
          clickable
          class="text-blue-grey-6"
          active-class="drawer-active"
          v-ripple
        >
          <q-item-section avatar>
            <q-icon size="xs" name="las la-cloud-download-alt" />
          </q-item-section>
          <q-tooltip
            class="bg-white text-black shadow-1"
            anchor="center right"
            self="center left"
            :offset="[10, 10]"
          >
            Data Export
          </q-tooltip>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  setup() {
    return {
      miniState: ref(true),
    };
  },
};
</script>
