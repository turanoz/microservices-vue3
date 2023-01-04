<template>
  <!--   LOADER
    <div class="preloader">
      <div class="lds-ellipsis">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
     END LOADER-->

  <!-- START HEADER -->
  <header class="header_wrap">
    <div class="middle-header dark_skin">
      <div class="container">
        <div class="nav_block">
          <router-link replace to="/" class="navbar-brand">
            <img class="logo_dark" src="/src/assets/images/logorgb.png" height="100" alt="logo">
          </router-link>
          <div class="product_search_form radius_input search_form_btn">
            <form>
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="custom_select">
                    <select class="first_null not_chosen">
                      <option value="">Tüm Kategoriler</option>
                      <option :value="category.id" v-for="category in catalogStore.getCategories" :key="category.id">
                        {{ category.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <input class="form-control" placeholder="Ürün Ara..." required="" type="text">
                <button type="submit" class="search_btn3">Bul</button>
              </div>
            </form>
          </div>
          <ul class="navbar-nav attr-nav align-items-center">
            <li>
              <router-link :to="{name:'account'}" class="nav-link"><i class="linearicons-user"></i></router-link>
            </li>
            <li class="dropdown cart_dropdown" v-if="basketStore.getLength>0">
              <a class="nav-link cart_trigger" href="#">
                <i class="linearicons-bag2"></i>
                <span class="cart_count">{{ basketStore.getLength }}</span>
                <span class="amount">
                  <span class="currency_symbol">{{ basketStore.getTotalPrice }}</span>₺</span>
              </a>
              <div class="cart_box cart_right dropdown-menu dropdown-menu-right">
                <ul class="cart_list">
                  <li v-for="basket in basketStore.getBasket" :key="basket.id">
                    <a @click="basketStore.deleteBasket(basket.id)" href="#" class="item_remove">
                      <i class="ion-close"></i>
                    </a>
                    <a href="#">
                      <img :src="basket.picture" alt="cart_thumb1">{{ basket.name }}</a>
                    <span class="cart_quantity"> {{ basket.quantity }} x
                      <span class="cart_amount">{{ basket.price }}
                        <span class="price_symbole">₺</span>
                      </span></span>
                  </li>
                </ul>
                <div class="cart_footer">
                  <p class="cart_total">
                    <strong>Ara Toplam:</strong>
                    <span class="cart_price">{{ basketStore.getTotalPrice }}
                      <span class="price_symbole">₺</span>
                    </span></p>
                  <p class="cart_buttons">
                    <router-link :to="{name:'cart'}" class="btn btn-fill-line view-cart">Sepete Git</router-link>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bottom_header dark_skin main_menu_uppercase border-top">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-3 col-md-4 col-sm-6 col-3">
            <div class="categories_wrap">
              <button type="button" data-bs-toggle="collapse" data-bs-target="#navCatContent" aria-expanded="false"
                      class="categories_btn categories_menu">
                <span>Tüm Kategoriler </span><i class="linearicons-menu"></i>
              </button>
              <div id="navCatContent" class="navbar collapse">
                <ul>
                  <li v-for="category in catalogStore.getCategories" :key="category.id">
                    <router-link class="dropdown-item nav-link nav_item"
                                 :to="{name:'shop',params:{id:category.id}}">
                      <span>{{ category.name }}</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-9 col-md-8 col-sm-6 col-9">
            <nav class="navbar navbar-expand-lg">
              <button class="navbar-toggler side_navbar_toggler" type="button" data-bs-toggle="collapse"
                      data-bs-target="#navbarSidetoggle" aria-expanded="false">
                <span class="ion-android-menu"></span>
              </button>
              <div class="pr_search_icon">
                <a href="javascript:void(0);" class="nav-link pr_search_trigger"><i
                    class="linearicons-magnifier"></i></a>
              </div>
              <div class="collapse navbar-collapse mobile_side_menu" id="navbarSidetoggle">
                <ul class="navbar-nav">
                  <li>
                    <router-link :to="{name:'shop'}" class="nav-link nav_item">Mağaza</router-link>
                  </li>
                </ul>
              </div>
              <div class="contact_phone contact_support">
                <i class="linearicons-phone-wave"></i>
                <span>0 545 273 4158</span>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- END HEADER -->
</template>
<script setup>

import {useCatalogStore} from "@/stores/useCatalogStore";
import {useBasketStore} from "@/stores/useBasketStore";

const catalogStore = useCatalogStore();
const basketStore = useBasketStore();


import {onMounted} from "vue";
import catalogEndpoints from "@/services/catalogEndpoints";
import basketEndpoints from "@/services/basketEndpoints";

onMounted(async () => {

  await catalogEndpoints().getCategories();

  const basket = await basketEndpoints().getBasket();

  if (basket.status === 200) {
    basketStore.initBaskets(basket.data.data.basketItems);
  }

})

</script>
