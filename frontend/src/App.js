import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import "./App.css";

const App = () => (
  <BrowserRouter>
    <Routes>
    <Route exact path="/" Component={SignUp} />
      <Route exact path="/signup/" Component={SignUp} />
      <Route exact path="/login/" Component={Login} />
      <Route exact path="/Home" Component={Home} />
    </Routes>
  </BrowserRouter>
);

export default App;