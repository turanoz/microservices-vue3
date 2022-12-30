<template>
  <!-- START MAIN CONTENT -->
  <div class="main_content">

    <!-- START LOGIN SECTION -->
    <div class="login_register_wrap section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-6 col-md-10">
            <div class="login_wrap">
              <div class="padding_eight_all bg-white">
                <div class="heading_s1">
                  <h3>Hesap Oluşturun</h3>
                </div>
                <div>
                  <div class="form-group mb-3">
                    <input v-model="data.name" type="text" required="" class="form-control" name="name"
                           placeholder="Adınız">
                  </div>
                  <div class="form-group mb-3">
                    <input v-model="data.surname" type="text" required="" class="form-control" name="surname"
                           placeholder="Soyadınız">
                  </div>
                  <div class="form-group mb-3">
                    <input v-model="data.email" type="text" required="" class="form-control" name="email"
                           placeholder="Eposta Adresiniz">
                  </div>
                  <div class="form-group mb-3">
                    <input v-model="data.password" class="form-control" required="" type="password" name="password"
                           placeholder="Şifreniz">
                  </div>
                  <div class="form-group mb-3">
                    <input v-model="data.passwordAgain" class="form-control" required="" type="password" name="password"
                           placeholder="Şifreniz">
                  </div>
                  <div class="form-group mb-3">
                    <button @click="register" class="btn btn-fill-out btn-block" name="register">Kayıt Ol</button>
                  </div>
                </div>
                <div class="different_login">
                  <span>veya</span>
                </div>
                <div class="form-note text-center">Hesabınız var mı ?
                  <router-link to="login">Giriş Yap</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END LOGIN SECTION -->

  </div>
  <!-- END MAIN CONTENT -->
</template>

<script setup>

import {reactive} from "vue";
import identityEndpoints from "@/services/identityEndpoints";

const data = reactive({
  name: "",
  surname: "",
  email: "",
  password: "",
  passwordAgain: ""
})

const register = async () => {
  await identityEndpoints().userRegister(data);
}

</script>
