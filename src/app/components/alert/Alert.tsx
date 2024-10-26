import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import * as React from 'react';
import Alert from '@mui/joy/Alert';
import Typography from '@mui/joy/Typography';
import { ColorPaletteProp } from '@mui/joy/styles';
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';


import { hideNotifi, notificationSelector } from '../../store/notification/notificationSlice';
import { NotifiType } from '../../constant/notificationType';




export const Toast = () => {

    const items: {
        type:NotifiType;
        title: string;
        color: ColorPaletteProp;
        icon: React.ReactElement<any>;
    }[] = [
            {type:NotifiType.success, title: 'Success', color: 'success', icon: <CheckCircleIcon /> },
            {type:NotifiType.warning, title: 'Warning', color: 'warning', icon: <WarningIcon /> },
            {type:NotifiType.error, title: 'Error', color: 'danger', icon: <ReportIcon /> },
            {type:NotifiType.neutral, title: 'Neutral', color: 'neutral', icon: <InfoIcon /> },
        ];

    const notifiSlice = useAppSelector(notificationSelector);
    const dispatch = useAppDispatch();


    return (
        <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: 'column' }}>
            {items.filter((item) => item.type == notifiSlice.type).map(({ title, color, icon }) => (
                <Alert
                    key={title}
                    sx={{ alignItems: 'flex-start' }}
                    startDecorator={icon}
                    variant="soft"
                    color={color}
                    endDecorator={
                        <IconButton variant="soft" color={color} onClick={() => {
                                dispatch(hideNotifi())
                        }}>
                            <CloseRoundedIcon />
                        </IconButton>
                    }
                >
                    <div>
                        <div>{title}</div>
                        <Typography level="body-sm" color={color}>
                            {notifiSlice.content}
                        </Typography>
                    </div>
                </Alert>
            ))}
        </Box>
    );
}