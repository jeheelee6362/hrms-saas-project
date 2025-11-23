<template>
    <q-page class="bg-white q-py-xl row">
        <div class="width-legal-ctt q-mx-auto">
            <section class="q-pb-lg q-mt-md q-mb-xl">
                <div>
                    <h1 class="text-center text-h3 text-weight-medium">Legal</h1>
                </div>
                <div class="text-center">Lorem itso lorem iso itso lorem iso itso lorem iso</div>
            </section>

            <section class="row q-col-gutter-lg q-my-xl">
                <div class="col text-center text-caption text-weight-light q-my-md">
                    <div class="q-mb-md">
                        <q-img 
                        src="https://picsum.photos/500/300"
                        :ratio="1/1"
                        />
                    </div>
                    <q-btn to="/policy/terms-of-service" no-caps flat dense class="text-caption text-weight-medium text-teal-8" label="Attofund Terms of Service" />
                    <br />rules and guidelines for using our platform or services.
                </div>
                <div class="col text-center text-caption text-weight-light q-my-md">
                    <div class="q-mb-md">
                        <q-img 
                        src="https://picsum.photos/500/300"
                        :ratio="1/1"
                        />
                    </div>
                    <q-btn to="/policy/cookie" no-caps flat dense class="text-caption text-weight-medium text-teal-8" label="Cookie Policy" />
                    <br />information about our use of cookies.
                </div>
                <div class="col text-center text-caption text-weight-light q-my-md">
                    <div class="q-mb-md">
                        <q-img 
                        src="https://picsum.photos/500/300"
                        :ratio="1/1"
                        />
                    </div>
                    <q-btn to="/policy/data-protection" no-caps flat dense class="text-caption text-weight-medium text-teal-8" label="Data Protection Policy" />
                    <br />guidelines for securing and processing user data.
                </div>
                <div class="col text-center text-caption text-weight-light q-my-md">
                    <div class="q-mb-md">
                        <q-img 
                        src="https://picsum.photos/500/300"
                        :ratio="1/1"
                        />
                    </div>
                    <q-btn to="/policy/privacy" no-caps flat dense class="text-caption text-weight-medium text-teal-8" label="Privacy Policy" />
                    <br />how we collect, use, and protect personal information.
                </div>
            </section>
        </div>
    </q-page>
</template>

<script>
import { useMeta } from 'quasar'

const metaData = {
  title: 'Legal | Attofund'
}

export default {
  setup () {
    useMeta(metaData)
    return {
      
    }
  },
}
</script>