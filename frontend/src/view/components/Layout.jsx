import { useMantineColorScheme } from "@mantine/core";
import { CustomModal } from "./containers/customModal.component";
import CreateLoginForm from "../pages/createLoginForm.page";
import { useAuthGetter, useAuthSetter, authUseCases } from "../hooks/authFetch";
import CreateRegisterForm from "../pages/createRegisterForm.page";

const Layout = ({ children }) => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const { trigger: loginTrigger } = useAuthSetter({
        type: authUseCases.login
    })

    const { trigger: registerTrigger } = useAuthSetter({
        type: authUseCases.register
    })

    const { data, isValidating, error } = useAuthGetter({
        type: authUseCases.getUserData
    });
    
    const { trigger: logoutTrigger } = useAuthSetter({
        type: authUseCases.logout
    });

    const AuthNavBar = () => {
        return (<>
            <CustomModal title="Login Form" textButton="Login">
                <CreateLoginForm trigger={loginTrigger} />
            </CustomModal>
            <CustomModal title="Register Form" textButton="Register">
                <CreateRegisterForm trigger={registerTrigger} />
            </CustomModal>
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