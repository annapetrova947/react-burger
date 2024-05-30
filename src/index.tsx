import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { legacy_createStore as createStore } from "redux";
import { applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Provider } from "react-redux";

// Корневой редьюсер, который обрабатывает экшены
import { rootReducer } from "./services/reducers/rootReducer";

// Инициализируем хранилище с помощью корневого редьюсера
import { configureStore } from "@reduxjs/toolkit";

const enhancer =
  typeof window === "object" && (window as any).REDUX_DEVTOOLS_EXTENSION_COMPOSE
    ? (window as any).REDUX_DEVTOOLS_EXTENSION_COMPOSE({})
    : compose;

const store = createStore(rootReducer, enhancer(applyMiddleware(thunk)));

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </DndProvider>,
  );
} else {
  throw new Error('Root element with id "root" not found.');
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
