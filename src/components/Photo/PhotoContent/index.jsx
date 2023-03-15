import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./photoContent.module.css";
import Image from "../../Helpers/Image/index";
import { useSelector } from "react-redux";
import {
  selectGetModalData,
  selectUserData,
} from "../../../Redux/user/userSlice";
import PhotoComments from "../PhotoComments";
import PhotoDelete from "../PhotoDelete";

const PhotoContent = () => {
  const modalData = useSelector(selectGetModalData);
  const data = useSelector(selectUserData);
  const { photo } = modalData;

  return (
    <div className={`${styles.photo}`}>
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title} />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {data && data.username === photo.author ? (
              <PhotoDelete id={photo.id} />
            ) : (
              <Link to={`/perfil/${photo.authot}`}>@{photo.author}</Link>
            )}
            <span className={styles.visualisacoes}>{photo.acessos}</span>
          </p>
          <h1 className="title">
            <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={styles.attributes}>
            <li>{photo.peso} kg</li>
            <li>{photo.idade} anos</li>
          </ul>
        </div>
      </div>
      <PhotoComments id={photo.id} />
    </div>
  );
};

export default PhotoContent;
