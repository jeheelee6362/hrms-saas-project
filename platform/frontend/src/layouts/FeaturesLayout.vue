<template>
  <q-layout view="lHh Lpr lFf">
    <page-header />
    <q-page-container>
      <page-features-tab />
      <router-view />
    </q-page-container>
    <page-footer />
  </q-layout>
</template>

<script setup lang="ts">
import { PageHeader, PageFeaturesTab, PageFooter } from "components/index";
</script>
