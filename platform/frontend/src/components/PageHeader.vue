<template>
  <q-header id="home-header" class="blur-12" ref="headerRef">
    <q-toolbar class="q-mx-auto">
      <q-tabs
        v-click-outside="hideDropdown"
        shrink
        stretch
        indicator-color="black"
        class="text-black"
      >
        <q-tab
          v-for="menu in menuList"
          class="q-py-sm"
          no-caps
          :key="menu.name"
          :label="menu.subject"
          @click="clickTab(menu.name)"
        />
        <div
          v-if="showMenu === true"
          class="width-full bg-white fixed-top-left"
          :style="posXMenu"
        >
          <q-separator />
          <q-toolbar class="width-responsive q-mx-auto q-pt-sm q-pb-xl">
            <q-list>
              <q-item class="text-caption text-black q-px-lg"
                ><q-item-section>{{ getDropdown()?.subject }}</q-item-section></q-item
              >
              <q-item
                v-for="(item, index) in getDropdown()?.items"
                :key="index"
                dense
                clickable
                class="text-black text-weight-regular q-mx-sm"
              >
                <q-item-section>
                  <div>
                    {{ item }}
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-toolbar>
        </div>
      </q-tabs>
      <q-toolbar-title class="absolute-center" :shrink="titleShrink">
        <q-item to="/">
          <q-img
            src="logo_title.png"
            width="110px"
            height="28px"
            fit="fill"
            style="
              filter: invert(90%) sepia(99%) saturate(408%) hue-rotate(4deg)
                brightness(36%) contrast(62%);
            "
          />
        </q-item>
      </q-toolbar-title>
      <q-space />
      <q-btn unelevated round size="md" class="text-black q-mr-sm" icon="search" />
      <q-btn
        to="/login"
        target="_blank"
        flat
        rounded
        no-caps
        label="Sign In"
        class="text-black bg-amber-12"
      />
      <q-separator vertical spaced="lg" />
      <q-btn unelevated round size="md" class="text-black" icon="language" />
      <q-btn unelevated round size="md" class="text-black" icon="brightness_low" />
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { QHeader } from "quasar";
import { VueElement, ref } from "vue";
import { DirectiveBinding } from "vue";

const titleShrink = ref(true);
const headerRef = ref<InstanceType<typeof QHeader> | null>(null);
const currentMenu = ref("");

export default {
  setup() {
    return {
      titleShrink,
      headerRef,
    };
  },
  data() {
    return {
      posXMenu: {},
      menuList: [
        {
          subject: "Our Service",
          name: "services",
          items: [
            "Payroll",
            "Time and Attendance",
            "Benefits",
            "Tax Compliance",
            "Pricing",
          ],
        },
        { subject: "Why Attofund", name: "attofund" },
        {
          subject: "About",
          name: "about",
          items: [
            "Our Company",
            "Career",
            "Investors",
            "Media and Press",
            "Data Security",
          ],
        },
        {
          subject: "Resources",
          name: "resources",
          items: ["Blog", "Features", "FAQs", "Contact Us"],
        },
      ],
      currentMenu,
      showMenu: ref(false),
    };
  },
  directives: {
    clickOutside: {
      beforeMount: (el: any, binding: DirectiveBinding) => {
        el.__clickOutsideEvent__ = (event: Event) => {
          if (!(el == event.target || el.contains(event.target as Node))) {
            binding.value();
          }
        };
        document.addEventListener("click", el.__clickOutsideEvent__);
      },
      unmounted: (el: any) => {
        document.removeEventListener("click", el.__clickOutsideEvent__);
      },
    },
  },
  methods: {
    positionDropdown() {
      var headerHeight: string =
        headerRef.value !== null ? headerRef.value.$el.clientHeight + "px" : "0px";
      this.posXMenu = "top:" + headerHeight;
    },
    clickTab(sub: string) {
      if (sub !== "attofund" && this.showMenu == false) {
        this.showMenu = true;
      } else if (sub === "attofund" || currentMenu.value === sub) {
        this.showMenu = false;
      }
      currentMenu.value = sub;
    },
    getDropdown() {
      return this.menuList.find((li) => li.name === currentMenu.value);
    },
    hideDropdown() {
      if (this.showMenu === true) {
        this.showMenu = false;
      }
    },
  },
  mounted() {
    this.positionDropdown();
  },
};
</script>
