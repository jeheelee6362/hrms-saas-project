<template>
  <q-layout view="hHh Lpr lFf">
    <portal-header />
    <portal-nav />
    <q-page-container>
      <router-view />
    </q-page-container>
    <portal-side />
  </q-layout>
</template>

<script setup lang="ts">
import { PortalHeader, PortalNav, PortalSide } from "components/index";
</script>
