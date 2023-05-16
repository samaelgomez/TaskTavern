import Service from "../service/service";

const BaseUrl = "/tasks";

const TaskUseCases = {
    getTasks: async () => {
        const result = await Service({
            method: "GET",
            url: BaseUrl
        })
        return result.error
        ? {tasks: {normalTasks: [], priorityTask: []}, ...result}
        : result
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
        return await Service({
            method: "POST",
            data: JSON.stringify(arg),
            url: BaseUrl
        })
    },
}

export default TaskUseCases;