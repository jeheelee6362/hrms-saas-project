<template>
  <div>
    <h3 class="text-h5 text-weight-medium q-ma-none">Access Policy</h3>
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
            class="hover-underline"
            @click="callOnDemandPay"
            lass="hover-underline"
            label="On Demand Pay"
          />
          <q-breadcrumbs-el label="Access Policy" />
        </q-breadcrumbs>
      </div>

      <div class="q-gutter-x-sm">
        <q-btn
          no-caps
          rounded
          class="text-white bg-teal-8"
          icon="las la-plus"
          label="Add Custom Policy"
        />
      </div>
    </div>
    <div class="q-mt-xl q-gutter-y-lg">
      <!-- Edit Annual Leave -->
      <q-card flat class="q-pa-sm">
        <q-card-section>
          <div class="text-h6 text-weight-medium">Annual Leave</div>
        </q-card-section>
      </q-card>
      <!-- Edit Sick Leave -->
      <q-card flat class="q-pa-sm">
        <q-card-section>
          <div class="text-h6 text-weight-medium">Sick Leave</div>
        </q-card-section>
      </q-card>
      <!-- Edit Maternity Leave -->
      <q-card flat class="q-pa-sm">
        <q-card-section>
          <div class="text-h6 text-weight-medium">Maternity Leave</div>
        </q-card-section>
      </q-card>
      <!-- Edit Paternity Leave -->
      <q-card flat class="q-pa-sm">
        <q-card-section>
          <div class="text-h6 text-weight-medium">Paternity Leave</div>
        </q-card-section>
      </q-card>
      <!-- Edit Marriage Leave -->
      <q-card flat class="q-pa-sm">
        <q-card-section>
          <div class="text-h6 text-weight-medium">Marriage Leave</div>
        </q-card-section>
      </q-card>
      <!-- Edit Bereavement Leave -->
      <q-card flat class="q-pa-sm">
        <q-card-section>
          <div class="text-h6 text-weight-medium">Bereavement Leave</div>
        </q-card-section>
      </q-card>
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
    callOnDemandPay() {
      this.tab.payTab = "ondemand";
    },
  },
};
</script>
