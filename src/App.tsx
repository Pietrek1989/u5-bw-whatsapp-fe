import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
      <div className="App" id="parent-container">
        <div id="top-bg"></div>
        <div id="lower-bg">
          <Routes>
            <Route element={<MainPage />} path="/main" />
            <Route element={<Login />} path="/" />
            <Route element={<Register />} path="/register" />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
