import {useBasketStore} from "@/stores/useBasketStore";

export default async (to, from, next) => {
    const store = useBasketStore();

    if (store.getLength > 0) {
        next();
    } else {
        return next({name:"shop"});
    }

}
