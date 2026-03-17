import { AppRouter } from './router/AppRouter';
import { ToastContainer } from 'react-toastify';

export const App = () => {
  return <>
    <AppRouter />
    <ToastContainer
      position="top-right"
      autoClose={2500}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
    />
  </>;
};
