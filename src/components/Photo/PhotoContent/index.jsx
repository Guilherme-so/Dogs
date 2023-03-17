import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./photoContent.module.css";
import Image from "../../Helpers/Image/index";
import { useSelector, useDispatch } from "react-redux";
import {
  selectGetModalData,
  selectUserData,
  setModalClose,
} from "../../../Redux/user/userSlice";
import PhotoComments from "../PhotoComments";
import PhotoDelete from "../PhotoDelete";

const PhotoContent = ({ single }) => {
  const router = useNavigate();
  const dispatch = useDispatch();
  const modalData = useSelector(selectGetModalData);
  const data = useSelector(selectUserData);
  const { photo } = modalData;

  function handleRedirectUser(user) {
    dispatch(setModalClose());
    router(`/perfil/${user}`);
  }

  function handleRedirectPhoto(id) {
    dispatch(setModalClose());
    router(`/foto/${id}`);
  }

  return (
    <div className={`${styles.photo} ${single && styles.single}`}>
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title} />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {data && data.username === photo.author ? (
              <PhotoDelete id={photo.id} />
            ) : (
              <span
                className={`${styles.title}`}
                onClick={() => handleRedirectUser(photo.author)}
              >
                @{photo.author}
              </span>
            )}
            <span className={styles.visualisacoes}>{photo.acessos}</span>
          </p>
          <h1 className={`${styles.title} title`}>
            <span onClick={() => handleRedirectPhoto(photo.id)}>
              {photo.title}
            </span>
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
