import styles from './InputArea.module.css';

function InputArea(){
  return (
    <form className={styles.box}>
      <input />
      <input />
      <input />
      <input />
      <button>입력</button>
    </form>
  );
}

export default InputArea;