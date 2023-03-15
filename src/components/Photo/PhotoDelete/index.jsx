import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { foto_delete } from "../../../Redux/user/authAsyncActions";
import { selectUserStatus } from "../../../Redux/user/userSlice";
import styles from "./photoDelete.module.css";

const PhotoDelete = ({ id }) => {
  const dispatch = useDispatch();
  const status = useSelector(selectUserStatus);

  const handleClick = async () => {
    const confirm = window.confirm("Tem certeza que deseja deletar?");
    if (confirm) {
      dispatch(foto_delete(id));
    }
  };

  return (
    <>
      {status === "pending" ? (
        <button disabled className={styles.delete}>
          Deletando...
        </button>
      ) : (
        <button onClick={handleClick} className={styles.delete}>
          Deletar
        </button>
      )}
    </>
  );
};

export default PhotoDelete;
