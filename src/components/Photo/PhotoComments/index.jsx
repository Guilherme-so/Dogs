import React from "react";
import { useSelector } from "react-redux";
import {
  selectGetModalData,
  selectUserToken,
} from "../../../Redux/user/userSlice";
import PhotoCommentsForm from "../PhotoCommentsForm";
import styles from "./photoComments.module.css";

function PhotoComments({ id }) {
  const token = useSelector(selectUserToken);
  const modalData = useSelector(selectGetModalData);
  const {comments } = modalData;

  return (
    <div>
      <ul className={styles.comments}>
        {comments?.map((comment) => (
          <li key={comment.comment_ID}>
            <b>
              {comment.comment_author} : <span>{comment.comment_content}</span>
            </b>
          </li>
        ))}
      </ul>
      {token && <PhotoCommentsForm id={id} />}
    </div>
  );
}

export default PhotoComments;
