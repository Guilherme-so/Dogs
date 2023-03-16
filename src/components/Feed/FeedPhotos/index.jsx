import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fotos_Get } from "../../../Redux/user/authAsyncActions";
import {
  selectGetFotos,
  selectUserStatus,
  selectUserError,
  selectUserData,
} from "../../../Redux/user/userSlice";
import Loading from "../../Helpers/Loading";
import FeedPhotoItem from "./FeedPhotoItem";
import styles from "./feedPhotos.module.css";

function FeedPhotos() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const data = useSelector(selectUserData);
  const fotos = useSelector(selectGetFotos);
  const status = useSelector(selectUserStatus);
  const error = useSelector(selectUserError);

  let render = pathname === "/conta" ? data?.id : 0;

  useEffect(() => {
    dispatch(fotos_Get({ page: 1, total: 6, user: render }));
  }, [render, dispatch]);

  if (status === "pending") return <Loading />;
  if (error) return <p className="error">{error}</p>;
  return (
    <ul className={styles.feed}>
      {fotos?.map((foto) => {
        return <FeedPhotoItem key={foto.id} foto={foto} />;
      })}
    </ul>
  );
}

export default FeedPhotos;
