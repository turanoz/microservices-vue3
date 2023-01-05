import qs from "qs";
import TokenExtension from "@/extensions/TokenExtension";
import {identity} from "@/services/_api";
import {useAuthStore} from "@/stores/useAuthStore";
import router from "@/router";

export default function () {
    const clientCredentialLogin = async () => {

        const data = qs.stringify({
            'client_id': 'VueSpa', 'client_secret': 'secret', 'grant_type': 'client_credentials'
        });
        const config = {
            method: 'post', url: 'connect/token', headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }, data: data
        };

        return identity(config);

    }


    const silentLogin = async () => {

        const data = qs.stringify({
            'client_id': 'VueSpaForUser',
            'client_secret': 'secret',
            'grant_type': 'refresh_token',
            'refresh_token': TokenExtension().getUserRefreshToken()
        });
        const config = {
            method: 'post', url: 'connect/token', headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': TokenExtension().getClientToken()
            }, data: data
        };

        const res = await identity(config);

        if (res.status === 200) {
            TokenExtension().setUserToken(res.data.access_token)
            TokenExtension().setUserRefreshToken(res.data.refresh_token)
        }


        return res;

    }

    const userLogin = async (username, password) => {

        const store = useAuthStore();

        const data = qs.stringify({
            'client_id': 'VueSpaForUser',
            'client_secret': 'secret',
            'grant_type': 'password',
            'username': username,
            'password': password,
        });
        const config = {
            method: 'post', url: 'connect/token', headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': TokenExtension().getClientToken()
            }, data: data
        };

        const res = await identity(config).then(res => res.data);

        TokenExtension().setUserToken(res.access_token)
        TokenExtension().setUserRefreshToken(res.refresh_token)

        store.initLoginInfo(true);

    }

    const userRegister = async (data) => {


        if (data.password !== data.passwordAgain) {
            return false;
        }
        const config = {
            method: 'post', url: 'api/user/signup', headers: {
                'Content-Type': 'application/json',
                'Authorization': TokenExtension().getClientToken()
            }, data: data
        };

        const res = await identity(config);

        if (res.status === 204) {
            await userLogin(data.email, data.password);
            await router.push({name: 'shop'})
        }

    }

    const getUser = async () => {

        const config = {
            method: 'get', url: 'api/user/getUser', headers: {
                'Content-Type': 'application/json',
                'Authorization': TokenExtension().getUserToken()
            }
        };

        const res = await identity(config).then(res => res.data);

        const store = useAuthStore();

        store.initUserInfo(res);

    }

    return {
        clientCredentialLogin, userLogin, silentLogin, userRegister, getUser
    }
}
