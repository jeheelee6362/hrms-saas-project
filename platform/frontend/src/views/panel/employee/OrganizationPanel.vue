<template>
  <div>
    <h3 class="text-h5 text-weight-medium q-ma-none">Organization</h3>
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
          <q-breadcrumbs-el label="Organization" />
        </q-breadcrumbs>
      </div>
      <div class="q-gutter-x-sm">
        <q-btn
          no-caps
          rounded
          class="text-white bg-teal-8"
          icon="las la-plus"
          label="Add Department"
          @click="callAddDialog()"
        />
      </div>
    </div>
    <!-- Department List-->
    <div class="row q-gutter-x-md q-mb-xl">
      <q-card flat bordered class="bg-white" style="width: 240px">
        <div class="q-px-md">
          <q-card-section class="q-px-none q-pt-md q-pb-sm">
            <div>
              <h6 class="text-subtitle1 text-weight-medium text-black q-ma-none">
                Organization
              </h6>
            </div>
            <div class="q-mt-lg">
              <q-input
                ref="filterRef"
                input-class="text-black"
                color="teal"
                bg-color="white"
                outlined
                dense
                v-model="filter"
              >
                <template v-slot:prepend>
                  <q-icon size="xs" color="grey-9" name="search" />
                </template>
              </q-input>
            </div>
          </q-card-section>
          <q-separator color="grey-7" />
          <q-tree
            :nodes="organizationTree"
            :filter="filter"
            :selected="selected"
            node-key="key"
            class="q-my-md text-capitalize"
            text-color="grey-8"
            selected-color="teal-8"
            v-model:selected="selected"
            dense
            no-selection-unset
            default-expand-all
          />
        </div>
      </q-card>

      <q-card flat bordered class="col q-pa-sm">
        <q-toolbar class="q-px-md"
          ><q-toolbar-title class="text-h6 text-weight-medium text-capitalize">{{
            organizationView.displayName
          }}</q-toolbar-title
          ><q-space /><q-btn-group flat square class="q-gutter-x-sm">
            <q-btn
              no-caps
              class="text-black bg-grey-3"
              @click="
                callEditDialog(
                  organizationView.key,
                  organizationView.organizationId,
                  organizationView.name,
                  organizationView.dateCreated,
                  organizationView.pic,
                  organizationView.description,
                  organizationView.dir,
                  organizationView.members
                )
              "
              ><div class="flex justify-start items-center q-pr-sm">
                <q-icon size="18px" name="las la-edit" /><span class="q-pl-xs">Edit</span>
              </div></q-btn
            >
            <q-btn
              no-caps
              class="text-black bg-grey-3"
              @click="callDeleteDialog(organizationView.key)"
              ><div class="flex justify-start items-center q-pr-sm">
                <q-icon size="18px" name="las la-times" /><span class="q-pl-xs"
                  >Delete</span
                >
              </div></q-btn
            ></q-btn-group
          ></q-toolbar
        >
        <q-tabs
          v-model="viewTab"
          dense
          align="left"
          narrow-indicator
          class="text-grey-9 q-mt-md"
          active-class="text-black"
          indicator-color="teal-8"
        >
          <q-tab no-caps name="description" label="Description" />
          <q-tab no-caps name="member" label="Member List" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="viewTab" animated class="q-py-md">
          <!-- Description Panel -->
          <q-tab-panel name="description">
            <q-markup-table flat>
              <tr>
                <td class="text-body2 text-weight-medium" style="width: 240px">
                  Organization name
                </td>
                <td class="text-capitalize">{{ organizationView.displayName }}</td>
              </tr>
              <tr>
                <td class="text-body2 text-weight-medium">Organization ID</td>
                <td>{{ organizationView.organizationId }}</td>
              </tr>
              <tr>
                <td class="text-body2 text-weight-medium">Created</td>
                <td>
                  {{
                    getDateWithFormat(
                      organizationView.dateCreated,
                      "YYYY-MM-DD",
                      "MMMM DD, YYYY"
                    )
                  }}
                </td>
              </tr>
              <tr>
                <td class="text-body2 text-weight-medium">Employee(s)</td>
                <td>{{ organizationView.memberNumbers }}</td>
              </tr>
              <tr>
                <td class="text-body2 text-weight-medium">Person in charge</td>
                <td>
                  <span v-if="employeeMap.has(organizationView.pic)">{{
                    employeeMap.get(organizationView.pic).givenName +
                    " " +
                    employeeMap.get(organizationView.pic).surname
                  }}</span>
                </td>
              </tr>
              <tr>
                <td class="text-body2 text-weight-medium">Description</td>
                <td>{{ organizationView.description }}</td>
              </tr>
            </q-markup-table>
          </q-tab-panel>
          <!--Employee List Panel-->
          <q-tab-panel name="member">
            <q-item dense class="bg-grey-3">
              <q-item-section side>
                <q-checkbox
                  dense
                  color="teal-8"
                  v-model="selectAll"
                  @update:model-value="toggleSelectAll"
                />
              </q-item-section>
              <q-item-section>
                <q-btn-group flat>
                  <q-btn no-caps label="Assign PIC" />
                  <q-btn-dropdown no-caps label="Move employee">
                    <q-list>
                      <q-item dense clickable class="flex flex-center"
                        >Move employee</q-item
                      >
                      <q-item dense clickable class="flex flex-center"
                        >Release employee</q-item
                      >
                    </q-list>
                  </q-btn-dropdown>
                  <q-separator vertical spaced />
                  <q-btn no-caps label="Add employee" />
                </q-btn-group>
              </q-item-section>
            </q-item>
            <q-list class="q-mt-md">
              <q-item-label header>Person in charge (PIC)</q-item-label>

              <q-item v-if="organizationView.pic !== null">
                <q-item-section side>
                  <q-checkbox
                    dense
                    color="teal-8"
                    v-model="individualChecks['pic']"
                    @update:model-value="checkIndividual"
                  />
                </q-item-section>
                <q-item-section avatar>
                  <q-avatar class="bg-purple-8 text-uppercase" text-color="white">
                    <span v-if="employeeMap.has(organizationView.pic)">{{
                      employeeMap.get(organizationView.pic).givenName[0]
                    }}</span>
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">
                    <span
                      class="text-weight-medium"
                      v-if="employeeMap.has(organizationView.pic)"
                    >
                      {{
                        employeeMap.get(organizationView.pic).givenName +
                        " " +
                        employeeMap.get(organizationView.pic).surname
                      }}
                    </span>
                    <span class="text-grey-8">
                      -
                      {{
                        designationMap.get(
                          employeeMap.get(organizationView.pic).designation
                        )
                      }}</span
                    >
                  </q-item-label>
                  <q-item-label caption lines="1">
                    Joined {{ "Attofund" }} on
                    <span v-if="employeeMap.has(organizationView.pic)">{{
                      getDateWithFormat(
                        employeeMap.get(organizationView.pic).joinDate,
                        "YYYY-MM-DD",
                        "MMMM DD, YYYY"
                      )
                    }}</span>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator spaced />
              <q-item-label header>{{
                organizationView.memberNumbers + " Employee(s)"
              }}</q-item-label>

              <q-item v-for="(el, index) in organizationView.members" :key="index">
                <q-item-section side>
                  <q-checkbox
                    dense
                    color="teal-8"
                    v-model="individualChecks[el]"
                    @update:model-value="checkIndividual"
                  />
                </q-item-section>
                <q-item-section avatar>
                  <q-avatar class="bg-purple-8 text-uppercase" text-color="white">
                    <span v-if="employeeMap.has(el)">{{
                      employeeMap.get(el).givenName[0]
                    }}</span>
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">
                    <span class="text-weight-medium" v-if="employeeMap.has(el)">
                      {{
                        employeeMap.get(el).givenName + " " + employeeMap.get(el).surname
                      }}
                    </span>
                    <span class="text-grey-8" v-if="employeeMap.has(el)">
                      - {{ designationMap.get(employeeMap.get(el).designation) }}
                    </span>
                  </q-item-label>
                  <q-item-label caption lines="1">
                    Joined {{ "Attofund" }} on
                    <span v-if="employeeMap.has(el)">{{
                      getDateWithFormat(
                        employeeMap.get(el).joinDate,
                        "YYYY-MM-DD",
                        "MMMM DD, YYYY"
                      )
                    }}</span>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
    <!-- Delete Organization Dialog -->
    <q-dialog v-model="deleteDialog" persistent>
      <q-card>
        <q-card-section class="text-center">
          <h6 class="text-center q-ma-none">Delete Designation</h6>
          <div class="q-mx-lg q-mt-md">
            Are you sure you want to delete <br /><strong
              >'{{ organizationModel.displayName }}'</strong
            ><br />
            from the designation list?
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="row q-pa-none">
          <q-item dense clickable class="col flex-center q-py-md" v-close-popup
            >NO</q-item
          >
          <q-separator vertical />
          <q-item
            dense
            clickable
            class="col flex-center q-py-md text-red"
            @click="removeOrganization()"
            v-close-popup
            >YES</q-item
          >
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Add Organization Dialog -->
    <q-dialog v-model="addDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="text-center">
          <h6 class="text-center q-ma-none">Add Organization</h6>
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-none q-pb-sm">
          <label>Organization Name<span class="text-red">*</span></label>
          <q-input v-model="organizationModel.name" color="teal" dense outlined />
        </q-card-section>
        <q-card-section class="q-px-lg q-py-sm">
          <label>Organization ID<span class="text-red">*</span></label>
          <q-input
            v-model="organizationModel.organizationId"
            color="teal"
            dense
            outlined
          />
        </q-card-section>
        <q-card-section class="q-px-lg q-py-sm">
          <label>Organization Members</label>
          <q-select
            v-model="organizationModel.members"
            :options="employeeList"
            multiple
            color="teal"
            dense
            outlined
            emit-value
            map-options
          />
        </q-card-section>
        <q-card-section class="q-px-lg q-py-sm">
          <div class="row q-gutter-x-lg">
            <section class="col">
              <label class="text-body2 text-weight-regular"
                >Subdivision under<span class="text-red">*</span></label
              >
              <q-select
                v-model="organizationModel.dir"
                :options="organizationOptions"
                color="teal"
                dense
                outlined
              />
            </section>
            <section class="col">
              <label class="text-body2 text-weight-regular">Person in Charge</label>
              <q-select
                v-model="organizationModel.pic"
                :options="employeeList"
                color="teal"
                dense
                outlined
                emit-value
                map-options
              />
            </section>
          </div>
        </q-card-section>
        <q-card-section class="q-px-lg q-py-sm">
          <label>Description</label>
          <q-input
            autogrow
            v-model="organizationModel.description"
            color="teal"
            dense
            outlined
          />
        </q-card-section>
        <q-card-section class="q-px-lg q-py-sm">
          <label>Creation Date<span class="text-red">*</span></label>
          <q-input
            type="date"
            v-model="organizationModel.dateCreated"
            color="teal"
            dense
            outlined
          />
        </q-card-section>
        <q-card-section class="row justify-end">
          <q-btn no-caps flat class="" label="Cancel" v-close-popup />
          <q-btn
            no-caps
            flat
            class="text-white bg-teal-8 q-px-lg q-py-xs"
            label="Save"
            @click="createOrganization()"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Edit Organization Dialog -->
    <q-dialog v-model="editDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="text-center">
          <h6 class="text-center q-ma-none">Edit Organization</h6>
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-none q-pb-sm">
          <label>Organization Name<span class="text-red">*</span></label>
          <q-input v-model="organizationModel.name" color="teal" dense outlined />
        </q-card-section>
        <q-card-section class="q-px-lg q-py-sm">
          <label>Description</label>
          <q-input
            autogrow
            v-model="organizationModel.description"
            color="teal"
            dense
            outlined
          />
        </q-card-section>
        <q-card-section class="row justify-end">
          <q-btn no-caps flat class="" label="Cancel" v-close-popup />
          <q-btn
            no-caps
            flat
            class="text-white bg-teal-8 q-px-lg q-py-xs"
            label="Save"
            @click="updateOrganization()"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted } from "vue";
import { EmployeeApi, OrganizationApi, DesignationApi } from "src/api";
import { DocModel, EmployerModel } from "src/models";
import { capitalizeFirstLetter, underscoreToSpace } from "src/utils/textformat";
import { getDateWithFormat } from "src/utils/dateformat";

// session
const session = ref({ dbname: "attofund" });

// component-related
const organizationTree = ref([]);
const selected = ref("");
const filter = ref("");
const filterRef = ref(null);
const viewTab = ref("description");
const organizationMap = ref(new Map());
const employeeMap = ref(new Map());
const designationMap = ref(new Map());
const employeeList = ref([]);
const organizationOptions = ref([]); // for new organization directories
const addDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);

// models
const dbURLModel = <DocModel.IDBURL>ref({});
const docURLModel = <DocModel.IDocURL>ref({});
const docPaginationModel = <DocModel.IDocPagination>ref({});
const organizationModel = <EmployerModel.IOrganization>ref({}); // for forms
const organizationView = <EmployerModel.IOrganization>ref({}); // for rendering
const employeeDocsURLModel = <DocModel.IDocsURL>ref({});

export default {
  setup() {
    return {
      organizationTree,
      selected,
      filter,
      filterRef,
      viewTab,
      organizationMap,
      employeeMap,
      designationMap,
      employeeList,
      organizationOptions,
      organizationModel,
      organizationView,
      addDialog,
      editDialog,
      deleteDialog,
    };
  },
  data() {
    return {
      selectAll: false,
      individualChecks: {},
    };
  },
  methods: {
    callAddDialog() {
      addDialog.value = true;
      this.organizationModel = {
        organicationId: "",
        name: "",
        dateCreated: null,
        pic: null,
        description: null,
        dir: null,
        members: [],
      };
    },
    callEditDialog(
      key: string,
      _id: string,
      _name: string,
      _dateCreated: string,
      _pic: string,
      _description: string,
      _dir: string,
      _members: string[]
    ) {
      docURLModel.value.docid = key;
      this.organizationModel = {
        organizationId: _id,
        name: _name,
        dateCreated: _dateCreated,
        pic: _pic,
        description: _description,
        dir: _dir,
        members: _members,
      };
      editDialog.value = true;
    },
    callDeleteDialog(key: string) {
      docURLModel.value.docid = key;
      deleteDialog.value = true;
    },
    dataToOrganizationMap(name: string, org: any) {
      if (!organizationMap.value.has(name)) {
        organizationMap.value.set(name, org);
      }
    },
    mapToView: async function (name: string) {
      const newView = organizationMap.value.get(name);
      this.organizationView = newView;
    },
    mapToModel(name: string) {
      this.organizationModel = organizationMap.value.get(name);
    },
    mapToOptions() {
      organizationOptions.value = [];
      organizationMap.value.forEach((el) => {
        const option = {
          label: el.displayName,
          value: el.dir + el.name + "/",
        };
        organizationOptions.value.push(option);
      });
    },
    dataToEmployeeList(data: any) {
      // this method is component specific
      employeeList.value = [];
      data.body.rows.forEach((el) => {
        employeeList.value.push({
          label: el.value.givenName + " " + el.value.surname,
          value: el.key,
        });
        employeeMap.value.set(el.id, {
          givenName: el.value.givenName,
          surname: el.value.surname,
          designation: el.value.designation,
          joinDate: el.value.joinDate,
        });
      });
    },
    setUpOrganization: async function () {
      organizationMap.value.clear();
      const root = { label: "", key: "", children: [] }; // Root directory with special property
      const lookup = { "": root }; // Lookup table for directories

      dbURLModel.value = {
        dbname: session.value.dbname,
      };

      // Fetch the data
      const dataNew = await this.getAllOrganization();

      // Create a map of items by their full path for easy lookup
      const pathMap = new Map();
      dataNew.body.rows.forEach((item) => {
        const fullPath = item.value.dir + item.value.name + "/";
        pathMap.set(fullPath, item);
      });

      let unresolvedItems = [...dataNew.body.rows];

      while (unresolvedItems.length > 0) {
        const newUnresolvedItems = [];

        unresolvedItems.forEach((item) => {
          const { name, dir } = item.value;
          const fullPath = dir + name + "/";

          // Ensure the parent directory exists in the lookup
          if (!lookup[dir]) {
            newUnresolvedItems.push(item); // Parent not found, try again later
            return;
          }

          // Get the parent directory
          const parent = lookup[dir];

          // Create the new directory and add to lookup
          const newDir = {
            label:
              dir !== ""
                ? this.capitalizeFirstLetter(this.underscoreToSpace(name))
                : this.capitalizeFirstLetter(this.underscoreToSpace(name)) + " Executive",
            key: name,
            children: [],
          };

          // Add organizations into the map
          const orgData = {
            key: item.key,
            name: name,
            organizationId: item.value.organizationId,
            displayName:
              dir !== ""
                ? this.capitalizeFirstLetter(this.underscoreToSpace(name))
                : this.capitalizeFirstLetter(this.underscoreToSpace(name)) + " Executive",
            dateCreated: item.value.dateCreated,
            pic: item.value.pic,
            description: item.value.description,
            members: item.value.members,
            memberNumbers: item.value.members.length,
            dir: item.value.dir,
          };
          this.dataToOrganizationMap(name, orgData);

          // Check if it's the root directory
          if (dir === "") {
            newDir.icon = "las la-city";
            selected.value = name;
          }

          lookup[fullPath] = newDir;
          // Add the new directory to its parent's children
          parent.children.push(newDir);

          // Update the lookup table for the current directory
          lookup[dir + name + "/"] = newDir;
        });

        unresolvedItems = newUnresolvedItems;
      }

      this.mapToView(selected.value);
      this.mapToModel(selected.value);
      this.mapToOptions();
      organizationTree.value = root.children;
    },
    getDateWithFormat,
    capitalizeFirstLetter,
    underscoreToSpace,
    toggleSelectAll(value) {
      Object.keys(this.individualChecks).forEach((key) => {
        this.individualChecks[key] = value;
      });
    },
    checkIndividual() {
      this.checkSelectAll();
    },
    checkSelectAll() {
      const allChecked = Object.values(this.individualChecks).every(Boolean);
      if (allChecked) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
    },
    getAllEmployeeByNameJoindateDesignation: async function () {
      const res = await EmployeeApi.getAllEmployeeByNameJoindateDesignation(
        this.employeeDocsURLModel
      );
      return res;
    },
    getAllOrganization: async function () {
      const res = await OrganizationApi.getAllOrganization(dbURLModel.value);
      return res;
    },
    getAllDesignationByName: async function () {
      const res = await DesignationApi.getAllDesignationByName(dbURLModel.value);
      return res;
    },
    createOrganization: async function () {
      organizationModel.value.dir = organizationModel.value.dir.value;
      const res = await OrganizationApi.createOrganization(
        dbURLModel.value,
        organizationModel.value
      );
      this.setUpOrganization();
      return res;
    },
    updateOrganization: async function () {
      const res = await OrganizationApi.updateOrganization(
        docURLModel.value,
        organizationModel.value
      );
      this.setUpOrganization();
      return res;
    },
    removeOrganization: async function () {
      const res = await OrganizationApi.removeOrganization(docURLModel.value);
      this.setUpOrganization();
      return res;
    },
  },
  watch: {
    selected: function (newVal) {
      this.mapToView(newVal);
      this.mapToModel(newVal);
    },
    selectAll(newVal) {
      this.toggleSelectAll(newVal);
    },
    individualChecks: {
      handler(newVal) {
        this.checkSelectAll();
      },
      deep: true,
    },
  },
  mounted: async function mounted() {
    this.setUpOrganization();
    dbURLModel.value.dbname = session.value.dbname;
    docURLModel.value.dbname = session.value.dbname;

    // set params to query employees in an organization
    this.employeeDocsURLModel = {
      dbname: session.value.dbname,
      docs: this.organizationView.members,
    };
    // call employee getMany request
    const dataAllEmployee = await this.getAllEmployeeByNameJoindateDesignation();
    const dataAllDesignation = await this.getAllDesignationByName();

    dataAllDesignation.body.rows.forEach((el) => {
      designationMap.value.set(el.id, el.value.name);
    });
    // insert key-value into map models
    this.dataToEmployeeList(dataAllEmployee);
    this.individualChecks = {
      pic: false,
      ...Object.fromEntries(this.organizationView.members.map((el) => [el, false])),
    };
  },
};
</script>
