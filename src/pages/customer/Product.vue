<template>
  <!-- START MAIN CONTENT -->
  <div class="main_content">

    <!-- START SECTION SHOP -->
    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-6 mb-4 mb-md-0">
            <div class="product-image">
              <div class="product_img_box">
                <img id="product_im" style="cursor: default; width: 100%" :src='getPhoto(store.getProduct.picture)'
                     :alt="store.getProduct.name"/>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-6">
            <div class="pr_detail">
              <div class="product_description">
                <h4 class="product_title"><a href="#">{{ store.getProduct.name }}</a> <span
                    v-if="userStore.isAdmin" @click="openEditProductModalClick" style="cursor: pointer"
                    class="badge bg-success">✏️</span>
                </h4>
                <div class="product_price">
                  <span class="price">{{ store.getProduct.price + " ₺" }}</span>
                </div>
                <div class="pr_desc">
                  <p>{{ store.getProduct.description }}</p>
                </div>
              </div>
              <hr/>
              <div class="cart_extra">
                <div class="cart-product-quantity">
                  <div class="quantity">
                    <button class="minus">-</button>
                    <input v-model="quantity" type="text" class="qty" size="4">
                    <button class="plus">+</button>
                  </div>
                </div>
                <div class="cart_btn">
                  <button @click="basketStore.initBasket(store.getProduct,quantity)"
                          class="btn btn-fill-out btn-addtocart" type="button"><i class="icon-basket-loaded"></i>
                    Sepete
                    Ekle
                  </button>
                </div>
              </div>
              <hr/>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="large_divider clearfix"></div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="tab-style3">
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" id="Description-tab" data-bs-toggle="tab" href="#Description" role="tab"
                     aria-controls="Description" aria-selected="true">Açıklama</a>
                </li>
              </ul>
              <div class="tab-content shop_info_tab">
                <div class="tab-pane fade show active" id="Description" role="tabpanel"
                     aria-labelledby="Description-tab">
                  <p>{{ store.getProduct.description }}</p>
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

  <!-- Edit Product Modal -->
  <div v-if="userStore.isAdmin" class="modal fade" id="editProductModal" tabindex="-1"
       aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body ">

          <h3>Ürün Ekle</h3>

          <div class="px-4 py-5">

            <div>{{ message }}</div>

            <div class="mb-3">
              <label for="prdimage" class="form-label">Resim</label>
              <input type="file" :ref="(e)=>editProduct.picture=e" class="form-control" id="prdimage">
            </div>
            <div class="mb-3">
              <label for="prdname" class="form-label">Ürün Adı</label>
              <input type="text" v-model="editProduct.name" class="form-control" id="prdname">
            </div>
            <div class="mb-3">
              <label for="cdesc" class="form-label">Açıklama</label>
              <textarea v-model="editProduct.description" class="form-control" id="cdesc"></textarea>
            </div>
            <div class="mb-3">
              <label for="cid" class="form-label">Kategori</label>
              <select class="form-select" id="cid" v-model="editProduct.categoryId">
                <option v-for="category in store.getCategories" :value="category.id">{{ category.name }}</option>

              </select>
            </div>
            <div class="mb-3">
              <label for="cname" class="form-label">Fiyat</label>
              <input type="text" v-model="editProduct.price" class="form-control" id="cname">
            </div>

            <button @click="editProductClick" type="submit" class="btn btn-success">Kaydet</button>

          </div>


        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useCatalogStore} from "@/stores/useCatalogStore";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import catalogEndpoints from "@/services/catalogEndpoints";
import {computed, onMounted, reactive, ref} from "vue";
import {useBasketStore} from "@/stores/useBasketStore";
import photoEndpoints from "@/services/photoEndpoints";
import {useAuthStore} from "@/stores/useAuthStore";

const store = useCatalogStore();
const userStore = useAuthStore();
const basketStore = useBasketStore();
const {getPhoto} = photoEndpoints();
const route = useRoute()

const quantity = ref(1);
const editProduct = ref({});
const openEditProductModalClick = () => {
  const modal = new bootstrap.Modal(document.getElementById('editProductModal'), {})
  modal.show();
}
const editProductClick = async () => {
  const res = await catalogEndpoints().editProduct(editProduct.value);
  if (res) {
    addMessage("Ürün Düzenlendi :)")
  } else {
    addMessage("Ürün Düzenlenemedi !")
  }
}
const message = ref("");


const addMessage = (msg) => {
  message.value = msg;
  setTimeout(() => {
    message.value = "";
  }, 1500)
}

onMounted(async () => {
  await catalogEndpoints().getProductById(route.params.id)
  editProduct.value = JSON.parse(JSON.stringify(store.getProduct));
})

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) {
    await catalogEndpoints().getProductById(route.params.id)
    editProduct.value = JSON.parse(JSON.stringify(store.getProduct))
  }
})

</script>
