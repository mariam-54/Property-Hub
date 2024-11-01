import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout/Layout.jsx";
import Approutes from "./Routes/routes.jsx";
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Layout>
        <ToastContainer/>
        <Approutes />
      </Layout>
    </>
  );
}

export default App;

