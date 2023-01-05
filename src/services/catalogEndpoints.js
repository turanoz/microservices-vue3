import {catalog, gateway} from "@/services/_api";
import {useCatalogStore} from "@/stores/useCatalogStore";
import photoEndpoints from "@/services/photoEndpoints";


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
    const saveCategory = async (name) => {

        const config = {
            method: 'post', url: 'catalog/categories', headers: {
                'Content-Type': 'application/json'
            }, params: {
                Name: name
            }
        };

        let isSuccessful = false;
        const res = await gateway(config);

        if (res.status === 200) {
            await getCategories();
            isSuccessful = true;
        }

        return isSuccessful;


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

    const saveProduct = async (data) => {
        const res1 = await photoEndpoints().savePhoto(data.picture);

        if (res1.status === 200) {

            data.picture = res1.data.data.url;
            const config = {
                method: 'post', url: 'catalog/Products', headers: {
                    'Content-Type': 'application/json'
                }, data: data
            };
            const res2 = await gateway(config);
            return res2.status === 200;
        }
        return false;

    }
    const editProduct = async (data) => {

        const store = useCatalogStore();
        if (data.picture.files.length === 0) {
            data.picture = store.getProduct.picture;
            const config = {
                method: 'put', url: 'catalog/Products', headers: {
                    'Content-Type': 'application/json'
                }, data: data
            };
            return await gateway(config);
        } else {
            await photoEndpoints().deletePhoto(store.getProduct.picture)
            data.picture = await photoEndpoints().savePhoto(data.picture).then(res => res.data.data.url);
            const config = {
                method: 'put', url: 'catalog/Products', headers: {
                    'Content-Type': 'application/json'
                }, data: data
            };
            return await gateway(config);

        }

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

    return {getCategories, getProducts, getProductById, getProductsByCategoryId, saveCategory, saveProduct, editProduct}


}
