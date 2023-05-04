import { Group, ActionIcon, useMantineColorScheme } from "@mantine/core";

const Layout = ({ children }) => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    
    return (
        <>
            <Group px={20} sx={{ height: "6vh", width: "100vw" }} position="apart">
                Task Tavern
                <ActionIcon
                    variant="default"
                    onClick={() => toggleColorScheme()}
                    size={30}
                >
                    {colorScheme === "dark" ? "Light" : "Dark"}
                </ActionIcon>
            </Group>
            {children}
        </>
    );
};

export default Layout;