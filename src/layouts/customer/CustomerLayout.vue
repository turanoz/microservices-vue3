<template>

  <Header/>
  <router-view/>
  <Footer/>

</template>

<script setup>

import Header from "@/layouts/customer/Header.vue";
import Footer from "@/layouts/customer/Footer.vue";
import useScript from "@/composables/useScript";
import {onMounted, watch} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();
watch(() => route.name, () => {
  useScript().loadScript();
})

onMounted(() => {
  useScript().loadScript();
})
</script>

<style scoped>

</style>
