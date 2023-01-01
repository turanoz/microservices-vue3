import {gateway} from "@/services/_api";
import {useOrderStore} from "@/stores/useOrderStore";

export default function () {

    const getOrders = async () => {

        const config = {
            method: 'get', url: 'order/Orders', headers: {
                'Content-Type': 'application/json'
            },
        };
        const rs = await gateway(config).then(res => res.data.data);


        const store = useOrderStore();

        store.initOrders(rs)

    }

    return {
        getOrders
    }
}
