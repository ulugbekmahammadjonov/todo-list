import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Todos} from "./pages/Todos";
import {Login} from "./pages/Login";
import {SignUp} from "./pages/SignUp";
import Error from "./pages/Error";
import './App.css';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Todos/>}/>
          <Route path={"/login"} element={<Login/>}/>
          <Route path={"/signup"} element={<SignUp/>}/>
          <Route path={"*"} element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
