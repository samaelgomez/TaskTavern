import { useMantineColorScheme } from "@mantine/core";
import { CustomModal } from "./containers/customModal.component";
import CreateLoginForm from "../pages/createLoginForm.page";
import { useAuthSetter, useCases } from "../hooks/authFetch";

const Layout = ({ children }) => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const { trigger } = useAuthSetter({
        type: useCases.login,
    })

    return (
        <>
            <div className="mainHeader">
                <span className="navTitle">TaskTavern</span>
                <div className="rightHeaderSection">
                    <CustomModal title="Login Form" textButton="Login">
                        <CreateLoginForm trigger={trigger}/>
                    </CustomModal>
                    <button>Register</button>
                    <button onClick={() => toggleColorScheme()}>{colorScheme === "dark" ? "Light" : "Dark"}</button>
                </div>
            </div>
            {children}
        </>
    );
};

export default Layout;