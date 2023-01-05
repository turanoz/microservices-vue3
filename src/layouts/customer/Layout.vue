<template>

  <router-view name="header"/>
  <router-view/>
  <router-view name="footer"/>

</template>

<script setup>

import useScript from "@/composables/useScript";
import {onMounted, watch} from "vue";
import {useRoute} from "vue-router";
import catalogEndpoints from "@/services/catalogEndpoints";
import identityEndpoints from "@/services/identityEndpoints";

const route = useRoute();
watch(() => route.name, () => {
  useScript().loadScript();
})

onMounted(async () => {
  useScript().loadScript();
  await catalogEndpoints().getCategories();
  await identityEndpoints().getUser()
})

</script>

<style scoped>

</style>
