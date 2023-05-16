import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";


export const CustomModal = ({ children, title, className = "", textButton }) => {
    const [opened, { open, close }] = useDisclosure(false);
    
    return (
        <>
            <Modal opened={opened} onClose={close} title={title} transitionProps={{ transition: 'fade', duration: 200 }} centered>
                {children}
            </Modal>
            <button className={className} onClick={() => open()}>{textButton}</button>
        </>
    );
};