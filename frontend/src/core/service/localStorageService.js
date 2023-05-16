const LocalStorageService = {
    getItem: (key) => {
        return localStorage.getItem(key);
    },
    setItem: (key, item) => {
        localStorage.setItem(key, JSON.stringify(item));
    },
    removeItem: (key) => {
        localStorage.removeItem(key);
    }
}

export default LocalStorageService;