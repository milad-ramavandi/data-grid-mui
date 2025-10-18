import DataGridComponent from "./components/data-grid-component";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeMUIProvider from "./providers/ThemeMUIProvider";

const App = () => {
  return (
    <ReactQueryProvider>
      <ThemeMUIProvider>
        <DataGridComponent />
      </ThemeMUIProvider>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </ReactQueryProvider>
  );
};

export default App;
