<template>
  <q-page class="bg-white row q-py-xl">
    <div class="width-legal-ctt q-py-xl q-mx-auto q-my-xl">
      <section class="text-center q-py-xl q-my-xl">
        <h1 class="text-h1 text-weight-medium q-ma-none">Meet the team</h1>
      </section>

      <section class="row justify-around q-col-gutter-xl q-mt-xl">
        <!-- Photo Zone -->
        <div class="col-5">
          <div>
            <div class="q-my-md">
              <q-img src="team/seungheelee.png" />
            </div>
            <div class="text-h6">Sunny Lee</div>
            <div class="text-body1">COO & General Counsel</div>
            <div class="text-body1 q-my-md">
              Sunny's favorite menu is sunny side-up, not because of her name.
              Sunny loves education since very young and knows how to deal with
              naughty children. This does not mean she loves dealing with
              naughty adults. Most surprisingly, sunny possesses a law degree
              but her future is broader than restricted to law.
            </div>
          </div>
        </div>

        <div class="col-5">
          <div>
            <div class="q-my-md">
              <q-img src="team/jeheelee.png" />
            </div>
            <div class="text-h6">Jehee Lee</div>
            <div class="text-body1">Chief Executive Officer</div>
            <div class="text-body1 q-my-md">
              Having self-learned programming for 8 years, Jehee is responsible
              for software development and guiding the team. After receiving his
              first monthly intern salary, he decided to launch Attofund that
              provides ISync (similar to EWA) solution. Jehee loves world
              history and belives in fatalism. Ask him what happened in 264 BCE.
            </div>
          </div>
        </div>
      </section>
    </div>
  </q-page>
</template>

<script>
import { useMeta } from 'quasar';

const metaData = {
  title: 'Our Team | Attofund',
};

export default {
  setup() {
    useMeta(metaData);
    return {};
  },
};
</script>
