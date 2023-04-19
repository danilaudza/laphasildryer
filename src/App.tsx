import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Front from "./Pages/Front";
import NotFound from "./Components/NotFound";
import MultiField2 from "./Components/MultiField2";
const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Front />} />

            {/* <Route path="test" element={<MultiField2/>} /> */}

          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
