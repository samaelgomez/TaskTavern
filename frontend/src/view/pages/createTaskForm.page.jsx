import { useRef } from 'react';
import { useCases, useTaskSetter } from '../hooks/taskFetch';
import { authUseCases, useAuthGetter } from '../hooks/authFetch';

const CreateTaskForm = ({ action }) => {
    const { trigger } = useTaskSetter({
        type: useCases.createTask
    })

    const { data, isValidating, error } = useAuthGetter({
        type: authUseCases.getUserData
    });

    const nameRef = useRef(null)
    const typeRef = useRef(null)
    const dailyRef = useRef(null)
    const priorityRef = useRef(null)

    const validateTask = () => {
        const name = nameRef.current.value
        const type = typeRef.current.value
        const daily = dailyRef.current.checked
        const priority = priorityRef.current.checked

        trigger({
            authorId: data.id, name: name, type: type, daily: daily, priority: priority, completed: false
        })
        action('/tasks - getTasks')
    }

    return (
        <div className="form TaskForm">
            <input type="text" ref={nameRef} className="TaskForm-Input"></input>
            <section className="TaskForm-Section">
                <label>Daily task</label>
                <input ref={dailyRef} type="checkbox" className="TaskForm-Input"></input>
            </section>
            <section className="TaskForm-Section">
                <label>Priority task</label>
                <input ref={priorityRef} type="checkbox" className="TaskForm-Input"></input>
            </section>
            <select ref={typeRef} className="TaskForm-Select">
                <option value="standard">Standard</option>
                <option value="timed">Timed</option>
            </select>

            <button className="TaskForm-Submit" onClick={validateTask}>Add task</button>
        </div>
    )
}

export default CreateTaskForm;