import React, { useState } from "react";
import { ReactComponent as Enviar } from "../../../Assets/enviar.svg";
import { useDispatch } from "react-redux";
import { foto_comment } from "../../../Redux/user/authAsyncActions";
import styles from "./photoCommentsForm.module.css";

function PhotoCommentsForm({ id }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(foto_comment({id, comment }));
    setComment("")
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        id="comment"
        name="comment"
        placeholder="Comente..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button className={styles.button}>
        <Enviar width="43" height="31" />
      </button>
    </form>
  );
}

export default PhotoCommentsForm;
