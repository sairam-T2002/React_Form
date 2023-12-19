import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navigation from "./pages/Navigation";
import Form from "./pages/Form";
import FormData from "./pages/FormData";
import NoPage from "./pages/Nopage";
import "./App.css";

function App() {
  const userArrState = useState([]);
  const userUpdate = useState({});
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigation userUpdate={userUpdate} />}>
          <Route
            index
            element={
              <Form userArrState={userArrState} userUpdate={userUpdate} />
            }
          />
          <Route
            path="display"
            element={
              <FormData userArrState={userArrState} userUpdate={userUpdate} />
            }
          />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
