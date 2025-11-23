<template>
    <q-page class="bg-white row">
        <div class="width-responsive q-mx-auto">
            <section class="row q-py-xl q-my-xl">
                <div class="col q-pr-xl">
                    <div>
                        <h1 class="text-h5 text-weight-regular q-ma-none">Team Attofund</h1>
                    </div>
                    <div class="text-body1 text-weight-regular q-my-lg">
                        Attofund is an ideal platform to offer economic while powerful services to businesses and their people 
                        who yearn for full of prosperity with indefinite talents. 
                        We are always trying to make our team to be harmonized with diverse expertises and new ideas. 
                        We will always work hard to make ideal working environment.
                    </div>
                    <div>
                        <q-btn no-caps color="black" label="Current open positions" />
                    </div>
                </div>
                <div class="col"></div>
            </section>
        </div>

        <div class="width-full bg-brown-1 q-py-xl">
            <div class="width-responsive q-py-xl q-mx-auto q-my-xl"></div>
        </div>

        <div class="width-responsive q-mx-auto">

            <section class="q-py-xl q-my-xl">
                <div class="row q-mb-xl">
                    <div class="col text-h5 text-weight-regular">Why work at Attofund?</div>
                    <div class="col"></div>
                </div>
                <div class="row">
                    <div class="col text-h6 text-weight-regular">We just began our humble journey.</div>
                    <div class="col text-body1 text-weight-light q-pr-xl">
                        Attofund is a new company launched in 2024. 
                        Since the beginning, we are looking for dedicated creative people to lead our company together. 
                        Our start is humble. 
                        But, our big dream is to let more businesses and their people to experience our profound service. 
                        Working at Attofund means more than being proud. 
                        That said we will share the joy of our beginning, growth, and success. 
                        Let's change the payroll paradigm.</div>
                </div>
                <div class="row q-my-md">
                    <div class="col text-h6 text-weight-regular">You can become a part of diverse creativities.</div>
                    <div class="col text-body1 text-weight-light q-pr-xl">
                        Diversity to us is not only about age, gender, religion, or ethnics. 
                        We will not use any quotas in our hiring. 
                        However, the personal story, experience, own belief or perspective is all that meaningful to us. 
                        We believe everyone is different. 
                        The beauty of diversity will bring creative and innovation. 
                        If you believe you have your own story, why not tell us about you? 
                        We are waiting to hear from you.
                    </div>
                </div>  
                <div class="row">
                    <div class="col text-h6 text-weight-regular">Lively work environment</div>
                    <div class="col text-body1 text-weight-light q-pr-xl">
                        Our associates as a body of our company work hard to shape ideal working environment. 
                        We will always think about how to fit in need of individual associate. 
                        We are also moving toward shortening work time and guaranteeing decent work and life balance 
                        including employees who are prospective parents. 
                        If you are interested, it's time for you to speak up.
                    </div>
                </div>    
            </section>

            <section class="q-my-xl">
                <div>Meet our team by person</div>
                <div>Meet Our Team ></div>
                <div>Learn about our mission and shared values</div>
                <div>About Attofund ></div>
            </section>

            <section class="q-my-xl">
                <div class="text-h3 text-weight-regular">Apply</div>
                <div class="text-h5 text-weight-regular text-teal-8 q-mt-xs">Open Positions</div>
            </section>

            <q-separator />
            <section class="q-py-xl q-my-xl">
                <div class="text-center text-body1 text-weight-light">
                    Are you interested to working at Attofund? 
                    You can send an inquiry about<br />our hiring through 
                    <q-btn dense flat no-caps class="text-weight-light q-pa-none text-teal-8" label="jobs@attofund.com" /> 
                </div>
            </section>

        </div>
    </q-page>
</template>

<script>
import { useMeta } from 'quasar'

const metaData = {
  title: 'Careers | Attofund'
}

export default {
  setup () {
    useMeta(metaData)
    return {
      
    }
  },
}
</script>