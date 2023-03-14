import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactComponent as Dogs } from "../../Assets/dogs.svg";
import { selectUserData } from "../../Redux/user/userSlice";
import styles from "./Header.module.css";

const Header = () => {
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
