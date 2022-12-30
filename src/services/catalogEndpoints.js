import {catalog} from "@/services/_api";
import {useCatalogStore} from "@/stores/useCatalogStore";


export default function () {

    const getCategories = async () => {

        const store = useCatalogStore();
        const config = {
            method: 'get', url: 'categories', headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await catalog(config).then(res => res.data.data);

        store.initCategories(res);

    }
    const getProducts = async () => {

        const store = useCatalogStore()

        const config = {
            method: 'get', url: 'products', headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await catalog(config).then(res => res.data.data);

        store.initProducts(res);

    }

    const getProductsByCategoryId = async (id) => {

        const store = useCatalogStore()

        const config = {
            method: 'get', url: 'products/category/' + id, headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await catalog(config).then(res => res.data.data);

        store.initProducts(res);

    }

    const getProductById = async (id) => {

        const store = useCatalogStore()

        const config = {
            method: 'get', url: 'products/' + id, headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await catalog(config).then(res => res.data.data);

        store.initProduct(res);

    }

    return {getCategories, getProducts, getProductById, getProductsByCategoryId}


}
