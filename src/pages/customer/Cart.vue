<template>
  <!-- START MAIN CONTENT -->
  <div class="main_content">

    <!-- START SECTION SHOP -->
    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="table-responsive shop_cart_table">
              <table class="table">
                <thead>
                <tr>
                  <th class="product-thumbnail">&nbsp;</th>
                  <th class="product-name">Ürün Adı</th>
                  <th class="product-price">Fiyatı</th>
                  <th class="product-quantity">Adet</th>
                  <th class="product-subtotal">Tutar</th>
                  <th class="product-remove">Sil</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="basket in store.getBasket" :key="basket.id">
                  <td class="product-thumbnail">
                    <a href="#">
                      <img :src="getPhoto(basket.picture)" :alt="basket.name"></a>
                  </td>
                  <td class="product-name" data-title="Ürün Adı"><a href="#">{{ basket.name }}</a></td>
                  <td class="product-price" data-title="Fiyatı">{{ basket.price }}₺</td>
                  <td class="product-quantity" data-title="Adet">
                    <div class="quantity">
                      <input type="button" value="-" class="minus">
                      <input type="text" name="quantity" :value="basket.quantity" title="Qty" class="qty" size="4">
                      <input type="button" value="+" class="plus">
                    </div>
                  </td>
                  <td class="product-subtotal" data-title="Tutar">{{ basket.amount }}₺</td>
                  <td class="product-remove" data-title="Sil"><a @click="store.deleteBasket(basket.id)" href="#"><i
                      class="ti-close"></i></a></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="medium_divider"></div>
            <div class="divider center_icon"><i class="ti-shopping-cart-full"></i></div>
            <div class="medium_divider"></div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="border p-3 p-md-4">
              <div class="heading_s1 mb-3">
                <h6>Sepet Tutarı</h6>
              </div>
              <div class="table-responsive">
                <table class="table">
                  <tbody>
                  <tr>
                    <td class="cart_total_label">Ara Toplam</td>
                    <td class="cart_total_amount">{{store.getTotalPrice}}₺</td>
                  </tr>
                  <tr>
                    <td class="cart_total_label">Kargo</td>
                    <td class="cart_total_amount">Ücretsiz</td>
                  </tr>
                  <tr>
                    <td class="cart_total_label">Toplam</td>
                    <td class="cart_total_amount"><strong>{{store.getTotalPrice}}₺</strong></td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <router-link @click="saveBasket" :to="{name:'checkout'}" class="btn btn-fill-out">Alışverişi Tamamla</router-link>
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
import {useBasketStore} from "@/stores/useBasketStore";
import basketEndpoints from "@/services/basketEndpoints";
import photoEndpoints from "@/services/photoEndpoints";

const {getPhoto}=photoEndpoints();

const store = useBasketStore();
const saveBasket=async () => {
  await basketEndpoints().createBasket(store.getBasket)
}
</script>
