import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../Forms/Input";
import Button from "../../Forms/Button/Index";
import useForm from "../../../Hooks/useForm";
import styles from "./userPhotoPost.module.css";
import { postFoto } from "../../../Redux/user/authAsyncActions";
import {
  selectUserError,
  selectUserStatus,
} from "../../../Redux/user/userSlice";

function UserPhotoPost() {
  const nome = useForm();
  const peso = useForm("number");
  const idade = useForm("number");
  const [img, setImg] = useState({});

  const dispatch = useDispatch();
  const error = useSelector(selectUserError);
  const status = useSelector(selectUserStatus);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", img.image);
    formData.append("nome", nome.value);
    formData.append("peso", peso.value);
    formData.append("idade", idade.value);
    dispatch(postFoto(formData));
  }

  function handleChange(e) {
    setImg({
      image: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0]),
    });
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...nome} />
        <Input label="Peso" type="number" name="peso" {...peso} />
        <Input label="Idade" type="number" name="idade" {...idade} />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleChange}
        />

        {error && <p className="error">{error}</p>}

        {status === "pending" ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
}

export default UserPhotoPost;
