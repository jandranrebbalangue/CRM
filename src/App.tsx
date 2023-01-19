import React from "react"
import FullPageSpinner from "./pages/components/FullPageSpinner";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
const List = React.lazy(async () => await import("./pages/Clients/List"));
const Add = React.lazy(async () => await import("./pages/Clients/Add"));
const View = React.lazy(async () => await import("./pages/Clients/View"));
const Edit = React.lazy(async () => await import("./pages/Clients/Edit"));

function App(): JSX.Element {

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/add" element={<Add />} />
          <Route path="/user/:id" element={<View />} />
          <Route path="/user/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </React.Suspense>
  );
}

export default App;
