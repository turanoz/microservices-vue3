import {gateway} from "@/services/_api";

export default function () {

    const getBasket = () => {

        return gateway({
            method: 'get', url: 'basket/baskets', headers: {
                'Content-Type': 'application/json'
            }
        });


    }

    const createBasket = (products) => {


        return gateway( {
            method: 'post', url: 'basket/baskets', headers: {
                'Content-Type': 'application/json'
            }, data: {
                basketItems: products
            }
        });

    }
    const deleteBasket = async () => {
        return gateway({
            method: 'delete', url: 'basket/baskets', headers: {
                'Content-Type': 'application/json'
            }
        });

    }

    return {getBasket, createBasket, deleteBasket}


}
