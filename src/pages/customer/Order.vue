<template>
  <!-- START MAIN CONTENT -->
  <div class="main_content">

    <!-- START SECTION SHOP -->
    <div class="section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="text-center order_complete">
              <i class="fas fa-check-circle"></i>
              <div class="heading_s1">
                <h3>Sipraişiniz Oluşturuldu!</h3>
              </div>
              <p>Bizi seçtiğiniz için teşekkür ederiz. Sipariş kısa sürede kargoya verilecektir. Kalite arayanı bulur
                :)</p>
              <router-link :to="{name:'shop'}" class="btn btn-fill-out">Alışverişe devam et</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END SECTION SHOP -->

  </div>
  <!-- END MAIN CONTENT -->
</template>
