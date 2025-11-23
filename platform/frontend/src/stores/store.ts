import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});

export const portalUIStore = defineStore('', {
  state: () => ({
    notification: false,
  }),
  getters: {
  },
  actions: {
    toggleNotification() {
      this.notification = !this.notification
    }
  }
})

export const portalRouterStore = defineStore('', {
  state: () => {
    return {
      empTab: null as string | null,
      payTab: null as string | null,
      tatTab: null as string | null,
      repTab: null as string | null,
      //
      viewEmployeeId: null as string | null,
      viewLeavePolicyId: null as string | null
    }
  },
  getters: {
  },
  actions: {
  }
})