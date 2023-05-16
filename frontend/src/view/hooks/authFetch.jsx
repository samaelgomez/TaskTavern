import AuthUseCases from "../../core/useCases/auth.useCases";
import { SwrGetAdapter, SwrMutateAdapter } from "./serviceHook/swrAdapters";

const useCases = {
    login: 'login',
    logout: 'logout',
    getUserData: 'getUserData'
};

const useAuthGetter = ({ type, params }) => {
    const { data, error, isValidating, mutate } = SwrGetAdapter({
        key: `/users - ${type}`,
        fetcher: () => AuthUseCases[type](params)
    })

    return { data, error, isValidating, mutate }
}

const useAuthSetter = ({ type }) => {
    const { trigger } = SwrMutateAdapter({
        key: `/users - ${type}`,
        fetcher: AuthUseCases[type]
    })

    return { trigger }
}

export { useAuthGetter, useAuthSetter, useCases }