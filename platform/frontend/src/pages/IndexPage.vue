<template>
  <q-page class="bg-white row">
    <div class="window-width window-height q-pb-xl q-mb-xl">
      <q-parallax class="fit" :speed="1">
      <template v-slot:media> 
      <img src="attofund_background_main.jpg" style="background-size: cover !important;"> 
      </template>
        <template v-slot:content="scope">
          <div
            class="absolute column items-center"
            :style="{
              top: scope.percentScrolled * 70 + '%',
              left: 0,
              right: 0,
            }"
          >
            <h1
              class="text-h1 text-weight-bold text-black text-italic text-uppercase q-ma-none"
              style="opacity: 0.3"
            >
              Attofunded
            </h1>
          </div>

          <div
            class="absolute column items-center"
            :style="{
              top: scope.percentScrolled * 71 + '%',
              left: 0,
              right: 0,
            }"
          >
            <h1
              class="text-h1 text-weight-bold text-white text-uppercase q-ma-none"
            >
              Attofunded
            </h1>
          </div>
        </template>
      </q-parallax>
    </div>

    <div class="width-responsive q-mx-auto q-mt-xl">
      <section class="q-col-gutter-md row items-start q-my-sm">
        <div class="col-4"></div>
        <div class="col-8">
          <h1 class="text-h1 text-weight-regular text-uppercase q-ma-none">
            Way<br />the payroll should be
          </h1>
        </div>
      </section>

      <section class="q-col-gutter-xl row items-start q-mt-sm q-pb-xl q-mb-xl">
        <div class="col-7">
          <q-img src="https://picsum.photos/500/300" :ratio="16 / 9" />
        </div>
        <div class="col-4 text-body1">
          <div class="q-mt-xs q-mb-md">
            Hello there! We Attofund, or your Attofund, believe that payroll
            operation should not be a burden.
          </div>
          <div class="q-my-md">
            We offer free digital payroll services that cover general payroll
            operations, time and attendance tracking, and tax compliance. As
            easy as using a free mobile calculator app or browsing our website.
            This is especially beneficial for new companies with limited payroll
            budgets.
          </div>
          <div class="q-my-md">
            For companies where employee satisfaction and retention are
            important, consider using our premium service, Income
            Synchronization (ISync).
          </div>
          <div class="q-mt-lg">
            <q-btn
              to="/get-to-know-us/about"
              dense
              flat
              no-caps
              class="q-pa-none text-weight-light"
              icon="las la-long-arrow-alt-right"
              label="Learn about Attofund"
            /><br />
            <q-btn
              to="/get-to-know-us/income-sync"
              dense
              flat
              no-caps
              class="q-pa-none text-weight-light"
              icon="las la-long-arrow-alt-right"
              label="What is Income Synchronization?"
            />
          </div>
        </div>
      </section>

      <section class="q-my-xl q-py-xl">
        <div class="q-col-gutter-md row items-start q-my-md">
          <div class="col-4 text-body2 text-thin q-pt-xl">SERVICES</div>
          <div class="col-8">
            <h2 class="text-h2 text-weight-regular q-ma-none">
              Happy business and people<br />absolutely low prices.
            </h2>
          </div>
        </div>
        <div class="q-col-gutter-md row items-start q-my-xl">
          <div class="col-4"></div>
          <div class="row wrap col-8">
            <div class="col-6">
              <h6 class="text-h6 text-weight-regular q-ma-none">
                Accurate and effortless payroll
              </h6>
              <div class="text-body1 text-weight-light q-my-md q-pr-xl">
                Unlock your employee potential through our Income
                Synchronization. It's a premium feature that employees can set
                and be paid within their set frequency.
              </div>
            </div>
            <div class="col-6">
              <h6 class="text-h6 text-weight-regular q-ma-none">
                Time and attendance tracking
              </h6>
              <div class="text-body1 text-weight-light q-my-md q-pr-xl">
                Unlock your employee potential through our Income
                Synchronization. It's a premium feature that employees can set
                and be paid within their set frequency.
              </div>
            </div>
            <div class="col-6">
              <h6 class="text-h6 text-weight-regular q-ma-none">
                Automatic tax calculation
              </h6>
              <div class="text-body1 text-weight-light q-my-md q-pr-xl">
                Unlock your employee potential through our Income
                Synchronization. It's a premium feature that employees can set
                and be paid within their set frequency.
              </div>
            </div>
            <div class="col-6">
              <h6 class="text-h6 text-weight-regular q-ma-none">
                Customizable pay frequency
              </h6>
              <div class="text-body1 text-weight-light q-my-md q-pr-xl">
                Unlock your employee potential through our Income
                Synchronization. It's a premium feature that employees can set
                and be paid within their set frequency.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="width-full bg-brown-1 q-py-xl">
      <div class="width-responsive q-mx-auto q-py-xl">
        <section class="q-col-gutter-md row items-start justify-around q-my-md">
          <div class="col-6">
            <div class="text-body2 text-weight-medium text-uppercase q-mb-md">
              How to guide
            </div>
            <h2 class="text-h2 text-weight-regular q-ma-none">
              Creating your group with ease
            </h2>
            <div class="text-body1 text-weight-light q-mt-lg">
              Lorem ipsum dolor it amet, consecteur adipiscing elit.
            </div>
          </div>
          <div class="col-5">
            <q-img src="https://picsum.photos/500/300" :ratio="16 / 9" />
          </div>
        </section>
      </div>
    </div>

    <div class="width-responsive q-mx-auto q-my-xl q-py-xl">
      <section
        class="q-col-gutter-md row items-start justify-between q-mt-sm q-mb-xl"
      >
        <div class="col-4">
          <h2 class="text-h2 text-weight-regular q-ma-none">
            Frequently<br />Asked<br />Questions
          </h2>
        </div>
        <div class="col-7">
          <section>
            <div class="text-body1 q-pa-sm">What is Attofund?</div>
            <q-separator />
            <div class="text-body1 q-pa-sm">Why we should use Attofund?</div>
            <q-separator />
            <div class="text-body1 q-pa-sm">
              What are the available services?
            </div>
            <q-separator />
            <div class="text-body1 q-pa-sm">What are the fees?</div>
            <q-separator />
            <div class="text-body1 q-pa-sm">
              Why do people use income synchronization?
            </div>
            <q-separator />
          </section>
        </div>
      </section>
    </div>

    <div class="width-full bg-brown-1 q-py-xl">
      <div class="width-responsive q-mx-auto q-pt-xl q-pb-lg">
        <section class="text-center q-my-md">
          <h2 class="text-h2 text-weight-regular q-ma-none">
            And together with...
          </h2>
        </section>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useMeta } from 'quasar';

const metaData = {
  title: 'Attofund | Payroll Service',
};

export default {
  setup() {
    useMeta(metaData);
    return {};
  },
};
</script>
