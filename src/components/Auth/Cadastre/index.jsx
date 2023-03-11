import React from "react";
import useForm from "../../../Hooks/useForm";
import Input from "../../Forms/Input/index";
import Button from "../../Forms/Button/Index";
import styles from "./cadastre.module.css";

function LoginCreate() {
  const username = useForm();
  const email = useForm("email");
  const password = useForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <section className={`${styles.cadastre} animeLeft`}>
      <form onSubmit={handleSubmit} className={styles.forms}>
        <h1 className="title">Cadastre-se</h1>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button>Cadastrar</Button>

        {/* {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )} */}
        {/* <Error error={error} /> */}
      </form>
    </section>
  );
}

export default LoginCreate;
