import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

export const ContentOfModalConfirm = (
    {onClose,onConfirm,title,content,confirmTitle}:
    { 
        onClose: (() => void); 
        onConfirm: (() => void); 
        title?: string;
        content?: string;
        confirmTitle?: string;
    }) => {
    return (
        <>
            <DialogTitle>
                <WarningRoundedIcon />
                {title ?? "Warning"}
            </DialogTitle>
            <Divider />
            <DialogContent>
                {content}
            </DialogContent>
            <DialogActions>
                <Button variant="solid" color="danger" onClick={onConfirm}>
                    {confirmTitle ?? "Confirm"}
                </Button>
                <Button variant="plain" color="neutral" onClick={onClose}>
                    Cancel
                </Button>
            </DialogActions>
        </>
    )
}