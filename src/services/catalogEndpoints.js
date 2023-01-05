import {catalog, gateway} from "@/services/_api";
import {useCatalogStore} from "@/stores/useCatalogStore";
import photoEndpoints from "@/services/photoEndpoints";

export default function () {
    const getCategories = async () => {
        const store = useCatalogStore();
        const res = await catalog({
            method: 'get', url: 'categories', headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.data.data);
        store.initCategories(res);
    }
    const saveCategory = async (name) => {
        const res = await gateway({
            method: 'post', url: 'catalog/categories', headers: {
                'Content-Type': 'application/json'
            }, params: {
                Name: name
            }
        });
        if (res.status === 200) {
            await getCategories();
            return true;
        }
        return false;

    }
    const getProducts = async () => {
        const store = useCatalogStore()
        const res = await catalog({
            method: 'get', url: 'products', headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.data.data);
        store.initProducts(res);
    }

    const saveProduct = async (data) => {
        const savePhoto = await photoEndpoints().savePhoto(data.picture);
        if (savePhoto.status === 200) {
            data.picture = savePhoto.data.data.url;
            const res = await gateway({
                method: 'post', url: 'catalog/Products', headers: {
                    'Content-Type': 'application/json'
                }, data: data
            });
            if (res.status === 200) {
                await getProducts();
                return true
            }
        }
        return false;
    }
    const editProduct = async (data) => {
        const store = useCatalogStore();
        if (data.picture.files.length === 0) {
            data.picture = store.getProduct.picture;
            const res = await gateway({
                method: 'put', url: 'catalog/Products', headers: {
                    'Content-Type': 'application/json'
                }, data: data
            });

            if (res.status === 200) {
                await getProductById(store.getProduct.id);
                return true
            }
        } else {
            await photoEndpoints().deletePhoto(store.getProduct.picture)
            data.picture = await photoEndpoints().savePhoto(data.picture).then(res => res.data.data.url);
            const res = await gateway({
                method: 'put', url: 'catalog/Products', headers: {
                    'Content-Type': 'application/json'
                }, data: data
            });

            if (res.status === 200) {
                await getProductById(store.getProduct.id);
                return true
            }
        }
    }
    const getProductsByCategoryId = async (id) => {
        const store = useCatalogStore()
        const res = await catalog({
            method: 'get', url: 'products/category/' + id, headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.data.data);
        store.initProducts(res);
    }
    const getProductById = async (id) => {
        const store = useCatalogStore()
        const res = await catalog({
            method: 'get', url: 'products/' + id, headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.data.data);
        store.initProduct(res);
    }
    return {getCategories, getProducts, getProductById, getProductsByCategoryId, saveCategory, saveProduct, editProduct}
}
