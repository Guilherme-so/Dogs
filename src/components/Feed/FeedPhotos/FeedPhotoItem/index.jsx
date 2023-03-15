import React from "react";
import styles from "./feedPhotoItem.module.css";

function FeedPhotoItem({ foto }) {
  return (
    <li className={styles.photo}>
      <img src={foto.src} alt={foto.title} />
      <span className={styles.visualisacao}>{foto.acessos}</span>
    </li>
  );
}

export default FeedPhotoItem;
