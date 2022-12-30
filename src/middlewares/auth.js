import {useAuthStore} from "@/stores/useAuthStore";

export default (to, from, next) => {
    const store = useAuthStore();

    if (store.getLoginInfo) {
        next();
    } else {
        next({name: 'login'});
    }

}
