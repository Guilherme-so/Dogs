import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { ReactComponent as Dogs } from "../Assets/dogs.svg";

import { useSelector } from "react-redux";
import {
  getUserData,
  IsloggedIn,
  getLoginStatus,
  getError
} from "../Redux/user/userSlice";

const Header = () => {
  const data = useSelector(getUserData);
  const isLogin = useSelector(IsloggedIn);
  const status = useSelector(getLoginStatus);
  const error = useSelector(getError);

  console.log("data", data);
  console.log("isLogin", isLogin);
  console.log("status", status);
  console.log("error", error);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/">
          <Dogs />
        </Link>

        {data ? (
          <Link className={styles.login} to="/conta">
           {data.username}
          </Link>
        ) : (
          <Link className={styles.login} to="/login">
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
