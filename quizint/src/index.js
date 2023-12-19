import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MyContextProvider from "./MyContextProvider";

import App from "./App";
import NotFound from "./NotFound";

import Quizint from "./Quizint";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MyContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/quizint/:quizletId" element={<Quizint />} />
        <Route path="/quizint/:quizletId/:mode" element={<Quizint />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </MyContextProvider>
);
