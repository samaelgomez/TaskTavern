import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CreateTaskForm from "../../pages/createTaskForm.page"
import { useCases, useTaskGetter } from "../../hooks/taskFetch";

const TaskPrioCard = ({ name, reward }) => {
    return (
        <div className="taskCard prio taskPrioContainer">
            <div className="TaskSimpleInfoContainer">
                <div className="task-icon"></div>
                <div className="simpleFont-16">{name}</div>
            </div>
            <div className="TaskRewardAndAdditionalInfo">
                <div className="periodicity-icon"></div>
                <div className="simpleFont-16"> 15 XP </div>
            </div>
        </div>
    );
};

const TaskNormalCard = ({ name, reward, action }) => {
    return (
        <div className="taskCard normalTask" onClick={action}>
            <div className="TaskSimpleInfoContainer">
                <div className="task-icon"></div>
                <div className="simpleFont-16">{name}</div>
            </div>
            <div className="TaskRewardAndAdditionalInfo">
                <div className="periodicity-icon"></div>
                <div className="simpleFont-16"> 5 XP </div>
            </div>
        </div>
    );
};

export const LoadingOrEmptySection = () => {
    return (
        <div className="loadingOrEmptyBody">
            <p className="simpleFont-16">Add tasks to start your adventure</p>
        </div>
    );
};

export const MakeTaskList = ({ tasks, update }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const { mutate } = useTaskGetter({
        type: useCases.getTasks,
    })

    return (
        <>
            <Modal opened={opened} onClose={close} title="Add task" centered>
                <CreateTaskForm action={mutate} />
            </Modal>
            {tasks.priorityTask.length !== 0 ? <TaskPrioCard {...tasks.priorityTask[0]} /> : ""}
            {tasks.normalTasks.length === 0 ? (
                <LoadingOrEmptySection />
            ) : (
                <div className="normalTasksContainer">
                    {tasks.normalTasks.map((e) => {
                        return <TaskNormalCard {...e} key={e.id} action={() => open()} />;
                    })}
                </div>
            )}
        </>
    );
};