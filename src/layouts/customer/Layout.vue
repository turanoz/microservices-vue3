<template>

  <router-view name="header"/>
  <router-view/>
  <router-view name="footer"/>

</template>

<script setup>

import useScript from "@/composables/useScript";
import {onMounted, watch} from "vue";
import {useRoute} from "vue-router";
const route = useRoute();
watch(() => route.name, () => {
  useScript().loadScript();
})

onMounted(async () => {
  useScript().loadScript();
})

</script>

<style scoped>

</style>
