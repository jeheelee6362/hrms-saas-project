<template>
  <q-page class="bg-white row">
    <div class="width-responsive q-mx-auto">
      <section class="q-py-xl q-my-xl">
        <div class="q-mb-xl">
          <h1 class="text-h2 q-ma-none">Income Synchronization</h1>
        </div>
        <div class="text-body1">
          Synchronize employee bank account balance with their work time
        </div>
      </section>

      <section class="q-py-xl q-my-xl">
        <div>
          <h3 class="text-h6">What is Income Synchronization (ISync)?</h3>
        </div>
        <div class="row">
          <div class="col-6 text-body1">
            ISync is a way of payroll that allows employees setting their pay
            frequency from monthly to even every minute. Regardless of local
            jurisdictions, individual employees can adjust their income pay
            frequency with their spending patterns.
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6 text-body1">
            ISync will change the economic landscape of where we live.
          </div>
        </div>
      </section>
    </div>

    <div class="width-full bg-brown-1 q-my-xl">
      <div class="width-responsive q-py-xl q-my-xl">
        <section class="row">
          <div class="col-6"></div>
          <div class="col-6">
            <div>
              <h3 class="text-h6">Considering Earned Wage Access?</h3>
            </div>
            <div class="text-body1 q-mb-md">
              In a broader term, ISync is classified as Earned Wage Access
              (EWA). However, unlike traditional EWA services, individuals would
              not have to request for their earned income every time they need
              it. What an inconveniency!
            </div>
            <div class="text-body1 q-mb-md">
              Instead, individuals will be paid in their set frequency maybe
              every minute, as if we receive our salary every month.
            </div>
            <div class="text-body1">
              While EWA usually allows employees to access half of their earned
              income, ISync can wholely synchronize the earned income to their
              bank account balance.
            </div>
          </div>
        </section>
      </div>
    </div>

    <div class="width-responsive q-mx-auto">
      <section class="q-py-xl q-my-xl">
        <div class="text-center">
          <h3 class="text-h3">Why ISync</h3>
        </div>
        <div class="row q-col-gutter-xl">
          <div class="col">
            <div class="text-center text-subtitle1 text-weight-medium">
              Employee productivity and loyalty
            </div>
            <div class="text-center text-body1 q-mt-md">
              Increase employee retention and productivity.<br />
              Not just eliminating their financial distress, but constantly
              rewarding them.
            </div>
          </div>
          <div class="col">
            <div class="text-center text-subtitle1 text-weight-medium">
              Readily available service
            </div>
            <div class="text-center text-body1 q-mt-md">
              With our payroll service, no need for manual integration. ISync is
              serviced based on our payroll calculations. And no delay for
              payment.
            </div>
          </div>
          <div class="col">
            <div class="text-center text-subtitle1 text-weight-medium">
              Consistenly low prices
            </div>
            <div class="text-center text-body1 q-mt-md">
              Charging the set up fee or access fee?<br />
              ISync only charges 0.5% of the prepaid salaries.
            </div>
          </div>
        </div>
      </section>

      <section class="row q-py-xl q-my-xl">
        <div class="flex col-6 justify-center items-center">
          <h3 class="text-h3">More about ISync</h3>
        </div>
        <div class="col-6">
          <div class="text-body1">How to implement ISync?</div>
          <div class="text-body1">
            How to track and manage employees' ISync?
          </div>
          <div class="text-body1">I want to customize my pay frequency</div>
        </div>
      </section>
    </div>
  </q-page>
</template>

<script>
import { useMeta } from 'quasar';

const metaData = {
  title: 'Income Synchronization | Attofund',
};

export default {
  setup() {
    useMeta(metaData);
    return {};
  },
};
</script>
