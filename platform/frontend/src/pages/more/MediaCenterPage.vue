<template>
    <q-page class="bg-white row">
        <div class="width-responsive q-mx-auto">
            <section class="q-py-xl q-my-xl">
                <div>
                    <h1 class="text-h1 text-weight-medium q-pt-xl q-ma-none">Media Center</h1>
                    <div class="row q-mt-xl">
                        <div class="col text-weight-light text-body1">
                            Are you a member of the press who is going to write an article about Attofund or our services? 
                            Welcome, this is our Media Center page. 
                            You can grasp the concept of our service idea in About or FAQ page, and then get brand resources on this page. 
                            If you have a question which you did not find an answer on our website, ask us through 
                            <q-btn dense flat no-caps class="text-weight-light q-pa-none text-teal-8" label="press@attofund.com" />.
                            <div class="text-h5 q-mt-lg">
                                Attofund will change the perspective on how people think about payroll operations and working environments in the very coming future.
                            </div>
                        </div>
                        <div class="col"></div>
                    </div>
                </div>
            </section>
        </div>

        <div class="width-full bg-brown-1 q-pt-lg q-pb-xl q-my-xl">
            <div class="width-responsive q-mx-auto">
                <section class="text-center q-my-xl">
                    <div class="text-h5 text-weight-bold">Started your research?</div>
                    <div>
                        <h2 class="text-h2 text-weight-medium q-pt-md q-pb-xl q-ma-none">
                            <span class="text-teal-8">Here</span> is the brief information for <span class="text-teal-8">you</span>
                        </h2>
                    </div>
                    <div class="text-weight-regular text-body1">Founded in December 2024</div>
                    <div class="text-weight-regular text-body1">Is a Hong Kong based payroll service provider</div>
                    <div class="q-mt-md">
                        <div class="text-weight-light text-caption">Accurate and flexible payroll,</div>
                        <div class="text-weight-light text-caption">still much lower prices</div>
                    </div>
                </section>
            </div>
        </div>

        <div class="width-responsive q-mx-auto">
            <section class="row q-py-xl q-my-xl">
                <div class="col"></div>
                <div class="col">
                    <div class="text-h5 q-mb-md">Attofund Basics</div>
                    <div>What is Attofund?</div>
                    <div class="q-mt-lg">
                        <q-btn to="/get-to-know-us/our-team" no-caps color="black" label="For more FAQs" />
                    </div>
                </div>
            </section>

            <section class="row q-py-xl q-my-xl">
                <div class="col">
                    <div class="text-h5 q-mb-md">Attofund Brand Assets</div>
                    <div class="text-weight-light text-body1">
                    Looking to download a company logo and other brand assets for your article? 
                    <br />You can download the relevant materials on this page.
                    </div>
                    <div class="q-mt-lg">
                        <q-btn to="/get-to-know-us/our-team" no-caps color="black" label="Download" />
                    </div>
                </div>
                <div class="col"></div>
            </section>

        </div>
    </q-page>
</template>

<script>
import { useMeta } from 'quasar'

const metaData = {
  title: 'Media and Press Center | Attofund'
}

export default {
  setup () {
    useMeta(metaData)
    return {
      
    }
  },
}
</script>