import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as Dogs } from "../Assets/dogs.svg";
import { logout, selectUserData } from "../Redux/user/userSlice";
import styles from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectUserData);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/">
          <Dogs />
        </Link>

        {data ? (
          <Link className={styles.login} to="/conta">
            {data.username}
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(logout());
              }}
            >
              Sair
            </button>
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
