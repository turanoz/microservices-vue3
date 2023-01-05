import {gateway} from "@/services/_api";
import {useOrderStore} from "@/stores/useOrderStore";

export default function () {

    const getOrders = async () => {

        const rs = await gateway({
            method: 'get', url: 'order/Orders', headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.data.data);


        const store = useOrderStore();

        store.initOrders(rs)

    }

    return {
        getOrders
    }
}
