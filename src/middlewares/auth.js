import {useAuthStore} from "@/stores/useAuthStore";
import identityEndpoints from "@/services/identityEndpoints";

export default async (to, from, next) => {
    const store = useAuthStore();

    if (store.getLoginInfo) {
        await identityEndpoints().getUser()
        next();
    } else {
        next({name: 'login',query:{dist:to.fullPath}});
    }

}
