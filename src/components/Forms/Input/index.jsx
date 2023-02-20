import styles from "./Input.module.css";

const Input = ({ type, label, name, value, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input className={styles.input} id={name} type={type} value={value} onChange={onChange} />
      <p className={styles.error}>error</p>
    </div>
  );
};

export default Input;
