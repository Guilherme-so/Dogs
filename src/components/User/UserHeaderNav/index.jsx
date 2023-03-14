import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as MinhasFotos } from "../../../Assets/feed.svg";
import { ReactComponent as Estatisticas } from "../../../Assets/estatisticas.svg";
import { ReactComponent as Adicionar } from "../../../Assets/adicionar.svg";
import { ReactComponent as Sair } from "../../../Assets/sair.svg";
import styles from "./userHeaderNav.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/user/userSlice";
import useMobile from "../../../Hooks/useMobile";

function UserHeaderNav() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [active, setActive] = useState(1);
  const mobile = useMobile("(max-width: 600px)");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    switch (pathname) {
      case "/conta/estatisticas":
        setActive(2);
        break;
      case "/conta/postar":
        setActive(3);
        break;
      default:
        setActive(1);
        break;
    }
  }, [pathname]);

  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      {mobile && (
        <button
          aria-label="ToogleMenu"
          className={`${styles.toogleMenuMobile} ${
            mobileMenu && styles.toogleMenuMobileActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <Link to="/conta" className={`${active === 1 && styles.active}`}>
          <MinhasFotos width="28" height="28" fill="#333" />
          {mobile && "Minhas Fotos"}
        </Link>
        <Link
          to="/conta/estatisticas"
          className={`${active === 2 && styles.active}`}
        >
          <Estatisticas width="28" height="28" />
          {mobile && "Estatisticas"}
        </Link>
        <Link to="/conta/postar" className={`${active === 3 && styles.active}`}>
          <Adicionar width="28" height="28" />
          {mobile && "Adicionar Foto"}
        </Link>
        <button onClick={() => dispatch(logout())}>
          <Sair width="28" height="28" />
          {mobile && "Sair"}
        </button>
      </nav>
    </>
  );
}

export default UserHeaderNav;
