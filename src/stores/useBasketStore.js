import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import basketEndpoints from "@/services/basketEndpoints";

export const useBasketStore = defineStore('basket', () => {
    const basket = ref([]);
    const totalPrice = ref(0);
    const getBasket = computed(() => basket.value);
    const getLength = computed(() => basket.value.length);
    const getTotalPrice = computed(() => {
        totalPrice.value = 0;
        basket.value.forEach((item) => {
            totalPrice.value += item.amount;
        })
        return totalPrice.value;
    });
    const initBaskets = (data) => {
        basket.value = data;
    }
    const initBasket = (data, quantity) => {
        const base = {
            id: data.id,
            name: data.name,
            picture: data.picture,
            price: data.price,
            quantity: quantity,
            amount: data.price * quantity
        };

        let hasBasket = false;
        basket.value.forEach((item) => {

            if (item.id === base.id) {
                item.quantity += base.quantity;
                item.amount += base.amount;
                hasBasket = true;
            }

        })
        if (!hasBasket) basket.value.push(base);
        localStorage.setItem("basket", JSON.stringify(basket.value));

    };
    const deleteBasket = async (id) => {
        basket.value.forEach((item, index) => {

            if (item.id === id) {
                basket.value.splice(index, 1)
            }

        })

        if (basket.value.length === 0) {
            await basketEndpoints().deleteBasket();
        }

        localStorage.setItem("basket", JSON.stringify(basket.value));

    };

    return {
        basket,getBasket, getLength, getTotalPrice, initBasket, initBaskets, deleteBasket
    }
})
