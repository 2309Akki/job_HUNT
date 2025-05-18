import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { persistStore } from "redux-persist";

import { PersistGate } from "redux-persist/integration/react";
const persistor=persistStore(store);
const rootElement = document.getElementById("root");

if (!rootElement) {
  // console.error("No root element found!");
} else {
  createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

      <App />
        </PersistGate>
      </Provider>
      <Toaster/>
    </React.StrictMode>
  );
}
