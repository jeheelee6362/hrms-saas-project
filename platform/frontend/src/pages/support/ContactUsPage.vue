<template>
    <q-page class="bg-white row">
        <div class="width-legal-ctt q-mx-auto q-my-xl">

            <section class="window-height">
                <div class="text-center text-caption q-mt-xl">DON'T BE A STRANGER</div>
                <div class="text-center q-pb-xl q-mb-xl">
                    <h1 class="text-h1 text-weight-bold q-ma-xs">WE ALWAYS STAY<br />WITH YOU</h1>
                </div>
                <section class="row q-pt-xl q-mt-xl">
                    <div class="col">
                        <div class="flex justify-center q-pb-lg">
                            <q-btn class="text-h4 text-blue-grey-8" outline round icon="las la-user-friends" />
                        </div>
                        <div class="text-center text-body1 text-weight-medium">General</div>
                    </div>
                    <div class="col">
                        <div class="flex justify-center q-pb-lg">
                            <q-btn class="text-h4 text-blue-grey-8" outline round icon="las la-landmark" />
                        </div>
                        <div class="text-center text-body1 text-weight-medium">Legal Issue</div>
                    </div>
                    <div class="col">
                        <div class="flex justify-center q-pb-lg">
                            <q-btn class="text-h4 text-blue-grey-8" outline round icon="las la-bug" />
                        </div>
                        <div class="text-center text-body1 text-weight-medium">Bug Report</div>
                    </div>
                    <div class="col">
                        <div class="flex justify-center q-pb-lg">
                            <q-btn class="text-h4 text-blue-grey-8" outline round icon="las la-ellipsis-h" />
                        </div>
                        <div class="text-center text-body1 text-weight-medium">Others</div>
                    </div>
                    <div class="col q-pl-lg">
                        <div class="text-body1 text-weight-regular q-pt-xl q-mt-lg">Or you may<br />contact us with</div>
                        <div>
                            <q-btn class="text-body1 text-weight-regular" outline flat no-caps dense 
                            icon="las la-long-arrow-alt-right" label="Direct Contact" />
                        </div>
                    </div>
                </section>
            </section>            

            <q-separator />
            <section class="q-py-xl q-my-xl">
                <div class="text-center text-caption">CONTACT FORM</div>
                <div class="text-center">
                    <h3 class="text-h2 text-weight-bold q-ma-xs">Connect with<br />our team of experts</h3>
                </div>
                <div class="q-mt-xl">
                    <q-form
                    @submit="onSubmit"
                    @reset="onReset"
                    class="row q-gutter-md justify-center"
                    >
                        <q-input
                        class="col-5"
                        v-model="name"
                        label="First Name *"
                        hint="First Name"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                        />
                        <q-input
                        class="col-5"
                        v-model="name"
                        label="Last Name *"
                        hint="Last Name"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                        />
                        <q-input
                        class="col-5"
                        v-model="email"
                        label="Business Email *"
                        hint="Business Email"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                        />
                        <q-input
                        class="col-5"
                        v-model="name"
                        label="Job Title *"
                        hint="Job Title"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                        />
                        <q-input
                        v-model="tel"
                        label="Phone Number *"
                        hint="Phone Number"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                        />
                        <q-input
                        v-model="name"
                        label="Business Name *"
                        hint="Business Name"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                        />
                        <q-input
                        class="col-5"
                        v-model="name"
                        label="Locations *"
                        hint="Locations"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                        >
                            <template v-slot:prepend>
                                <q-icon name="place" />
                            </template>
                        </q-input>
                    </q-form>
                </div>
            </section>

            <section class="bg-brown-1 q-pt-xl q-px-xl q-my-xl">
                <div>
                    <h3 class="q-ma-none text-h5 text-weight-bold">General Enquiry</h3>
                </div>
                <div class="text-uppercase text-body2 text-weight-medium q-mt-xl q-mb-sm">Contact</div>
                <div class="row">
                    <div class="col-2">Email:</div>
                    <div class="col-4">
                        <q-btn dense flat no-caps class="text-weight-light q-pa-none text-teal-8" label="press@attofund.com" />
                    </div>
                </div>
                <div class="row q-pb-xl q-mb-xl">
                    <div class="col-2">Phone:</div>
                    <div class="col-4">
                        <q-btn dense flat no-caps class="text-weight-light q-pa-none text-teal-8" label="+852 5985-9195" />
                    </div>
                </div>
            </section>

        </div>
    </q-page>
</template>

<script>
import { useMeta } from 'quasar'

const metaData = {
  title: 'Contact Us | Attofund'
}

export default {
  setup () {
    useMeta(metaData)
    return {
      
    }
  },
}
</script>