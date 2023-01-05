import {ref, computed} from 'vue'
import {defineStore} from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const loginInfo = ref(false);
    const userInfo = ref({});
    const getLoginInfo = computed(() => loginInfo.value);
    const getUserInfo = computed(() => userInfo.value);
    const isAdmin = computed(() => userInfo.value.roles?.some(x => x === "Admin") ?? false);

    const initLoginInfo = (data) => {
        loginInfo.value = data;
    };

    const initUserInfo = (data) => {
        userInfo.value = data;
    };


    return {
        getUserInfo, getLoginInfo, initLoginInfo, initUserInfo, isAdmin
    }
})
