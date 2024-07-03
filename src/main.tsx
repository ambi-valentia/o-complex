import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { Provider } from "react-redux";
import { setupStore } from "./store/store.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";

const store = setupStore();

export const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
