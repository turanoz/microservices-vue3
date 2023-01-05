import axios from "axios";
import TokenExtension from "@/extensions/TokenExtension";
import identityEndpoints from "@/services/identityEndpoints";
import router from "@/router";

export const identity = (config) => {
    const identityApi = axios.create();
    identityApi.defaults.baseURL = "http://34.88.156.91:5001";

    identityApi.interceptors.request.use(cnf => cnf, (error) => Promise.reject(error))

    identityApi.interceptors.response.use(res => res, async (err) => {

        const originalConfig = err.config;
        if (originalConfig.url !== "Sign/login" && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const rs = await identityEndpoints().silentLogin();
                    if (rs.status !== 200) {
                        TokenExtension().deleteToken();
                        await router.push({name: 'login'})
                        return false;
                    }
                    return identityApi(originalConfig);
                } catch (_error) {
                    return _error;
                }
            }
        }
        return err;
    })

    return identityApi(config);

}
export const catalog = (config) => {
    const catalogApi = axios.create();
    catalogApi.defaults.baseURL = "http://34.88.156.91:5000/services/catalog";

    catalogApi.interceptors.request.use((cnf) => {

        cnf.headers["Authorization"] = TokenExtension().getClientToken();

        return cnf;
    }, (error) => Promise.reject(error))

    catalogApi.interceptors.response.use(res => res, async (err) => {

        const originalConfig = err.config;
        if (originalConfig.url !== "Sign/login" && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const rs = await identityEndpoints().clientCredentialLogin();
                    if (rs.status !== 200) {
                        await router.push({name: 'login'})
                        return false;
                    }
                    TokenExtension().setClientToken(rs.data.access_token);
                    return catalogApi(originalConfig);
                } catch (_error) {
                    return _error;
                }
            }
        }
        return err;
    })

    return catalogApi(config);

}
export const gateway = (config) => {
    const gatewayApi = axios.create();

    gatewayApi.defaults.baseURL = "http://34.88.156.91:5000/services/";

    gatewayApi.interceptors.request.use((cnf) => {

        cnf.headers["Authorization"] = TokenExtension().getUserToken();
        return cnf;
    }, (error) => Promise.reject(error))

    gatewayApi.interceptors.response.use(res => res, async (err) => {

        const originalConfig = err.config;
        if (originalConfig.url !== "Sign/login" && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const rs = await identityEndpoints().silentLogin();
                    if (rs.status !== 200) {
                        TokenExtension().deleteToken();
                        await router.push({name: 'login'})
                        return false;
                    }
                    return gatewayApi(originalConfig);
                } catch (_error) {
                    return _error;
                }
            }
        }
        return err;
    })

    return gatewayApi(config);

}
