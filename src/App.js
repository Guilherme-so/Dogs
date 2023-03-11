import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import LoginForm from "./components/Login/LoginForm";
import LoginCreate from "./components/Login/LoginCreate";
import LoginPasswordLost from "./components/Login/LoginPasswordLost";
import LoginPasswordReset from "./components/Login/LoginPasswordReset";
import "./App.css";
import { useDispatch } from "react-redux";
import { autoLogin } from "./Redux/user/userSlice";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="/login">
            <Route index element={<LoginForm />} />
            <Route path="perdeu" element={<LoginPasswordLost />} />
            <Route path="criar" element={<LoginCreate />} />
            <Route path="resetar" element={<LoginPasswordReset />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
