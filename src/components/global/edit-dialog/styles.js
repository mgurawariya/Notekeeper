import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

const editDialogStyle = makeStyles(() => {
    const theme = useTheme();
 return {
    infoBody: {
        display: 'flex',
    },
    footerBtn: {
        padding: '10px'
    },
    dialogContent: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2, 0)
        }
    },
    footerBtn: {
        padding: theme.spacing(3)
    },
    // textArea: {
    //     '& .MuiOutlinedInput-root': {
    //         borderRadius: "0rem 0.25rem 0.25rem 0rem"
    //     }
    // },
    // addInfoBtnBody: {
    //     display: "flex"
    // },
    // addInfoBtn: {
    //     textDecoration: "underline",
    //     cursor: "pointer",
    //     color: theme.palette.grey[500],
    //     fontSize:"0.8em",
    //     width: "30%"
    // },
    // serialText: {
    //     color: theme.palette.grey[500],
    //     cursor: "pointer",
    //     fontSize:"0.8em",
    //     paddingLeft:"7px",
    //     display: "-webkit-box",
    // wordBreak: "break-word",
    // width: "70%"
    // }
}
}
);
export default editDialogStyle;