<template>
  <q-layout view="lHh Lpr lFf">
    <page-header />
    <q-page-container>
      <router-view />
    </q-page-container>
    <page-footer />
  </q-layout>
</template>

<script setup lang="ts">
import { PageHeader, PageFooter } from "components/index";
</script>
