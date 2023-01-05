import {ref, computed} from 'vue'
import {defineStore} from 'pinia'

export const useCatalogStore = defineStore('catalog', () => {
    const categories = ref([]);
    const categoryName = ref("");
    const products = ref([]);
    const product = ref({});
    const getCategories = computed(() => categories.value);
    const getProducts = computed(() => products.value);
    const getProduct = computed(() => product.value);
    const initCategories = (data) => {
        categories.value = data;
    };
    const getCategoryNameById = (id) => {

        categories.value.forEach((item) => {
            if (item.id===id) {
                categoryName.value= item.name;
            }
        })

        return null;
    }
    const initProducts = (data) => {
        products.value = data;
    };
    const initProduct = (data) => {
        product.value = data;
    };
    return {
        getCategoryNameById,
        categoryName,
        getCategories,
        getProducts,
        getProduct,
        initCategories,
        initProducts,
        initProduct
    }
})
