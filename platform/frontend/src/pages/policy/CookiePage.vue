<template>
    <q-page class="bg-white q-py-xl row">
      <div class="width-legal-ctt q-mx-auto">
        <div class="q-py-xl">
          <h1 class="text-h3 text-weight-medium text-center q-mb-xl">Cookie Policy</h1>
          <p class="text-body2 text-weight-regular text-italic float-right">Effective date: December 24, 2024</p>
        </div>
        <q-separator />

        <section>
          <h3 class="text-h6 text-weight-medium">Topics</h3>
          <ul>
            <li class="text-subtitle1 text-weight-medium legal-tocli">What are cookies</li>
            <li class="text-subtitle1 text-weight-medium legal-tocli">Our use of cookies</li>
            <li class="text-subtitle1 text-weight-medium legal-tocli">Do not track</li>
            <li class="text-subtitle1 text-weight-medium legal-tocli">For more</li>
          </ul>
        </section>

        <section>
          <h3 class="text-h6 text-weight-medium">01. What are cookies</h3>
          <p class="text-body1 text-weight-regular">
          Cookies are small pieces of text that are issued to your device when you visit our website. Those small pieces of text and other tracking technologies we use enable us to learn your interaction with our website. It may contain your action or preferences on our website for a specific period of time so you do not have to re-enter your login detail or settings every time you visit a new page on our website. In this policy, we refer to all of these technologies as “cookies.”
          </p>
          <p class="text-body1 text-weight-regular">
          You can choose to turn off all cookies if you do not want this. However, this will disable many of the features we provide to enhance web browser experience.
          </p>
        </section>

        <section>
          <h3 class="text-h6 text-weight-medium">02. Our use of cookies</h3>
          <p class="text-body1 text-weight-regular">
          We may use cookies for the following purposes:
          </p>
          <p class="text-body1 text-weight-medium">Authentication</p>
          <p class="text-body1 text-weight-regular">
          Attofund uses authentication cookies and similar technologies to ensure members authentication and login.
          </p>
          <p class="text-body1 text-weight-medium">Security</p>
          <p class="text-body1 text-weight-regular">
          Cookies also help us keep your account, data, and Attofund safe and secure by detecting activity that might violate our rules and Terms of Service.
          </p>
          <p class="text-body1 text-weight-medium">Localization</p>
          <p class="text-body1 text-weight-regular">
          Some cookies help us provide localized experiences — for example, by making sure you see Attofund in your preferred language.
          </p>
          <p class="text-body1 text-weight-medium">Performance</p>
          <p class="text-body1 text-weight-regular">
          Performance cookies help us to understand how Attofund is performing and to provide you with the best experience possible.
          </p>
          <p class="text-body1 text-weight-medium">Analytics and research</p>
          <p class="text-body1 text-weight-regular">
          Cookies and other technologies also help us to better understand how people use our services so that we can improve them.
          </p>
        </section>

        <section>
          <h3 class="text-h6 text-weight-medium">03. Do Not Track</h3>
          <p class="text-body1 text-weight-regular">
          We do not respond to web browser “Do-Not-Track” signal that may be activated on your browser. There is no uniform or consistent standard ways for responding to Do-Not-Track signal. If you disable cookies, certain features on our website may not work. If you block or reject cookies, our services may no longer function as intended.
          </p>
          <p class="text-body1 text-weight-regular">
          Also some options you select may be browser- and device-specific.
          </p>
        </section>

        <section>
          <h3 class="text-h6 text-weight-medium">04. For more</h3>
          <p class="text-body1 text-weight-regular">
          If you have a specific question or suggestion about this Cookie Policy or your use of our services please contact us.
          </p>
        </section>

      </div>
    </q-page>
</template>

<script>
import { useMeta } from 'quasar'

const metaData = {
  title: 'Cookie Policy | Attofund'
}

export default {
  setup () {
    useMeta(metaData)
    return {
      
    }
  },
}
</script>