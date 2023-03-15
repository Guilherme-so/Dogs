import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { foto_Get } from "../../../Redux/user/authAsyncActions";
import {
  selectGetModal,
  selectGetModalData,
  selectGetModalError,
  selectGetModalStatus,
  setModalClose,
} from "../../../Redux/user/userSlice";
import PhotoContent from "../../Photo/PhotoContent";
import styles from "./feedModal.module.css";

function FeedModal() {
  const dispatch = useDispatch();
  const modal = useSelector(selectGetModal);
  const modalData = useSelector(selectGetModalData);
  const modalStatus = useSelector(selectGetModalStatus);
  const modalError = useSelector(selectGetModalError);

  useEffect(() => {
    dispatch(foto_Get(modal?.id));
  }, [modal, modalData, dispatch]);

  function closeModal(e) {
    if (e.target === e.currentTarget) {
      dispatch(setModalClose());
    }
  }

  return (
    <div className={styles.modal} onClick={closeModal}>
      {modalError && <p className="error">{modalError}</p>}
      {modalStatus === "pending" && <p>Loading...</p>}
      {modalData && <PhotoContent />}
    </div>
  );
}

export default FeedModal;
