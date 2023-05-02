import TaskUseCases from "../../core/useCases/task.useCases";
import { SwrGetAdapter, SwrMutateAdapter } from "./serviceHook/swrAdapters";

const useCases = {
    getTasks: 'getTasks',
    getTaskById: 'getTaskById',
    createTask: 'createTask',
    updateTask: 'updateTask',
    deleteTask: 'deleteTask'
};

const useTaskGetter = ({ type, params }) => {
    const { data, error, isValidating, mutate } = SwrGetAdapter({
        key: `/tasks - ${type}`,
        fetcher: () => TaskUseCases[type](params)
    })

    return { data, error, isValidating, mutate }
}

const useTaskSetter = ({ type }) => {
    const { trigger } = SwrMutateAdapter({
        key: `/tasks - ${type}`,
        fetcher: TaskUseCases[type]
    })

    return { trigger }
}

export { useTaskGetter, useTaskSetter, useCases }