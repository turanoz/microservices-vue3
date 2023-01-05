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
                  <h3>Giriş Yap</h3>
                </div>
                <div>
                  <div class="form-group mb-3">
                    <input v-model="email" type="text" required="" class="form-control" name="email"
                           placeholder="E-posta Adresiniz">
                  </div>
                  <div class="form-group mb-3">
                    <input v-model="pass" class="form-control" required="" type="password" name="password"
                           placeholder="Şifreniz">
                  </div>
                  <div class="form-group mb-3">
                    <button @click="login" type="submit" class="btn btn-fill-out btn-block" name="login">Giriş
                      Yap
                    </button>
                  </div>
                </div>
                <div class="different_login">
                  <span> or</span>
                </div>

                <div class="form-note text-center">Hesabınız yok mu ?
                  <router-link to="register">Şimdi oluşturun</router-link>
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
import {ref} from "vue";
import identityEndpoints from "@/services/identityEndpoints";
import {useAuthStore} from "@/stores/useAuthStore";
import router from "@/router";
import {useRoute} from "vue-router";

const email = ref();
const pass = ref();

const store = useAuthStore();
const route = useRoute()
const login = async () => {
  await identityEndpoints().userLogin(email.value, pass.value);
  if (store.getLoginInfo) {
    if (route.query.dist !== "" && route.query.dist !== undefined) {
      await router.push(route.query.dist)
    } else {
      await router.push({name: "account"})
    }
  }
}
</script>
