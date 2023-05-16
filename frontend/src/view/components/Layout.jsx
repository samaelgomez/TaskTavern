import { useMantineColorScheme } from "@mantine/core";
import { CustomModal } from "./containers/customModal.component";
import CreateLoginForm from "../pages/createLoginForm.page";
import { useAuthGetter, useAuthSetter, useCases } from "../hooks/authFetch";

const Layout = ({ children }) => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const { trigger } = useAuthSetter({
        type: useCases.login
    })
    const { data, isValidating, error } = useAuthGetter({
        type: useCases.getUserData
    });
    
    const { trigger: logoutTrigger } = useAuthSetter({
        type: useCases.logout
    });

    console.log(data, isValidating)

    const AuthNavBar = () => {
        return (<>
            <CustomModal title="Login Form" textButton="Login">
                <CreateLoginForm trigger={trigger} />
            </CustomModal>
            <button>Register</button>
        </>)
    }

    const LoggedNavBar = () => {
        return (<>
            <button>{data.name}</button>
            <button onClick={() => logoutTrigger()}>Logout</button>
        </>)
    }

    return (
        <>
            <div className="mainHeader">
                <span className="navTitle">TaskTavern</span>
                <div className="rightHeaderSection">
                    {isValidating ? <p>Loading...</p> : !data ? <AuthNavBar /> : <LoggedNavBar />}
                    <button onClick={() => toggleColorScheme()}>{colorScheme === "dark" ? "Light" : "Dark"}</button>
                </div>
            </div>
            {children}
        </>
    );
};

export default Layout;