<template>
  <!-- START MAIN CONTENT -->
  <div class="main_content">

    <!-- START SECTION SHOP -->
    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-4">
            <div class="dashboard_menu">
              <ul class="nav nav-tabs flex-column" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" id="orders-tab" data-bs-toggle="tab" href="#orders" role="tab"
                     aria-controls="orders" aria-selected="false"><i class="ti-shopping-cart-full"></i>Siparişlerim</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="account-detail-tab" data-bs-toggle="tab" href="#account-detail" role="tab"
                     aria-controls="account-detail" aria-selected="true"><i class="ti-id-badge"></i>Hesap Detayları</a>
                </li>
                <li class="nav-item">
                  <router-link @click="logoutClick" class="nav-link" to="login"><i
                      class="ti-lock"></i>Çıkış Yap
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-9 col-md-8">
            <div class="tab-content dashboard_content">
              <div class="tab-pane fade show active" id="orders" role="tabpanel" aria-labelledby="orders-tab">
                <div class="card">
                  <div class="card-header">
                    <h3>Siparişlerim</h3>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                        <tr>
                          <th>Sipariş</th>
                          <th>Tarih</th>
                          <th>Tutar</th>
                          <th>Görüntüle</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="order in orderStore.getSummaryOrders" :key="order.id">
                          <td>{{ order.id }}</td>
                          <td>{{ new Date(order.date).toLocaleDateString() }}</td>
                          <td>{{ order.itemQuantity + " kalem ürün " + order.itemAmount + "₺" }}</td>
                          <td><a @click="getDetailClick(order.id)" class="btn btn-fill-out btn-sm">Detay</a></td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="account-detail" role="tabpanel" aria-labelledby="account-detail-tab">
                <div class="card">
                  <div class="card-header">
                    <h3>Hesap Detayları</h3>
                  </div>
                  <div class="card-body">
                    <div>
                      <div class="row">
                        <div class="form-group col-md-6 mb-3">
                          <label>Ad<span class="required">*</span></label>
                          <input disabled v-model="store.getUserInfo.name" required="" class="form-control" name="name"
                                 type="text">
                        </div>
                        <div class="form-group col-md-6 mb-3">
                          <label>Soyad<span class="required">*</span></label>
                          <input disabled v-model="store.getUserInfo.surname" required="" class="form-control"
                                 name="text">
                        </div>
                        <div class="form-group col-md-12 mb-3">
                          <label>E-posta Adresi <span class="required">*</span></label>
                          <input v-model="store.getUserInfo.email" required="" class="form-control" name="email"
                                 type="email" disabled>
                        </div>
                      </div>
                    </div>
                  </div>
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

  <!-- Modal -->
  <div class="modal fade" v-if="orderStore.anySelected" id="orderDetailModal" tabindex="-1"
       aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body ">
          <div class="text-right"><i class="fa fa-close close" data-dismiss="modal"></i></div>

          <div class="px-4 py-5">

            <h5 class="text-uppercase">{{ store.getUserInfo.name + " " + store.getUserInfo.surname }}</h5>

            <p>
              {{
                orderStore.getOrderById[0].address.street + " " + orderStore.getOrderById[0].address.line + " " + orderStore.getOrderById[0].address.zipCode + " " + orderStore.getOrderById[0].address.district + "/" + orderStore.getOrderById[0].address.province
              }}
            </p>


            <div class="theme-color text-end">
              {{ new Date(orderStore.getOrderById[0].createdDate).toLocaleDateString() }}
            </div>
            <h5 class="theme-color">Sipariş Özeti</h5>

            <div class="mb-3">
              <hr class="new1">
            </div>

            <div class="d-flex justify-content-between" v-for="order in orderStore.getOrderById[0].orderItems" :key="order.productId">
              <router-link :to="{name:'product',params:{id:order.productId}}" target="_blank"><span
                  class="font-weight-bold">{{ order.productName.substring(0,20) }}</span></router-link>
              <span class="font-weight-bold">{{ order.quantity }} adet</span>
              <span class="font-weight-bold">{{ order.price }}₺</span>
              <span class="text-muted">{{ order.price * order.quantity }}₺</span>
            </div>

            <div class="d-flex justify-content-between mt-3">
              <span class="font-weight-bold">Toplam</span>
              <span class="font-weight-bold theme-color">{{orderStore.getOrderById[0].totalPrice}}₺</span>
            </div>

          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TokenExtension from "@/extensions/TokenExtension";
import {onMounted} from "vue";
import identityEndpoints from "@/services/identityEndpoints";
import {useAuthStore} from "@/stores/useAuthStore";
import orderEndpoints from "@/services/orderEndpoints";
import {useOrderStore} from "@/stores/useOrderStore";


const store = useAuthStore();
const orderStore = useOrderStore();

const getDetailClick = (id) => {
  orderStore.initSelected(id)

  setTimeout(() => {
    const ss = new bootstrap.Modal(document.getElementById('orderDetailModal'), {})

    ss.show();
  }, 500)


}
const logoutClick=()=>{
  TokenExtension().deleteToken();
}
onMounted(async () => {
  if (!store.getLoginInfo){
    await identityEndpoints().getUser()
  }

  await orderEndpoints().getOrders();
})
</script>
