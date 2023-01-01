import {ref, computed} from 'vue'
import {defineStore} from 'pinia'

export const useOrderStore = defineStore('order', () => {
    const orders = ref([]);
    const getOrders = computed(() => orders.value);
    const selected = ref(0);
    const anySelected = computed(() => selected.value !== 0)
    const getSummaryOrders = computed(() => {
        const sumOrders = [];
        orders.value.forEach((x) => {
            const item = {
                id: orders.value.id, date: orders.value.createdDate, items: [], itemQuantity: 0, itemAmount: 0
            };
            item.id = x.id;
            item.date = x.createdDate;
            x.orderItems.forEach((y) => {
                item.items.push({name: y.productName, picture: y.pictureUrl})
                item.itemAmount += y.price * y.quantity;
                item.itemQuantity += 1;
            });
            sumOrders.push(item);
        })
        return sumOrders;
    });
    const getOrderById = computed(() => {
        return orders.value.filter(x => x.id === selected.value);
    });

    const initOrders = (data) => {
        orders.value = data;
    };
    const initSelected = (id) => {
        selected.value = id;
    }


    return {
        getOrders, getOrderById, getSummaryOrders, initOrders, initSelected, anySelected
    }
})
