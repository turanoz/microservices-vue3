import {useBasketStore} from "@/stores/useBasketStore";
import basketEndpoints from "@/services/basketEndpoints";

export default async (to, from, next) => {
    const store = useBasketStore();

    const basket = await basketEndpoints().getBasket();

    if (basket.status === 200) {
        store.initBaskets(basket.data.data.basketItems);
    }

    if (store.getLength > 0) {
        next();
    } else {
        return next({name:"shop"});
    }

}
