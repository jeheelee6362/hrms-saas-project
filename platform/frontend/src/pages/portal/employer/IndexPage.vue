<template>
  <q-page class="row fit bg-blue-grey-1">
    <!-- Page Content Container -->
    <div class="full-width q-pt-lg q-px-lg">
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
          <q-breadcrumbs-el label="Employer Dashboard" />
        </q-breadcrumbs>
      </div>
      <!-- Greetings -->
      <div class="row q-mt-lg">
        <q-card flat class="row full-width">
          <q-card-section class="col q-pa-lg"
            ><div class="text-h5 text-weight-bold">
              <span class="text-grey-9">{{ "Good Morning" + ", " }}</span
              ><span class="text-teal-8">{{ "Jehee" + " " + "Lee" }}</span>
            </div>
            <div class="text-body1 text-weight-medium text-grey-6">
              Have a nice day at work
            </div></q-card-section
          >
          <q-card-section class="col bg-yellow"></q-card-section>
        </q-card>
      </div>
      <!-- Brief Statistics: Total Employee / New Employee / Total Salary / Avg. Salary -->
      <div class="row q-mt-lg q-gutter-x-lg">
        <q-card flat class="col"
          ><q-card-section
            ><div class="text-h6 text-weight-medium">Total Employee</div>
            <div class="text-h5 text-weight-medium text-teal-8 q-mt-xs">
              {{ "12" }}
            </div></q-card-section
          ><q-card-section
            ><div class="text-body2 text-weight-regular text-grey-6">
              {{ "20%" + " " }}Since last month
            </div></q-card-section
          ></q-card
        >
        <q-card flat class="col"
          ><q-card-section
            ><div class="text-h6 text-weight-medium">New Employee</div>
            <div class="text-h5 text-weight-medium text-teal-8 q-mt-xs">
              {{ "1" }}
            </div></q-card-section
          ><q-card-section
            ><div class="text-body2 text-weight-regular text-grey-6">
              {{ "00%" + " " }}Since last month
            </div></q-card-section
          ></q-card
        >
        <q-card flat class="col"
          ><q-card-section
            ><div class="text-h6 text-weight-medium">Total Salary</div>
            <div class="text-h5 text-weight-medium text-teal-8 q-mt-xs">
              ${{ "200K" }}
            </div></q-card-section
          ><q-card-section
            ><div class="text-body2 text-weight-regular text-grey-6">
              {{ "23%" + " " }}Since last month
            </div></q-card-section
          ></q-card
        >
        <q-card flat class="col"
          ><q-card-section
            ><div class="text-h6 text-weight-medium">Avg. Salary</div>
            <div class="text-h5 text-weight-medium text-teal-8 q-mt-xs">
              ${{ "19,000" }}
            </div></q-card-section
          ><q-card-section
            ><div class="text-body2 text-weight-regular text-grey-6">
              {{ "06%" + " " }}Since last month
            </div></q-card-section
          ></q-card
        >
      </div>
      <!-- Leave Requests -->
      <div class="row q-mt-lg q-gutter-x-lg">
        <q-card flat class="col"
          ><q-card-section
            ><div class="text-subtitle1 text-weight-medium text-grey-9">
              Leave Requests
            </div></q-card-section
          ><q-card-section>
            <q-markup-table square flat>
              <thead class="text-body1 text-weight-bold text-left">
                <tr>
                  <th>Employee</th>
                  <th>Leave Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Leave Days</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="index in 8"
                  :key="index"
                  :class="index % 2 === 0 ? 'bg-grey-2' : 'bg-white'"
                >
                  <td>{{ "Jehee Lee" }}</td>
                  <td>{{ "Medical Leave" }}</td>
                  <td>{{ "Feb 27, 2025" }}</td>
                  <td>{{ "Feb 27, 2025" }}</td>
                  <td>{{ "1 day" }}</td>
                  <td>{{ "Personal" }}</td>
                  <td>
                    <span class="text-light-blue-8">{{ "Pending" }}</span>
                  </td>
                  <td>
                    <q-btn dense round size="md" flat icon="las la-ellipsis-v">
                      <q-popup-proxy>
                        <q-card>
                          <q-item class="flex items-center q-pr-xl" dense clickable
                            ><q-icon
                              name="las la-search"
                              class="q-mr-sm"
                            />View...</q-item
                          >
                          <q-item class="flex items-center q-pr-xl" dense clickable
                            ><q-icon
                              name="las la-pencil-alt"
                              class="q-mr-sm"
                            />Edit</q-item
                          >
                          <q-item class="flex items-center q-pr-xl" dense clickable
                            ><q-icon
                              name="las la-trash-alt"
                              class="q-mr-sm"
                            />Delete</q-item
                          >
                        </q-card>
                      </q-popup-proxy>
                    </q-btn>
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card-section></q-card
        >
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useMeta } from "quasar";

const metaData = {
  title: "Attofund Payroll - Dashboard",
};

export default {
  setup() {
    useMeta(metaData);
    return {};
  },
};
</script>
