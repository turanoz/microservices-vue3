<template>
  <!-- START MAIN CONTENT -->
  <div class="main_content">
    <!-- START SECTION SHOP -->
    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-lg-9">
            <div class="row align-items-center mb-4 pb-1">
              <div class="col-12">
                <div class="product_header">
                  <h3>{{ store.categoryName ?? "Tüm Ürünler" }}</h3>
                  <div class="product_header_right">
                    <div class="products_view">
                      <a href="javascript:void(0);" class="shorting_icon grid"><i class="ti-view-grid"></i></a>
                      <a href="javascript:void(0);" class="shorting_icon list active"><i
                          class="ti-layout-list-thumb"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row shop_container list">
              <div v-for="product in store.getProducts" :key="product.id" class="col-md-4 col-6">
                <div class="product">
                  <div class="product_img">
                    <router-link :to="{name: 'product',params:{id:product.id}}">
                      <img :src="product.picture" alt="product_img1">
                    </router-link>
                    <div class="product_action_box">
                      <ul class="list_none pr_action_btn">
                        <li class="add-to-cart">
                          <a href="#"><i class="icon-basket-loaded"></i> Sepete Ekle</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="product_info">
                    <h6 class="product_title">
                      <router-link :to="{name: 'product',params:{id:product.id}}">{{ product.name }}</router-link>
                    </h6>
                    <div class="product_price">
                      <span class="price">{{ product.price }} ₺</span>
                    </div>
                    <div class="pr_desc">
                      <p>{{ product.description }}</p>
                    </div>
                    <div class="list_product_action_box">
                      <ul class="list_none pr_action_btn">
                        <li class="add-to-cart"><a @click="basketStore.initBasket(product,1)" href="#"><i
                            class="icon-basket-loaded"></i> Sepete Ekle</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 order-lg-first mt-4 pt-2 mt-lg-0 pt-lg-0">
            <div class="sidebar">
              <div class="widget">
                <h5 class="widget_title">Kategoriler</h5>
                <ul class="widget_categories">
                  <li v-for="category in store.getCategories" :key="category.id">
                    <router-link :to="{name:'shop',params:{id:category.id}}" active-class="sdsd"><span
                        class="categories_name">{{ category.name }}</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END SECTION SHOP -->
  </div>
  <!-- END MAIN CONTENT -->

</template>
<script setup>

import {useCatalogStore} from "@/stores/useCatalogStore";
import {onMounted} from "vue";
import catalogEndpoints from "@/services/catalogEndpoints";
import {useBasketStore} from "@/stores/useBasketStore";
import {onBeforeRouteUpdate, useRoute} from "vue-router";

const store = useCatalogStore();

const basketStore = useBasketStore();

const route = useRoute();
onMounted(async () => {
  if (route.params.id === null || route.params.id === undefined) {
    await catalogEndpoints().getProducts();

  } else {
    await catalogEndpoints().getProductsByCategoryId(route.params.id)
    store.getCategoryNameById(route.params.id)
  }
})

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) {
    await catalogEndpoints().getProductsByCategoryId(to.params.id)
    store.getCategoryNameById(to.params.id)
  }
})
</script>
<style>

.sdsd {
  color: #FF324D;
}

</style>
