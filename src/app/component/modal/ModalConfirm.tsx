// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

import { Button } from "antd";

export const ContentOfModalConfirm = (
    { onClose, onConfirm, title, content, confirmTitle }:
    {
        onClose: (() => void);
        onConfirm: (() => void);
        title?: JSX.Element;
        content?: JSX.Element;
        confirmTitle?: string;
    }
) => {
    return (
        <div>

            <div className="mt-5 flex flex-col content-between">

                <div className="space-y-2 mb-5">
            
                    {title ?? <h1 className="text-2xl font-bold">warning</h1>} 

                    <div className="">{content}</div>
                </div>

                <div className="flex justify-end space-x-2">
                    <Button type="primary" htmlType="submit" onClick={onConfirm}>
                        Confirm
                    </Button>
                    <Button htmlType="button" onClick={onClose}>
                        Cancel
                    </Button>
                </div>

            </div>
        </div>
    )
}