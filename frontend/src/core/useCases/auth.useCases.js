import LocalStorageService from "../service/localStorageService";
import Service from "../service/service";

const BaseUrl = "/users";

const AuthUseCases = {
    login: async (url, {
        arg
    }) => {
        const result = await Service({
            method: "POST",
            url: BaseUrl + "/login",
            data: JSON.stringify(arg)
        })
        if (!result.error && result.token) {
            LocalStorageService.setItem("Token", result.token)
            LocalStorageService.setItem("User", {
                name: result.user.name,
                avatar: result.user.avatar,
                level: result.user.level,
                weapon: result.user.weapon,
                armor: result.user.armor,
                bag: result.user.bag
            })
            window.location.reload();
            return true;
        } else {
            return false;
        }
    },
    logout: () => {
        LocalStorageService.removeItem("Token");
        LocalStorageService.removeItem("User");
        window.location.reload();
        return true;
    },
    getUserData: () => {
        return JSON.parse(LocalStorageService.getItem("User"));
    }
}

export default AuthUseCases;