// import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify";

const showSuccessToast = (message: string) => {
  
    // toast.success(message, {
    //     position: toast.POSITION.TOP_RIGHT,
    //     autoClose:1500
    // });
};

const showErrorToast = (message: string) => {
    // toast.error(message, {
    //     position: toast.POSITION.TOP_RIGHT,
    //     autoClose:3000
    // });
};

export const showToast = (type: string, message: string) => {

    switch (type) {
        case "success": {
            showSuccessToast(message);
            break;
        }
        case "error": {
            showErrorToast(message);
            break;
        }
        default: {
            break;
        }
    }
};
