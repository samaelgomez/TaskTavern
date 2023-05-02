import Service from "../service/service";

const BaseUrl = "/tasks";

const TaskUseCases = {
    getTasks: async () => {
        return await Service({
            method: "GET",
            url: BaseUrl
        })
    },
    getTaskById: async (id) => {
        return await Service({
            method: "GET",
            url: `${BaseUrl}/${id}`
        })
    },
    createTask: async (url, {
        arg
    }) => {
        console.log(arg)
        return await Service({
            method: "POST",
            data: JSON.stringify(arg),
            url: BaseUrl
        })
    },
}

export default TaskUseCases;