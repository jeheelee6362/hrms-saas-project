<template>
  <div>
    <h3 class="text-h5 text-weight-medium q-ma-none">Leave Balance</h3>
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
          <q-breadcrumbs-el @click="callLeaves" class="hover-underline" label="Leaves" />
          <q-breadcrumbs-el label="Leave Balance" />
        </q-breadcrumbs>
      </div>
      <div class="q-gutter-x-sm">
        <q-btn
          no-caps
          rounded
          class="text-white bg-teal-8"
          icon="las la-plus"
          label="Add New"
        />
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
          ><div class="flex flex-center text-subtitle1 text-weight-regular">
            Annual Leave
          </div>
          <div class="flex flex-center text-h5 text-weight-bold">
            {{ "10" }} / {{ "12" }}
          </div>
          <div class="flex flex-center text-body2 text-weight-regular text-grey-6">
            Remaining
          </div></q-card
        >
      </section>
      <section class="col">
        <q-card bordered flat class="q-pa-md"
          ><div class="flex flex-center text-subtitle1 text-weight-regular">
            Sick Leave
          </div>
          <div class="flex flex-center text-h5 text-weight-bold">
            {{ "32" }} / {{ "48" }}
          </div>
          <div class="flex flex-center text-body2 text-weight-regular text-grey-6">
            Remaining
          </div></q-card
        >
      </section>
      <section class="col">
        <q-card bordered flat class="q-pa-md"
          ><div class="flex flex-center text-subtitle1 text-weight-regular">
            Other Leave
          </div>
          <div class="flex flex-center text-h5 text-weight-bold">
            {{ "0" }} / {{ "0" }}
          </div>
          <div class="flex flex-center text-body2 text-weight-regular text-grey-6">
            Remaining
          </div>
        </q-card>
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
      <!-- Leave Table -->
      <q-markup-table class="q-mt-lg">
        <thead>
          <tr class="text-body1 text-weight-bold text-left text-white bg-grey-10">
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>Leave Days</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Attachment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="index in 10"
            :key="index"
            :class="index % 2 === 0 ? 'bg-grey-2' : 'bg-white'"
          >
            <td>{{ "Sick Leave" }}</td>
            <td>{{ "Feb 27, 2025" }}</td>
            <td>{{ "Feb 27, 2025" }}</td>
            <td>{{ "1 day" }}</td>
            <td>{{ "Personal" }}</td>
            <td>
              <span class="text-light-blue-8">{{ "Pending" }}</span>
            </td>
            <td>
              <q-btn
                no-caps
                flat
                square
                class="text-white bg-light-blue-8"
                label="Download"
              />
            </td>
            <td>
              <q-btn dense round size="md" flat icon="las la-ellipsis-v">
                <q-popup-proxy>
                  <q-card>
                    <q-item class="flex items-center q-pr-xl" dense clickable
                      ><q-icon name="las la-pencil-alt" class="q-mr-sm" />Edit</q-item
                    >
                    <q-item class="flex items-center q-pr-xl" dense clickable
                      ><q-icon name="las la-trash-alt" class="q-mr-sm" />Delete</q-item
                    >
                  </q-card>
                </q-popup-proxy>
              </q-btn>
            </td>
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
    callLeaves() {
      this.tab.empTab = "leaves";
    },
  },
};
</script>
