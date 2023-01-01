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
              <h4>Adres Detayları</h4>
            </div>
            <div>
              <div class="form-group mb-3">
                <input v-model="userStore.getUserInfo.name" type="text" disabled required class="form-control"
                       name="fname" placeholder="Ad *">
              </div>
              <div class="form-group mb-3">
                <input v-model="userStore.getUserInfo.surname" type="text" disabled required class="form-control"
                       name="lname" placeholder="Soyad *">
              </div>
              <div class="form-group mb-3">
                <input type="text" v-model="details.order.address.street" class="form-control" name="billing_address"
                       required="" placeholder="Sokak/Cadde *">
              </div>
              <div class="form-group mb-3">
                <input type="text" v-model="details.order.address.line" class="form-control" name="billing_address"
                       required="" placeholder="Adres *">
              </div>
              <div class="form-group mb-3">
                <input type="text" v-model="details.order.address.zipCode" class="form-control" name="billing_address"
                       required="" placeholder="Posta Kodu *">
              </div>
              <div class="form-group mb-3">
                <input class="form-control" required type="text" v-model="details.order.address.district" name="state"
                       placeholder="İlçe / County *">
              </div>
              <div class="form-group mb-3">
                <input class="form-control" required type="text" v-model="details.order.address.province" name="city"
                       placeholder="Şehir *">
              </div>
              <div class="form-group mb-3">
                <input disabled class="form-control" required type="text" name="email"
                       v-model="userStore.getUserInfo.email" placeholder="E-posta Adresi *">
              </div>
            </div>
            <div class="heading_s1">
              <h4>Ödeme Bilgileri</h4>
            </div>
            <CreditCard/>
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
                    <td class="product-subtotal">{{ store.getTotalPrice }}₺</td>
                  </tr>
                  <tr>
                    <th>Kargo</th>
                    <td>Ücretsiz Kargo</td>
                  </tr>
                  <tr>
                    <th>Toplam</th>
                    <td class="product-subtotal">{{ store.getTotalPrice }}₺</td>
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
                    <label class="form-check-label" for="exampleRadios3">Kredi Kartı</label>
                  </div>
                </div>
              </div>
              <a @click="payment" class="btn btn-fill-out btn-block">Alışverişi Tamamla</a>
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
import CreditCard from "@/components/CreditCard.vue";
import {useAuthStore} from "@/stores/useAuthStore";
import {useBasketStore} from "@/stores/useBasketStore";
import paymentEndpoints from "@/services/paymentEndpoints";
import useCheckout from "@/composables/useCheckout";
import basketEndpoints from "@/services/basketEndpoints";
import router from "@/router";

const {details} = useCheckout();

const userStore = useAuthStore()
details.order.buyerId = userStore.getUserInfo.id;
const store = useBasketStore();

const payment = async () => {
  store.getBasket.forEach((x) => {

    details.order.orderItems.push({
      productId: x.id,
      productName: x.name,
      pictureUrl: x.picture,
      quantity: x.quantity,
      price: x.price
    })

  })

  details.totalPrice = store.getTotalPrice

  console.log(details.totalPrice)
  const rs = await paymentEndpoints().fakePayment(details);
  if (rs.status === 200) {
    await basketEndpoints().deleteBasket();
    localStorage.removeItem("basket");
    store.basket = [];
    await router.push({name: 'order'})
  }
}

</script>
