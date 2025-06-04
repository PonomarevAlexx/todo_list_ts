import React from "react";
import { createRoot } from "react-dom/client";
import "./index.module.css";
import App from "./App";
import { store } from "./store/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
