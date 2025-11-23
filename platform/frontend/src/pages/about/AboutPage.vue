<template>
  <q-page class="bg-white row">
    <div class="width-responsive q-mx-auto">
      <section class="row q-py-xl q-my-xl">
        <div class="col">
          <h1 class="text-h1 text-weight-medium q-ma-none">About</h1>
        </div>
        <div class="col text-h4 text-weight-bold">
          Founded in 2024 by Jehee Lee, Attofund has the mission to empower
          organizations to cultivate environments that foster employee
          well-being making them admirable workplaces.
        </div>
      </section>

      <q-separator color="black" />
      <section class="row justify-around q-py-xl q-my-xl">
        <div class="col-4">
          <h2 class="text-h2 text-weight-regular q-ma-none">Attofund Values</h2>
        </div>
        <div class="col-7">
          <h6 class="text-h6 text-weight-medium q-ma-none">
            Contribution, Stewardship, Security.
          </h6>
          <div class="text-body1 text-weight-regular q-mt-md">
            All our associates with different fields of expertise contribute
            with full potential to ensure the purpose of our existence. We are
            dedicated personnel to delivering excellent service. Customer
            challenge is our challenge. We maintain the highest level of
            security measures to ensure our client's utmost confidentiality and
            privacy.
          </div>
        </div>
      </section>

      <q-separator color="black" />
      <section class="row q-py-xl q-my-xl">
        <div class="relative-position col q-pr-xl">
          <div>
            <h2 class="text-h2 text-weight-medium q-ma-none">What We do</h2>
          </div>
          <div class="text-h6 q-mt-lg">
            Attofund is a Hong Kong-based payroll service provider, offering
            efficient and cost-effective payroll solutions. Our goal is to
            simplify payroll management and ensure timely and accurate
            processing. We prioritize employee satisfaction and offer income
            synchronization options for financial flexibility.
          </div>
          <div class="q-mt-xl">
            <q-btn
              to="/get-to-know-us/our-team"
              no-caps
              color="black"
              class="absolute-bottom-left"
              label="Meet Our Team"
            />
          </div>
        </div>
        <div class="col">
          <q-img src="https://picsum.photos/500/300" :ratio="1 / 1" />
        </div>
      </section>
    </div>

    <div class="width-full bg-brown-1 q-py-xl q-my-xl">
      <div class="width-responsive q-mx-auto q-py-xl">
        <section
          class="q-col-gutter-xl row items-start justify-around q-mt-md q-mb-xl"
        >
          <div class="col">
            <q-img src="https://picsum.photos/500/300" :ratio="16 / 12" />
          </div>
          <div class="col">
            <div
              class="text-body2 text-weight-medium text-uppercase q-pt-xl q-mb-md"
            >
              What's special
            </div>
            <h2 class="text-h2 text-weight-regular q-ma-none">
              Secure with<br />Blockchain
            </h2>
            <div class="text-body1 text-weight-regular q-pr-lg q-mt-lg">
              Our general payroll service is highly secure as we leverage the
              power of private blockchain technology to handle and protect our
              clients' HR data.
            </div>
          </div>
        </section>
        <section
          class="q-col-gutter-xl row items-start justify-around q-py-xl q-my-xl"
        >
          <div class="col">
            <h2 class="text-h2 text-weight-regular q-pt-xl q-ma-none">
              Full Access to<br />Earned Income
            </h2>
            <div class="text-body1 text-weight-regular q-pr-lg q-mt-lg">
              Our income synchronization service is exceptionally fast, allowing
              employees to have full control over their salary pay frequency and
              receive timely payments according to their preferences.
            </div>
          </div>
          <div class="col">
            <q-img src="https://picsum.photos/500/300" :ratio="16 / 12" />
          </div>
        </section>
        <section
          class="q-col-gutter-xl row items-start justify-around q-mt-xl q-mb-md"
        >
          <div class="col">
            <q-img src="https://picsum.photos/500/300" :ratio="16 / 12" />
          </div>
          <div class="col">
            <h2 class="text-h2 text-weight-regular q-pt-xl q-ma-none">
              Consistently<br />Low Prices
            </h2>
            <div class="text-body1 text-weight-regular q-pr-lg q-mt-lg">
              When it comes to cost-efficiency, our overall payroll service
              stands out as we offer competitive service fees that are
              significantly lower than those charged by other payroll service
              providers.
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class="width-responsive q-py-xl q-mx-auto q-my-xl">
      <section class="row justify-around q-py-xl q-my-xl">
        <div class="col-4">
          <h2 class="text-h2 text-weight-regular q-ma-none">
            For Press and<br />Investors
          </h2>
        </div>
        <div class="col-7">
          <div class="text-body1 text-weight-regular q-mt-md">
            Are you interested in our company and want to get to know more?
            Check our media center page for brand resources, achievements, and
            investment availability.
          </div>
          <div class="q-mt-lg">
            <q-btn
              to="/more/media-center"
              dense
              flat
              no-caps
              class="q-pa-none text-weight-light"
              icon="las la-long-arrow-alt-right"
              label="Browse the resources for Media and Press"
            /><br />
            <q-btn
              to="/more/investor"
              dense
              flat
              no-caps
              class="q-pa-none text-weight-light"
              icon="las la-long-arrow-alt-right"
              label="Attofund Investor Relations"
            />
          </div>
        </div>
      </section>
    </div>
  </q-page>
</template>

<script>
import { useMeta } from 'quasar';

const metaData = {
  title: 'About Attofund | Attofund',
};

export default {
  setup() {
    useMeta(metaData);
    return {};
  },
};
</script>
