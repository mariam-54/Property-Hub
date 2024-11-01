import { createRoot } from "react-dom/client";
import ThemeProvider from "./context/ThemeContext.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";


createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <Provider store={store}>
      <Router basename="/">
        <App />
      </Router>
    </Provider>
  </ThemeProvider>
);
