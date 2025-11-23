<template>
  <div class="q-pb-xl">
    <h3 class="text-h5 text-weight-medium q-ma-none">Payslip</h3>
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
          @click="backEmployeeSalary"
          label="Salary"
        />
        <q-breadcrumbs-el label="Payslip" />
      </q-breadcrumbs>
    </div>
    <q-toolbar class="q-px-none">
      <q-space />
      <div>
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
    </q-toolbar>
    <!---->
    <!-- PAYSLIP TEMPLATE -->
    <!---->
    <q-card flat class="q-mt-lg q-px-xl q-pb-xl">
      <q-card-section class="row q-pa-none"
        ><section class="col"></section>
        <section class="col">
          <q-img
            class="fit"
            src="https://c4.wallpaperflare.com/wallpaper/293/434/426/subaru-car-company-logo-wallpaper-preview.jpg"
          />
        </section>
        <section class="col"></section
      ></q-card-section>
      <q-card-section class="text-center q-py-none" style="font-size: 10px">
        {{ "The Cityview, 23 Waterloo Rd, Yau Ma Tei, Hong Kong" }}<br />
        <div class="q-gutter-x-sm">
          <span>Tel:{{ "59859195" }}</span
          ><span>Fax:{{ "59859195" }}</span
          ><span>email:{{ "jeheelee@attofund.com" }}</span>
        </div>
      </q-card-section>
      <q-card-section>
        <div
          class="text-center text-h6 text-weight-medium"
          style="text-decoration: underline"
        >
          PAYSLIP FOR THE MONTH OF {{ "AUG" }} OF {{ "2024" }}
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <section class="col text-left q-gutter-y-xs">
            <div class="row text-body2">
              <div class="col-4">Employer</div>
              <div class="col"><span class="q-mr-sm">:</span>{{ "SUBARU" }}</div>
            </div>
            <div class="row text-body2">
              <div class="col-4">Employee Name</div>
              <div class="col"><span class="q-mr-sm">:</span>{{ "Lee, Jehee" }}</div>
            </div>
            <div class="row text-body2">
              <div class="col-4">Employee ID</div>
              <div class="col"><span class="q-mr-sm">:</span>{{ "59859195" }}</div>
            </div>
            <div class="row text-body2">
              <div class="col-4">ID Card No.</div>
              <div class="col"><span class="q-mr-sm">:</span>{{ "M967753(A)" }}</div>
            </div>
            <div class="row text-body2">
              <div class="col-4">Payment Method</div>
              <div class="col">
                <span class="q-mr-sm">:</span>{{ "By Bank Transfer" }}
              </div>
            </div>
            <div class="row text-body2">
              <div class="col-4">Post</div>
              <div class="col"><span class="q-mr-sm">:</span>{{ "Project Manager" }}</div>
            </div>
          </section>
          <section class="col text-right">
            <div class="text-h6 text-weight-medium">PAYSLIP #{{ "00001" }}</div>
            <div class="text-body2 text-weight-regular">
              {{ "1 August 2024" }} to {{ "31 August 2024" }}
            </div>
          </section>
        </div>
      </q-card-section>
      <q-separator color="grey-10 q-mt-sm" />
      <!-- Calculations Before Deductions -->
      <q-card-section class="q-py-sm">
        <div class="row">
          <section class="col text-left q-gutter-y-xs">
            <div class="row text-body2 text-weight-medium">
              <div class="col-4" style="text-decoration: underline">Salary Details</div>
              <div class="col" style="text-decoration: underline">
                <span class="q-mr-sm"></span>Explanation
              </div>
            </div>
            <div class="row text-body2 q-mt-sm">Wages</div>
            <div class="row text-body2">
              <div class="col-4">Basic Salary</div>
              <div class="col">
                <span class="q-mr-sm">:</span>{{ "1 August 2024" }} to
                {{ "31 August 2024" }} ({{ "$1000" }} per {{ "day" }})
              </div>
            </div>
            <div class="row text-body2">
              <div class="col-4">Others</div>
              <div class="col"><span class="q-mr-sm">:</span>{{ "None" }}</div>
            </div>
            <div class="row text-body2 q-mt-xl">
              <div class="col-4">Total</div>
              <div class="col">
                <span class="q-mr-sm">:</span>{{ "1 August 2024" }} to
                {{ "31 August 2024" }}
              </div>
            </div>
          </section>
          <section class="col-3 text-right q-gutter-y-xs">
            <div class="text-body2 text-weight-medium" style="text-decoration: underline">
              Amount
            </div>
            <div class="text-body2 text-weight-regular q-mt-sm"><br /></div>
            <div class="text-body2 text-weight-regular">${{ "20,000.00" }}</div>
            <div class="text-body2 text-weight-regular">${{ "0.00" }}</div>
            <div class="text-body2 text-weight-regular q-mt-xl">${{ "20,000.00" }}</div>
          </section>
        </div>
      </q-card-section>
      <!-- Deductions Calculations -->
      <q-card-section
        class="text-body2 text-weight-regular"
        style="text-decoration: underline"
      >
        Less
      </q-card-section>
      <q-card-section class="q-py-none">
        <div class="row">
          <section class="col-7">
            <div class="row text-body2">
              <div class="col-5">MPF</div>
              <div class="col">
                <span class="q-mr-sm">:</span>{{ "1 August 2024" }} to
                {{ "31 August 2024" }}
              </div>
            </div>
          </section>
          <section class="col text-center">Employer</section>
          <section class="col text-center">Employee</section>
        </div>
        <div class="row q-mt-sm">
          <section class="col-7"></section>
          <section class="col text-center">${{ "1,000.00" }}</section>
          <section class="col text-center">${{ "1,000.00" }}</section>
        </div>
      </q-card-section>
      <q-card-section class="q-py-none q-mt-sm">
        <div class="row">
          <section class="col-7">
            <div class="row text-body2">
              <div class="col-5">Others</div>
              <div class="col"><span class="q-mr-sm">:</span>None</div>
            </div>
          </section>
          <section class="col text-center">Employer</section>
          <section class="col text-center">Employee</section>
        </div>
        <div class="row q-mt-sm">
          <section class="col-7"></section>
          <section class="col text-center">${{ "0.00" }}</section>
          <section class="col text-center">${{ "0.00" }}</section>
        </div>
      </q-card-section>
      <q-card-section class="q-py-none q-mt-lg">
        <div class="row">
          <section class="col">
            <div class="row text-body2">Less Amount</div>
          </section>
          <section class="col-2 text-right">
            ${{ "1,000.00" }}<q-separator color="grey-10" />
          </section>
        </div>
        <div class="row q-mt-xs">
          <section class="col">
            <div class="row text-body2">Balance Amount</div>
          </section>
          <section class="col-2 text-weight-medium text-right">
            ${{ "19,000.00" }}
          </section>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <section class="col-7">
            <div class="row text-body2">
              <div class="col-5">Remarks</div>
              <div class="col">
                <span class="q-mr-sm">:</span>{{ "MPF" }} Contribution ${{ "1,000.00" }}
              </div>
            </div>
          </section>
        </div>
      </q-card-section>
      <q-card-section class="q-gutter-y-xs">
        <div class="row">
          <section class="col-7">
            <div class="row text-body2">
              <div class="col-5">Annual Leave</div>
              <div class="col"><span class="q-mr-sm">:</span>{{ "0" }} days</div>
            </div>
          </section>
        </div>
        <div class="row">
          <section class="col-7">
            <div class="row text-body2">
              <div class="col-5">Unpaid Leave</div>
              <div class="col"><span class="q-mr-sm">:</span>{{ "0" }} days</div>
            </div>
          </section>
        </div>
        <div class="row">
          <section class="col-7">
            <div class="row text-body2">
              <div class="col-5">Sick Leave</div>
              <div class="col"><span class="q-mr-sm">:</span>{{ "0" }} days</div>
            </div>
          </section>
        </div>
      </q-card-section>
      <!--Signiture-->
      <q-card-section class="q-py-sm q-py-xl">
        <div class="row">
          <section class="col text-left">
            <div class="row text-body2 text-weight-regular">
              <div class="col-3">Signed By</div>
              <div class="col-6"><br /><q-separator color="grey-10" /></div>
            </div>
          </section>
          <section class="col-3 text-right">
            <br /><q-separator color="grey-10" />
          </section>
        </div>
        <div class="row">
          <section class="col text-left">
            <div class="row text-body2 text-weight-regular">
              <div class="col-3"></div>
              <div class="col-6">{{ "Lee, Jehee" }}</div>
            </div>
          </section>
          <section class="col-3 text-right">
            <div class="text-left text-body2 text-weight-regular">{{ "SUBARU" }}</div>
          </section>
        </div>
      </q-card-section>
    </q-card>
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
    backEmployeeSalary() {
      this.tab.payTab = "salary";
    },
  },
};
</script>
