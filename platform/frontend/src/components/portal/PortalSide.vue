<template>
  <q-drawer
    v-model="ui_store.notification"
    side="right"
    :width="275"
    :breakpoint="500"
    class="bg-grey-2"
    bordered
    elevated
  >
    <q-scroll-area class="fit">
      <q-list>
        <q-item-label class="text-black" header>Notifications</q-item-label>

        <q-item class="q-my-sm" clickable v-ripple v-for="i in 20" :key="i">
          <q-item-section avatar>
            <q-avatar class="bg-purple-8" text-color="white"> J </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label
              ><strong class="text-grey-9">Jehee Lee</strong
              ><span
                class="text-weight-regular text-grey-7 q-ml-xs"
                style="font-size: 10px"
                >· Aug 08 at 6:45 PM</span
              ></q-item-label
            >
            <q-item-label class="text-grey-10" caption lines="1"
              >Sent you personal information</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts">
import { ref } from "vue";
import { portalUIStore } from "src/stores/store";

const ui_store = portalUIStore();

export default {
  setup() {
    return {
      ui_store,
    };
  },
  data() {
    return {};
  },
};
</script>
