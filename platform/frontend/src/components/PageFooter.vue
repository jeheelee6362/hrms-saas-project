<template>
  <footer class="bg-teal-10 q-pt-md">
    <div class="q-mx-auto width-responsive">
      <q-toolbar class="row items-stretch">
        <q-list dense class="col-3 q-pr-xl q-mr-xl">
          <q-item
            ><q-item-section><q-img src="logo2.png" /></q-item-section
          ></q-item>
          <q-item
            class="text-caption text-weight-light footer-item q-mb-md q-mt-sm"
          >
            <q-item-section>
              <q-btn
                to="/login"
                target="_blank"
                no-caps
                rounded
                dense
                size="md"
                label="Let's Get Started"
                class="text-black bg-amber-12"
              />
            </q-item-section>
          </q-item>
          <q-item class="text-caption text-weight-light footer-item">
            <q-item-section>
              <div class="text-weight-regular text-white">Contacts</div>
              <div><q-icon name="phone" class="q-mr-xs" />(+852) 5985-9195</div>
              <div>
                <q-icon name="email" class="q-mr-xs" />jeheelee@attofund.com
              </div>
            </q-item-section>
          </q-item>
          <q-item class="text-caption text-weight-light footer-item">
            <q-item-section>
              <div class="text-weight-regular text-white">Office</div>
              <div>8/F, United Centre</div>
              <div>Queensway, Admiralty</div>
            </q-item-section>
          </q-item>
        </q-list>
        <q-list class="col">
          <q-space class="q-py-xl" />
          <section class="row q-pt-md">
            <q-list
              dense
              class="col"
              v-for="section in footerLinks"
              :key="section.group"
            >
              <q-item class="text-body2 text-weight-medium text-white"
                ><q-item-section>{{
                  section.group.toUpperCase()
                }}</q-item-section></q-item
              >
              <q-item
                v-for="(link, index) in section.links"
                :key="index"
                @click="openURL(link.to)"
                class="text-caption text-weight-light footer-item"
                clickable
              >
                <q-item-section>{{ link.name }}</q-item-section>
              </q-item>
            </q-list>
          </section>
          <section>
            <q-item
              class="text-caption text-weight-light footer-item q-mt-md q-mr-xl float-right"
            >
              <q-item-section class="q-mr-xl">
                <div class="text-weight-light text-white q-ml-xs q-mb-xs">
                  Connect with Us
                </div>
                <div>
                  <q-icon
                    v-for="(icon, index) in socialIcons"
                    :name="icon.path"
                    :key="index"
                    @click="openURL(icon.link)"
                    class="q-mx-xs cursor-pointer"
                    size="2em"
                  />
                </div>
              </q-item-section>
            </q-item>
          </section>
        </q-list>
      </q-toolbar>
    </div>
    <q-separator class="q-mt-lg" />
    <div class="q-mx-auto width-responsive">
      <q-toolbar>
        <q-item
          to="/policy/data-protection"
          class="text-caption text-weight-light footer-item"
          ><q-item-section>Data Protection Policy</q-item-section></q-item
        >
        <q-item
          to="/policy/terms-of-service"
          class="text-caption text-weight-light footer-item"
          ><q-item-section>Terms of Service</q-item-section></q-item
        >
        <q-item
          to="/policy/privacy"
          class="text-caption text-weight-light footer-item"
          ><q-item-section>Privacy Policy</q-item-section></q-item
        >
        <q-item
          to="/policy/cookie"
          class="text-caption text-weight-light footer-item"
          ><q-item-section>Cookie Policy</q-item-section></q-item
        >
        <q-space></q-space>
        <span class="text-caption text-weight-light footer-item"
          >© 2024 Attofund. All Rights Reserved.</span
        >
      </q-toolbar>
    </div>
  </footer>
</template>

<script lang="ts">
import { ref } from 'vue';
import { openURL } from 'quasar';
import socialIcons from './SocialIcons.js';
import footerLinks from './FooterLinks';

export default {
  setup() {
    return {};
  },
  data() {
    return {
      socialIcons,
      footerLinks,
    };
  },
  methods: {
    openURL(url: any) {
      if (url.includes('https://')) {
        if (url.includes('attofund.com')) {
          location.href = url;
        } else {
          openURL(url);
        }
      } else {
        this.$router.push({ path: url });
      }
    },
  },
};
</script>
