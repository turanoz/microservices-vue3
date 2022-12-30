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
                  <router-link @click="TokenExtension().deleteToken()" class="nav-link" to="login"><i
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
                          <th>Durum</th>
                          <th>Tutar</th>
                          <th>Görüntüle</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td>#1234</td>
                          <td>March 15, 2020</td>
                          <td>Processing</td>
                          <td>$78.00 for 1 item</td>
                          <td><a href="#" class="btn btn-fill-out btn-sm">View</a></td>
                        </tr>
                        <tr>
                          <td>#2366</td>
                          <td>June 20, 2020</td>
                          <td>Completed</td>
                          <td>$81.00 for 1 item</td>
                          <td><a href="#" class="btn btn-fill-out btn-sm">View</a></td>
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
                          <input disabled v-model="store.getUserInfo.name" required="" class="form-control" name="name" type="text">
                        </div>
                        <div class="form-group col-md-6 mb-3">
                          <label>Soyad<span class="required">*</span></label>
                          <input disabled v-model="store.getUserInfo.surname" required="" class="form-control" name="text">
                        </div>
                        <div class="form-group col-md-12 mb-3">
                          <label>E-posta Adresi <span class="required">*</span></label>
                          <input v-model="store.getUserInfo.email" required="" class="form-control" name="email" type="email" disabled>
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
</template>

<script setup>
import TokenExtension from "@/extensions/TokenExtension";
import {onMounted} from "vue";
import identityEndpoints from "@/services/identityEndpoints";
import {useAuthStore} from "@/stores/useAuthStore";

const store=useAuthStore();

onMounted(async () => {
  await identityEndpoints().getUser()
})
</script>
