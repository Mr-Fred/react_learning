import ReactDOM from "react-dom/client";
import {BrowserRouter } from "react-router-dom";
import AppWithApollo from "./components/AppWithAppollo";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppWithApollo />
  </BrowserRouter>
);
