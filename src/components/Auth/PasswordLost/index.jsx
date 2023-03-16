import React from "react";
import useForm from "../../../Hooks/useForm";
import Input from "../../Forms/Input";
import Button from "../../Forms/Button/Index";
import styles from "./passwordLost.module.css";

function LoginPasswordLost() {
  const email = useForm();

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className={`${styles.passwordLost} animeLeft`}>
      <form onSubmit={handleSubmit} className={styles.forms}>
        <h1 className="title">Perdeu a senha?</h1>
        <Input label="Email / Usuario" type="text" name="login" {...email} />
        <Button>Enviar Email</Button>

        {/* {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar Email</Button>
        )} */}
      </form>
    </section>
  );
}

export default LoginPasswordLost;
