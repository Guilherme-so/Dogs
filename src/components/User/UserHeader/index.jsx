import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserHeaderNav from "../UserHeaderNav";
import styles from "./userHeader.module.css";

function UserHeader() {
  const [titulo, setTitulo] = useState("");
  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    switch (location.pathname) {
      case "/conta/postar":
        setTitulo("Postar Foto");
        break;
      case "/conta/estatisticas":
        setTitulo("Estatisticas");
        break;
      default:
        setTitulo("Minha conta");
        break;
    }
  }, [location]);

  return (
    <header className={styles.header}>
      <h1 className="title">{titulo}</h1>
      <UserHeaderNav />
    </header>
  );
}

export default UserHeader;
