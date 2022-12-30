import {gateway} from "@/services/_api";

export default function () {

    const getBasket = () => {

        const config = {
            method: 'get', url: 'basket/baskets', headers: {
                'Content-Type': 'application/json'
            }
        };

        return gateway(config);


    }

    const createBasket = (products) => {

        const config = {
            method: 'post', url: 'basket/baskets', headers: {
                'Content-Type': 'application/json'
            }, data: {
                basketItems: products
            }
        };

        return gateway(config);

    }
    const deleteBasket = async () => {

        const config = {
            method: 'delete', url: 'basket/baskets', headers: {
                'Content-Type': 'application/json'
            }
        };

        return gateway(config);

    }

    return {getBasket, createBasket, deleteBasket}


}
