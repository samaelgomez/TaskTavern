import { useRef } from 'react';

const CreateLoginForm = ({ trigger }) => {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const validateLogin = () => {
        const email = emailRef.current.value
        const password = passwordRef.current.value

        trigger({
            email: email, password: password
        })
    }

    return (
        <div className="LoginForm">
            <label>Email</label>
            <br/>
            <input type="text" ref={emailRef} className="LoginForm-Input"></input>
            <br/>
            <label>Password</label>
            <br/>
            <input type="text" ref={passwordRef} className="LoginForm-Input"></input>
            <br/>
            <button className="LoginForm-Submit" onClick={validateLogin}>Login</button>
        </div>
    )
}

export default CreateLoginForm;