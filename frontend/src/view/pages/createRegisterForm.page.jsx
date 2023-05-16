import { useRef } from 'react';

const CreateRegisterForm = ({ trigger }) => {
    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const validateRegister = () => {
        const name = nameRef.current.value
        const email = emailRef.current.value
        const password = passwordRef.current.value

        trigger({
            name: name, email: email, password: password, avatar: "img1", level: 1, weapon: "Sword", armor: "Breastplate", bag: ["5 gold"]
        })
    }

    return (
        <div className="form RegisterForm">
            <label>Username</label>
            <br/>
            <input type="text" ref={nameRef} className="RegisterForm-Input"></input>
            <br/>
            <label>Email</label>
            <br/>
            <input type="text" ref={emailRef} className="RegisterForm-Input"></input>
            <br/>
            <label>Password</label>
            <br/>
            <input type="password" ref={passwordRef} className="RegisterForm-Input"></input>
            <br/>
            <button className="RegisterForm-Submit" onClick={validateRegister}>Register</button>
        </div>
    )
}

export default CreateRegisterForm;