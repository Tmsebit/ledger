import { useState } from 'react';
import styles from './InputArea.module.css';

function InputArea({handleHis, margin, handleLeft}){
  let today = new Date();
  let nowDay = today.getDate();

  const [field, setField] = useState("");
  const [detail, setDetail] = useState("");
  const [income, setIncome] = useState(0);
  const [expenditure, setExpenditure] = useState(0);

  const adding = () => {
    if (field.trim() === "") return;
    if (detail.trim() === "") return;

    handleHis({"day" : nowDay, "field" : field, "detail" : detail, "income" : income, "expenditure" : expenditure, "left" : Number(margin)-Number(expenditure)+Number(income)});
    handleLeft(Number(margin)-Number(expenditure)+Number(income));

    setField("");
    setDetail("");
    setIncome(0);
    setExpenditure(0);
  }

  return (
    <div className={styles.bigBox}>
      <div className={styles.box}>
        <div className={styles.subtitle}>분류</div>
        <div className={styles.subtitle}>세부사항</div>
        <div className={styles.subtitle}>수입</div>
        <div className={styles.subtitleEnd}>지출</div>
      </div>
      <div className={styles.inputBox}>
        <div className={styles.inputContainer}><input className={styles.input} type='text' value={field} onChange={(event) => setField(event.target.value)} placeholder='분류' /></div>
        <div className={styles.inputContainer}><input className={styles.input} type='text' value={detail} onChange={(event) => setDetail(event.target.value)} placeholder='세부사항' /></div>
        <div className={styles.inputContainer}><input className={styles.input} type='number' value={income} onChange={(event) => setIncome(event.target.value)} placeholder='수입' /></div>
        <div className={styles.inputContainerEnd}><input className={styles.input} type='number' value={expenditure} onChange={(event) => setExpenditure(event.target.value)} placeholder='지출' /></div>
        <div className={styles.buttonBox}><button className={styles.button} onClick={adding}>입력</button></div>
      </div>
    </div>
  );
}

export default InputArea;