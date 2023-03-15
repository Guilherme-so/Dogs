import React from "react";
import { useDispatch } from "react-redux";
import { setModalOpen } from "../../../../Redux/user/userSlice";
import Image from "../../../Helpers/Image/index";
import styles from "./feedPhotoItem.module.css";

function FeedPhotoItem({ foto }) {
  const dispatch = useDispatch();

  return (
    <li className={styles.photo} onClick={() => dispatch(setModalOpen(foto))}>
      <Image src={foto.src} alt={foto.title} />
      <span className={styles.visualisacao}>{foto.acessos}</span>
    </li>
  );
}

export default FeedPhotoItem;
