<template>
    <q-page class="flex justify-center items-center"
    style="background-image: linear-gradient(319deg, #263238 0%, #00796b 37%, #263238 100%);">
      
      <div class="bg-white q-pa-xl shadow-1" style="width: 400px">
        <q-form>
          <div class="text-body1 text-weight-light text-center q-px-lg q-mb-lg">
            Every minute, you are given a new chance.
          </div>
          <q-input 
          class="q-mb-xs"
          v-model="email" 
          type="email" 
          label="Email" 
          hint="Email" 
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input 
          class="q-mb-xs"
          v-model="email" 
          type="email" 
          label="Re-enter Email" 
          hint="Re-enter Email" 
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input 
          class="q-mb-xs"
          v-model="password" 
          :type="isPwd ? 'password' : 'text'" 
          label="Password" 
          hint="Password"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          >
            <template v-slot:append>
              <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input 
          class="q-mb-lg"
          v-model="password" 
          :type="isPwd ? 'password' : 'text'" 
          label="Re-enter Password" 
          hint="Re-enter Password"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          >
            <template v-slot:append>
              <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="text-caption text-weight-light q-mb-md">
            By signing up, you are agreeing to the 
            <q-btn class="text-caption text-weight-light text-teal-8 q-pa-none q-my-none" flat no-caps dense to="/policy/terms-of-service" target="_blank">Terms</q-btn> 
            , 
            <q-btn class="text-caption text-weight-light text-teal-8 q-pa-none q-my-none" flat no-caps dense to="/policy/privacy" target="_blank">Privacy Policy</q-btn>
            , and 
            <q-btn class="text-caption text-weight-light text-teal-8 q-pa-none q-my-none" flat no-caps dense to="/policy/cookie" target="_blank">Cookie Policy</q-btn>
          </div>
          <div>
            <q-btn no-caps size="md" label="Become Member" color="black" class="full-width q-mb-md"/>
          </div>
          <div>
            <q-btn class="text-caption text-weight-light q-pa-none" flat no-caps dense to="/login">I already have an Attofund membership</q-btn>
          </div>
        </q-form>
      </div>
        
      <div class="fixed-bottom-left window-width q-px-lg">
        <q-toolbar>
          <q-item to="/policy/privacy" class="text-caption text-weight-light text-white"><q-item-section>Privacy Policy</q-item-section></q-item>
          <q-item to="/policy/terms-of-service" class="text-caption text-weight-light text-white"><q-item-section>Terms of Service</q-item-section></q-item>
          <q-space></q-space>
          <span class="text-caption text-weight-light text-white">© 2024 Attofund. All Rights Reserved.</span>
        </q-toolbar>
      </div>
    </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { openURL, useMeta } from 'quasar'

const metaData = {
  title: 'Sign Up | Attofund'
}

export default {
  setup () {
    useMeta(metaData)
    return {
    }
  },
  data() {
    return {
        password: ref(''),
        isPwd: ref(true),
        email: ref(''),

    }
  }
}
</script>