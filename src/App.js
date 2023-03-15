import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import LoginForm from "./components/Auth/Login/index.jsx";
import LoginPasswordLost from "./components/Auth/PasswordLost";
import LoginCreate from "./components/Auth/Cadastre";
import LoginPasswordReset from "./components/Auth/PasswordReset";
import "./App.css";
import { useDispatch } from "react-redux";
import { autoLogin } from "./Redux/user/authAsyncActions";
import User from "./components/User";
import ProtectedRoute from "./components/Helpers/ProtectedRoute";
import UserLayout from "./components/Layout/userLayout";
import Feed from "./components/Feed";
import UserPhotoPost from "./components/User/UserPhotoPost";
import UserStats from "./components/User/UserStats";

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

          <Route path="/conta"element={<UserLayout><ProtectedRoute /></UserLayout>}>
            <Route index element={<Feed />} />
            <Route path="postar" element={<UserPhotoPost />} />
            <Route path="estatisticas" element={<UserStats />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
