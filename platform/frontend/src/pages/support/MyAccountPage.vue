<template>
    <q-page class="bg-white row">
        <div class="width-legal-ctt q-mx-auto">

            <section class="q-my-xl">
                <div>Your Account</div>
            </section>
            
            <section class="q-my-xl">
                <div>Your Group</div>
            </section>

            <section class="q-my-xl">
                <div>Your Profiles</div>
            </section>

            <section class="q-my-xl">
                <div>Login & Security</div>
            </section>

            <section class="q-my-xl">
                <div>Premium</div>
            </section>

            <section class="q-my-xl">
                <div>Your Payments</div>
            </section>

            <section class="q-my-xl">
                <div>Your Records</div>
            </section>

            <section class="q-my-xl">
                <div>Customer Service</div>
            </section>

            <q-separator />
            <section class="q-my-xl">
                <div>Sign In</div>
            </section>

        </div>
    </q-page>
</template>

<script>
import { useMeta } from 'quasar'

const metaData = {
  title: 'Your Account | Attofund'
}

export default {
  setup () {
    useMeta(metaData)
    return {
      
    }
  },
}
</script>