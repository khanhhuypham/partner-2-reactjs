// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';


export const ModalWrapper = ({ open, onClose, children }: { open: boolean; onClose: (() => void); children: JSX.Element }) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: 400,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 1,
        outline: 'none', // add this in your code 
    };



    return (
        <>
            {/* <Modal
                open={open} onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="rounded">
                    {children}
                </Box>
            </Modal> */}
        </>
    )
}


