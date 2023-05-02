import { useRef } from 'react';
import { useTaskSetter } from '../hooks/taskFetch';

const CreateTaskForm = ({ action }) => {
    const { trigger } = useTaskSetter({
        type: "createTask"
    })
    const nameRef = useRef(null)
    const typeRef = useRef(null)
    const dailyRef = useRef(null)
    const priorityRef = useRef(null)

    const validateTask = () => {
        const name = nameRef.current.value
        const type = typeRef.current.value
        const daily = dailyRef.current.checked
        const priority = priorityRef.current.checked
        //valida que el contenido del form de la task es ok
        //....

        trigger({
            name: name, type: type, daily: daily, priority: priority, completed: false
        })
        action('/tasks - getTasks')
    }

    return (
        <div className="TaskForm">
            <input type="text" ref={nameRef} className="TaskForm-Input"></input>
            <section className="TaskForm-Section">
                <label>Is Daily?</label>
                <input ref={dailyRef} type="checkbox" className="TaskForm-Input"></input>
            </section>
            <section className="TaskForm-Section">
                <label>Is a Priority Task?</label>
                <input ref={priorityRef} type="checkbox" className="TaskForm-Input"></input>
            </section>
            <select ref={typeRef} className="TaskForm-Select">
                <option value="standar">Normal</option>
                <option value="time">Contrarreloj</option>
            </select>

            <button className="TaskForm-Submit" onClick={validateTask}>Create Task</button>
        </div>
    )
}

export default CreateTaskForm;