import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Front from "./Pages/Front";
import NotFound from "./Components/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Front />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
