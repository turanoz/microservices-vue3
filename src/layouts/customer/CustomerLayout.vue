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
import basketEndpoints from "@/services/basketEndpoints";
import {useBasketStore} from "@/stores/useBasketStore";
import {useAuthStore} from "@/stores/useAuthStore";
import identityEndpoints from "@/services/identityEndpoints";

const route = useRoute();
watch(() => route.name, () => {
  useScript().loadScript();
})
const basketStore = useBasketStore();

const userStore = useAuthStore();
onMounted(async () => {
  useScript().loadScript();
  await catalogEndpoints().getCategories();
  await identityEndpoints().getUser()
  setTimeout(async () => {
    if (userStore.getLoginInfo && basketStore.getLength === 0) {

      const basket = await basketEndpoints().getBasket();

      if (basket.status === 200) {
        basketStore.initBaskets(basket.data.data.basketItems);
      }
    }
  }, 500)


})

</script>

<style scoped>

</style>
