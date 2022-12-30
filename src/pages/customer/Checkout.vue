<template>
  <!-- START MAIN CONTENT -->
  <div class="main_content">

    <!-- START SECTION SHOP -->
    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="medium_divider"></div>
            <div class="divider center_icon"><i class="linearicons-credit-card"></i></div>
            <div class="medium_divider"></div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="heading_s1">
              <h4>Ödeme Detayları</h4>
            </div>
            <form method="post">
              <div class="form-group mb-3">
                <input type="text" required class="form-control" name="fname" placeholder="Ad *">
              </div>
              <div class="form-group mb-3">
                <input type="text" required class="form-control" name="lname" placeholder="Soyad *">
              </div>
              <div class="form-group mb-3">
                <input type="text" class="form-control" name="billing_address" required="" placeholder="Adres *">
              </div>
              <div class="form-group mb-3">
                <input class="form-control" required type="text" name="state" placeholder="İlçe / County *">
              </div>
              <div class="form-group mb-3">
                <input class="form-control" required type="text" name="city" placeholder="Şehir *">
              </div>
              <div class="form-group mb-3">
                <input class="form-control" required type="text" name="email" placeholder="E-posta Adresi *">
              </div>
            </form>
          </div>
          <div class="col-md-6">
            <div class="order_review">
              <div class="heading_s1">
                <h4>Siparişiniz</h4>
              </div>
              <div class="table-responsive order_table">
                <table class="table">
                  <thead>
                  <tr>
                    <th>Ürün</th>
                    <th>Tutar</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="basket in store.getBasket" :key="basket.id">
                    <td>{{ basket.name }}<span class="product-qty"> x {{ basket.quantity }}</span></td>
                    <td>{{ basket.amount }}₺</td>
                  </tr>
                  </tbody>
                  <tfoot>
                  <tr>
                    <th>Ara Toplam</th>
                    <td class="product-subtotal">{{store.getTotalPrice}}₺</td>
                  </tr>
                  <tr>
                    <th>Kargo</th>
                    <td>Ücretsiz Kargo</td>
                  </tr>
                  <tr>
                    <th>Toplam</th>
                    <td class="product-subtotal">{{store.getTotalPrice}}₺</td>
                  </tr>
                  </tfoot>
                </table>
              </div>
              <div class="payment_method">
                <div class="heading_s1">
                  <h4>Ödeme</h4>
                </div>
                <div class="payment_option">
                  <div class="custome-radio">
                    <input class="form-check-input" required="" type="radio" name="payment_option" id="exampleRadios3"
                           value="option3" checked="">
                    <label class="form-check-label" for="exampleRadios3">Havale / Eft</label>

                  </div>
                  <div class="custome-radio">
                    <input class="form-check-input" type="radio" name="payment_option" id="exampleRadios4"
                           value="option4">
                    <label class="form-check-label" for="exampleRadios4">Kredi Kartı</label>
                  </div>
                </div>
              </div>
              <a href="#" class="btn btn-fill-out btn-block">Alışverişi Tamamla</a>
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

const store = useBasketStore();


</script>
