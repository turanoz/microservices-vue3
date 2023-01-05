import {useAuthStore} from "@/stores/useAuthStore";
import TokenExtension from "@/extensions/TokenExtension";

export default (to, from, next) => {
    const store = useAuthStore();

    if (TokenExtension().getUserToken() && TokenExtension().getUserRefreshToken()) {
        store.initLoginInfo(true);
        next();
    } else {
        next({name: 'login',query:{dist:to.fullPath}});
    }

}
