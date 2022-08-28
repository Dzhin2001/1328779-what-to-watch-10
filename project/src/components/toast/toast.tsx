import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TIMEOUT_SHOW_ERROR} from '../../const';

function Toast(): JSX.Element {
  return (
    <ToastContainer
      position="top-left"
      autoClose={TIMEOUT_SHOW_ERROR}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}

export default Toast;
