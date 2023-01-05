<template>
  <!-- START MAIN CONTENT -->
  <div class="main_content">
    <!-- START SECTION SHOP -->
    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-lg-9">
            <div class="row align-items-center mb-4 pb-1">
              <div class="col-12">
                <div class="product_header">
                  <h3>{{ store.categoryName }}<span v-if="userStore.isAdmin" @click="openNewProductModalClick"
                                                    class="ms-2 badge bg-success "
                                                    style="cursor: pointer">+</span></h3>
                  <div class="product_header_right">
                    <div class="products_view">
                      <a href="javascript:void(0);" class="shorting_icon grid"><i class="ti-view-grid"></i></a>
                      <a href="javascript:void(0);" class="shorting_icon list active"><i
                          class="ti-layout-list-thumb"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row shop_container list">
              <div v-for="product in store.getProducts" :key="product.id" class="col-md-4 col-6">
                <div class="product">
                  <div class="product_img">
                    <router-link :to="{name: 'product',params:{id:product.id}}">
                      <img :src="getPhoto(product.picture)" alt="product_img1">
                    </router-link>
                    <div class="product_action_box">
                      <ul class="list_none pr_action_btn">
                        <li class="add-to-cart">
                          <a @click.prevent="basketStore.initBasket(product,1)" href="javascript:void(0)"><i
                              class="icon-basket-loaded"></i>
                            Sepete Ekle</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="product_info">
                    <h6 class="product_title">
                      <router-link :to="{name: 'product',params:{id:product.id}}">{{ product.name }}</router-link>
                    </h6>
                    <div class="product_price">
                      <span class="price">{{ product.price }} ₺</span>
                    </div>
                    <div class="pr_desc">
                      <p>{{ product.description }}</p>
                    </div>
                    <div class="list_product_action_box">
                      <ul class="list_none pr_action_btn">
                        <li class="add-to-cart">
                          <a @click.prevent="basketStore.initBasket(product,1)" href="javascript:void(0)"><i
                              class="icon-basket-loaded"></i> Sepete Ekle
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 order-lg-first mt-4 pt-2 mt-lg-0 pt-lg-0">
            <div class="sidebar">
              <div class="widget">
                <h5 class="widget_title">Kategoriler<span v-if="userStore.isAdmin" @click="openNewCategoryModalClick"
                                                          class="ms-2 badge bg-success "
                                                          style="cursor: pointer">+</span></h5>
                <ul class="widget_categories">
                  <li v-for="category in store.getCategories" :key="category.id">
                    <router-link :to="{name:'shop',params:{id:category.id}}" active-class="sdsd"><span
                        class="categories_name">{{ category.name }}</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END SECTION SHOP -->
  </div>
  <!-- END MAIN CONTENT -->


  <!-- New Category Modal -->
  <div v-if="userStore.isAdmin" class="modal fade" id="newCategoryModal" tabindex="-1"
       aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body ">

          <h3>Kategori Ekle</h3>

          <div class="px-4 py-5">

            <div>{{ message }}</div>

            <div class="mb-3">
              <label for="cname" class="form-label">Kategori Adı</label>
              <input type="text" v-model="newCategoryName" class="form-control" id="cname">
            </div>

            <button @click="newCategoryClick" type="submit" class="btn btn-success">Ekle</button>

          </div>


        </div>
      </div>
    </div>
  </div>

  <!-- New Product Modal -->
  <div v-if="userStore.isAdmin" class="modal fade" id="newProductModal" tabindex="-1"
       aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body ">

          <h3>Ürün Ekle</h3>

          <div class="px-4 py-5">

            <div>{{ message }}</div>

            <div class="mb-3">
              <label for="prdimage" class="form-label">Resim</label>
              <input type="file" :ref="(e)=>newProduct.picture=e" class="form-control" id="prdimage">
            </div>
            <div class="mb-3">
              <label for="prdname" class="form-label">Ürün Adı</label>
              <input type="text" v-model="newProduct.name" class="form-control" id="prdname">
            </div>
            <div class="mb-3">
              <label for="cdesc" class="form-label">Açıklama</label>
              <textarea v-model="newProduct.description" class="form-control" id="cdesc"></textarea>
            </div>
            <div class="mb-3">
              <label for="cid" class="form-label">Kategori</label>
              <select class="form-select" id="cid" v-model="newProduct.categoryId">
                <option v-for="category in store.getCategories" :value="category.id" :key="category.id">{{ category.name }}</option>

              </select>
            </div>
            <div class="mb-3">
              <label for="cname" class="form-label">Fiyat</label>
              <input type="text" v-model="newProduct.price" class="form-control" id="cname">
            </div>

            <button @click="newProductClick" type="submit" class="btn btn-success">Ekle</button>

          </div>


        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import {useCatalogStore} from "@/stores/useCatalogStore";
import {onMounted, reactive, ref} from "vue";
import catalogEndpoints from "@/services/catalogEndpoints";
import {useBasketStore} from "@/stores/useBasketStore";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {useAuthStore} from "@/stores/useAuthStore";
import photoEndpoints from "@/services/photoEndpoints";

const newProduct = reactive({});

const store = useCatalogStore();

const basketStore = useBasketStore();

const userStore = useAuthStore();

const route = useRoute();
const message = ref("");

const {getPhoto} = photoEndpoints()

const newCategoryName = ref("");

const openNewCategoryModalClick = () => {
  const modal = new bootstrap.Modal(document.getElementById('newCategoryModal'), {})
  modal.show();
}
const openNewProductModalClick = () => {
  newProduct.categoryId = route.params.id;
  const modal = new bootstrap.Modal(document.getElementById('newProductModal'), {})
  modal.show();
}

const newCategoryClick = async () => {
  const res = await catalogEndpoints().saveCategory(newCategoryName.value)
  if (res) {
    addMessage("Kategori Oluşturuldu :)")
  } else {
    addMessage("Kategori Oluşturulamadı !")
  }
}
const newProductClick = async () => {
  const res = await catalogEndpoints().saveProduct(newProduct);
  if (res) {
    addMessage("Ürün Oluşturuldu :)")
  } else {
    addMessage("Ürün Oluşturulamadı !")
  }
}
const addMessage = (msg) => {
  message.value = msg;
  setTimeout(() => {
    message.value = "";
  }, 1500)
}
onMounted(async () => {
  if (route.params.id === null || route.params.id === undefined || route.params.id === "") {
    store.categoryName = "Tüm Ürünler"
    await catalogEndpoints().getProducts();

  } else {
    await catalogEndpoints().getProductsByCategoryId(route.params.id)
    store.getCategoryNameById(route.params.id)
  }
})

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id === "") {
    store.categoryName = "Tüm Ürünler"
    await catalogEndpoints().getProducts();
  } else {

    if (to.params.id !== from.params.id) {
      await catalogEndpoints().getProductsByCategoryId(to.params.id)
      store.getCategoryNameById(to.params.id)
    }
  }
})
</script>
<style>

.sdsd {
  color: #09a350;
}

</style>
