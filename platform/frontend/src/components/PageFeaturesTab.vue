<template>
  <q-separator />
  <q-tabs class="bg-grey-4 shadow-1">
    <q-item
      class="items-center text-blue-grey-8"
      active-class="text-weight-medium"
    >
      General Payroll
    </q-item>
    <q-item
      class="items-center text-blue-grey-8"
      active-class="text-weight-medium"
      to="/get-to-know-us/income-sync"
    >
      Income Synchronization
    </q-item>
    <q-item
      class="items-center text-blue-grey-8"
      active-class="text-weight-medium"
      to="/get-to-know-us/time-attendance"
    >
      Time & Attendance
    </q-item>
    <q-item
      class="items-center text-blue-grey-8"
      active-class="text-weight-medium"
      to="/get-to-know-us/tax-compliance"
    >
      Taxes and Forms
    </q-item>
    <q-item class="items-center text-blue-grey-8"> Headhunting </q-item>
    <q-item class="items-center text-blue-grey-8"> Pricing </q-item>
    <q-space />
  </q-tabs>
  <q-separator />
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>
