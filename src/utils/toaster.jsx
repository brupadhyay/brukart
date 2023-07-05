import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const toastStyle = {
  position: "bottom-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

const toastNotification = (type, command) => {
  switch (type) {
    case "SUCCESS":
      toast.success(command, toastStyle);
      break;

    case "ERROR":
      toast.error(command, toastStyle);
      break;

    case "WARNING":
      toast.warn(command, toastStyle);
      break;

    default:
      toast.info(command, toastStyle);
      break;
  }
};

export { toastNotification };
