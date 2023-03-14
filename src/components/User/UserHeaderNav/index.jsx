import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ReactComponent as MinhasFotos } from "../../../Assets/feed.svg";
import { ReactComponent as Estatisticas } from "../../../Assets/estatisticas.svg";
import { ReactComponent as Adicionar } from "../../../Assets/adicionar.svg";
import { ReactComponent as Sair } from "../../../Assets/sair.svg";
import styles from "./userHeaderNav.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/user/userSlice";

function UserHeaderNav() {
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState(null);

  //   const location = useLocation();
  //   const [active, setActive] = useState(1);
  //   useEffect(() => {
  //     switch (location.pathname) {
  //       case "/conta/estatisticas":
  //         setActive(2);
  //         break;
  //       case "/conta/postar":
  //         setActive(3);
  //         break;
  //       default:
  //         setActive(1);
  //         break;
  //     }
  //   }, [location]);

  return (
    <>
      <nav className={styles.nav}>
        <NavLink
          to="/conta"
          end
          //active jeito nextjs
          //   className={active === 1 ? styles.active : ""}
          //active jeito reactjs
          activeClassName={styles.active}
        >
          <MinhasFotos width="28" height="28" fill="#333" />
          {mobile && "Minhas Fotos"}
        </NavLink>
        <NavLink
          to="/conta/estatisticas"
          //active jeito nextjs
          //   className={active === 2 ? styles.active : ""}
          //active jeito reactjs
          activeClassName={styles.active}
        >
          <Estatisticas width="28" height="28" />
          {mobile && "Estatisticas"}
        </NavLink>
        <NavLink
          to="/conta/postar"
          //active jeito nextjs
          //   className={active === 3 ? styles.active : ""}
          //active jeito reactjs
          activeClassName={styles.active}
        >
          <Adicionar width="28" height="28" />
          {mobile && "Adicionar Foto"}
        </NavLink>
        <button onClick={() => dispatch(logout())}>
          <Sair width="28" height="28" />
          {mobile && "Sair"}
        </button>
      </nav>
    </>
  );
}

export default UserHeaderNav;
