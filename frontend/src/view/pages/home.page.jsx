import { useTaskGetter } from "../hooks/taskFetch"
import CreateTaskForm from "./createTaskForm.page"

<CreateTaskForm></CreateTaskForm>

const Home = () => {
    const { data, isValidating, error, mutate } = useTaskGetter({
        type: "getTasks",
    })
    console.log({ data, isValidating })

    return (

        //Mission List
        //...

        //TaskList
        <div className="TaskListContainer">
            {
                isValidating
                    ? "Loading..."
                    : <div>
                        Hola mira los logs
                        {/* <Modal>
                                <CreateTaskForm></CreateTaskForm>
                            </Modal> */}
                        <CreateTaskForm action={mutate}></CreateTaskForm>
                        {/* <MakeTaskList tasks={data}></MakeTaskList> */}
                    </div>
            }
        </div>

        //Party
        //...

    )
}

export default Home;