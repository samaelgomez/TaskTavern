// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import { useRef, useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation'

const BaseUrl = "http://localhost:3000/tasks"

// // headers: {
//     "Content-Type": "application/json",
//      'Content-Type': 'application/x-www-form-urlencoded',
// },

/**
 * 
 * @param Props = { @param method = GET, POST, PUT, DELETE, @param header, @param data = Json.stringify(Json) }
 * 
 */
const TaskService = async ({
    method="GET",
    headers={},
    data=null,
    url=""
})=>{
    try {
        const taskUrl = BaseUrl + url
        const response = await fetch(taskUrl, {
            method: method, // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers:{
                "Content-Type": "application/json",
                ...headers
            },
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: data, // body data type must match "Content-Type" header
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json()
    } catch (error) {
        //Gestor de errores relacionado con las tareas
        throw new Error('Failed to fetch data');
    }
}

const TaskUseCases = {
    getTasks: async () =>{
        return await TaskService({
            method:"GET"
        })
    },
    getTaskById: async (id)=>{
        return await TaskService({
            method:"GET",
            url:`/${id}`
        })
    },
    createTask: async (url, {arg})=>{
      console.log(arg)
        return await TaskService({
            method:"POST",
            data:JSON.stringify(arg)
        })
    },
}

const SwrGetAdapter =  ({key, fetcher, shouldFetch = true}) =>{
  const {data, error, isValidating, mutate} = useSWR(shouldFetch ? key : null ,fetcher)
  return {data, error, isValidating, mutate }
}
const SwrMutateAdapter =  ({key, fetcher}) =>{
  const { trigger } = useSWRMutation(key, fetcher)
  return { trigger }
}

const useTaskGetter = ({type, params}) => {

  const { data, error, isValidating, mutate } = SwrGetAdapter({
      key: `/tasks - ${type}`,
      fetcher: () => TaskUseCases[type](params)
  })

  return { data, error, isValidating, mutate }

}
const useTaskSetter = ({type}) => {

  const { trigger } = SwrMutateAdapter({
      key: `/tasks - ${type}`,
      fetcher: TaskUseCases[type]
  })

  return { trigger }

}

const CreateTaskForm = ({action}) => {
    const {trigger} = useTaskSetter({
        type:"createTask"
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
          name:name, type:type, daily:daily, priority:priority, completed:false
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
const App = ()=>{
    const {data, isValidating, error, mutate} = useTaskGetter({
        type:"getTasks",
    })
    console.log({data, isValidating})

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

export default App;