import ReactQueryProvider from "./providers/ReactQueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeMUIProvider from "./providers/ThemeMUIProvider";
import AppRouterProvider from "./providers/AppRouterProvider";

const App = () => {
  return (
    <ReactQueryProvider>
      <ThemeMUIProvider>
        <AppRouterProvider/>
      </ThemeMUIProvider>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </ReactQueryProvider>
  );
};

export default App;
