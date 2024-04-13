import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { Provider } from "react-redux";
import { setupStore } from "./store/store.tsx";

const store = setupStore();

export const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
