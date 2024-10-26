
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';



export const ModalWrapper = ({open,onClose,children}:{open:boolean;onClose:(()=> void);children:JSX.Element}) =>{

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <ModalDialog>
                {children}
                </ModalDialog>
            </Modal>
        </>
    )
}