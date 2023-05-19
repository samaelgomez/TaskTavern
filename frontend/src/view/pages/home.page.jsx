import { useCases, useTaskGetter } from "../hooks/taskFetch"
import Container from "../components/containers";
import { LoadingOrEmptySection, MakeTaskList } from "../components/cards/task.cards";
import MemberCard from "../components/cards/party.cards";

const Home = () => {
    const { data, isValidating, error, mutate } = useTaskGetter({
        type: useCases.getTasks,
    })

    return (
        <div className="TaskTaverMainContainer">
            <div className="MenuDialogContainer"></div>
            <div className="SectionsContainer">
                <Container containerTitle={"Missions"}></Container>

                <Container containerTitle={"Tasks"}>
                    {isValidating || data.tasks.normalTasks.length == 0 || data.tasks.priorityTask.length == 0 ? (
                        <LoadingOrEmptySection />
                    ) : (
                        <MakeTaskList tasks={data.tasks} />
                    )}
                    <input
                        type="button"
                        value="Add Task"
                        className="primaryButton med"
                    ></input>
                </Container>

                <Container containerTitle={"Party"} sectionClassname="partyWrapper">
                    <MemberCard name={"Maquein [LV 1]"}/>
                </Container>
            </div>
        </div>
    )
}

export default Home;