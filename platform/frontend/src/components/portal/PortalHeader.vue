<template>
  <q-header class="bg-black" elevated ref="headerRef">
    <q-toolbar class="q-pl-none">
      <q-item clickable class="q-pa-none">
        <q-item-section avatar class="flex items-center q-pa-none">
          <q-img
            src="favicon.png"
            width="36px"
            height="36px"
            fit="fill"
            style="filter: invert(1) brightness(10)"
          />
        </q-item-section>
      </q-item>

      <div class="row items-center">
        <q-toolbar-title class="text-subtitle1 q-ma-none"
          >Attofund People</q-toolbar-title
        >
        <q-input
          dark
          dense
          standout
          v-model="text"
          input-class="text-left"
          class="q-ml-md float-left"
        >
          <template v-slot:prepend>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>
      </div>

      <q-space />
      <q-btn
        class="q-mx-xs"
        flat
        round
        size="sm"
        color="primary"
        icon="las la-bell"
        @click="callNotification"
      >
        <q-badge color="red" rounded floating />
      </q-btn>
      <q-btn class="q-mx-xs" flat round size="sm" color="primary" icon="las la-cog" />
      <q-item clickable v-ripple>
        <q-item-section class="q-pr-xs">
          <q-item-label class="text-white text-weight-medium text-caption"
            >Jehee Lee</q-item-label
          >
        </q-item-section>
        <q-item-section side>
          <q-avatar round size="32px"
            ><img src="https://cdn.quasar.dev/img/avatar.png"
          /></q-avatar>
        </q-item-section>

        <q-popup-proxy :offset="[0, 0]">
          <q-card class="q-pa-md" style="width: 280px">
            <q-item class="flex justify-center" clickable
              ><div class="column items-center">
                <q-avatar round size="52px"
                  ><img src="https://cdn.quasar.dev/img/avatar.png"
                /></q-avatar>
                <div class="q-ml-xs text-body2">Manage Account</div>
              </div></q-item
            >
            <q-card>
              <q-item clickable
                ><div class="row items-center">
                  <q-icon name="las la-history" size="xs" /><span
                    class="q-ml-sm text-body2"
                    >Activity Log</span
                  >
                </div></q-item
              >
              <q-item clickable
                ><div class="row items-center">
                  <q-icon name="las la-sign-out-alt" size="xs" /><span
                    class="q-ml-sm text-body2"
                    >Sign Out</span
                  >
                </div></q-item
              >
              <q-separator />
              <q-item clickable
                ><div class="row items-center">
                  <q-icon name="las la-question-circle" size="xs" /><span
                    class="q-ml-sm text-body2"
                    >Help</span
                  >
                </div></q-item
              >
            </q-card>
            <card class="row justify-center q-gutter-x-sm q-mt-xs">
              <span class="text-caption">Privacy Policy</span>
              <span class="text-caption">Terms of Use</span>
              <span class="text-caption">Data Protection Policy</span>
            </card>
          </q-card>
        </q-popup-proxy>
      </q-item>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { ref } from "vue";
import { portalUIStore } from "src/stores/store";

const ui_store = portalUIStore();

export default {
  setup() {
    return {
      text: ref(""),
    };
  },
  methods: {
    callNotification() {
      ui_store.toggleNotification();
    },
  },
};
</script>
