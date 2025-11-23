<template>
  <q-page class="bg-white row">
    <div class="width-responsive q-mx-auto">
      <section class="q-py-xl q-my-xl">
        <div class="q-mb-xl">
          <h1 class="text-h2 q-ma-none">Time & Attendance</h1>
        </div>
        <div class="text-body1">
          Automated time and attendance, enhanced productivity, and flexible
          system
        </div>
      </section>

      <section class="row q-py-xl q-my-xl">
        <div class="col-6">
          <div>
            <h3 class="text-h6">Effortless Time Tracking Solution</h3>
          </div>
          <div class="text-body1 q-mb-md">
            Are you tired of dealing with the time-consuming and error-prone
            attendance data entry? Introducing our seamless time tracking
            service, designed to simplify your workflow. With just a simple
            touch, record your presence effortlessly. Our system ensures
            accurate and reliable records, while prioritizing the security of
            your personal data.
          </div>
          <div class="text-body1">
            We handle all necessary inputs, including individual absences and
            related occasions. Say goodbye to manual record-keeping and
            experience the efficiency of our streamlined approach.
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
              <h3 class="text-h6">Real-Time Tracking</h3>
            </div>
            <div class="text-body1">
              Get instant access to real-time employee attendance information,
              enabling you to make informed decisions on scheduling and leave
              management.
            </div>
          </div>
        </section>
      </div>
    </div>

    <div class="width-responsive q-mx-auto">
      <section class="row q-py-xl q-my-xl">
        <div class="col-6">
          <div>
            <h3 class="text-h6">Seamless Integration</h3>
          </div>
          <div class="text-body1">
            Enjoy a unified system as our Time and Attendance feature seamlessly
            integrates with our payroll platform, reducing data entry tasks and
            ensuring compliance.
          </div>
        </div>
      </section>

      <section class="row q-py-xl q-my-xl">
        <div class="col-6">
          <div>
            <h3 class="text-h6">Customizable Work Rule</h3>
          </div>
          <div class="text-body1">
            Tailor the Time and Attendance feature to your company specific
            requirements by defining grace periods, break, and overtime
            threshholds to align with your company policies.
          </div>
        </div>
      </section>

      <section class="row q-py-xl q-my-xl">
        <div class="col-6"></div>
        <div class="col-6">
          <div>
            <h3 class="text-h6">Comprehensive Reporting and Analytics</h3>
          </div>
          <div class="text-body1">
            Generate in-depth reports and gain valuable insights into your
            workforce for data-driven decision-making.
          </div>
        </div>
      </section>
    </div>
  </q-page>
</template>

<script>
import { useMeta } from 'quasar';

const metaData = {
  title: 'Time & Attendance | Attofund',
};

export default {
  setup() {
    useMeta(metaData);
    return {};
  },
};
</script>
