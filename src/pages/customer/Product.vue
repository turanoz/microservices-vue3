<template>
  <!-- START MAIN CONTENT -->
  <div class="main_content">

    <!-- START SECTION SHOP -->
    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-6 mb-4 mb-md-0">
            <div class="product-image">
              <div class="product_img_box">
                <img id="product_im" style="cursor: default; width: 100%" :src='store.getProduct.picture'
                     :alt="store.getProduct.name"/>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-6">
            <div class="pr_detail">
              <div class="product_description">
                <h4 class="product_title"><a href="#">{{ store.getProduct.name }}</a></h4>
                <div class="product_price">
                  <span class="price">{{ store.getProduct.price + " ₺" }}</span>
                </div>
                <div class="pr_desc">
                  <p>{{ store.getProduct.description }}</p>
                </div>
              </div>
              <hr/>
              <div class="cart_extra">
                <div class="cart-product-quantity">
                  <div class="quantity">
                    <button @click="quantityChanger(-1)" class="minus">-</button>
                    <input v-model="quantity" type="text" name="asdsad" class="qty" size="4">
                    <input  v-model="quantity" type="hidden" name="asdsad" class="qty" size="4">
                    <button @click="quantityChanger(+1)" class="plus">+</button>
                  </div>
                </div>
                <div class="cart_btn">
                  <button @click="basketStore.initBasket(store.getProduct,quantity)" class="btn btn-fill-out btn-addtocart" type="button"><i class="icon-basket-loaded"></i>
                    Sepete
                    Ekle
                  </button>
                </div>
              </div>
              <hr/>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="large_divider clearfix"></div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="tab-style3">
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" id="Description-tab" data-bs-toggle="tab" href="#Description" role="tab"
                     aria-controls="Description" aria-selected="true">Açıklama</a>
                </li>
              </ul>
              <div class="tab-content shop_info_tab">
                <div class="tab-pane fade show active" id="Description" role="tabpanel"
                     aria-labelledby="Description-tab">
                  <p>{{ store.getProduct.description }}</p>
                </div>
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
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import catalogEndpoints from "@/services/catalogEndpoints";
import {computed, onMounted, ref} from "vue";
import {useBasketStore} from "@/stores/useBasketStore";

const store = useCatalogStore();
const basketStore=useBasketStore();

const route = useRoute()

const quantity = ref(1);


const quantityChanger = (data) => {
  if (quantity.value===1 && data===-1){
    return false;
  }
  quantity.value=quantity.value+data;
}

onMounted(async () => {
  await catalogEndpoints().getProductById(route.params.id)
})

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) {
    await catalogEndpoints().getProductById(route.params.id)
  }
})

</script>
