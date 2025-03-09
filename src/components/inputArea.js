import { useState } from 'react';
import styles from './InputArea.module.css';

function InputArea({handleHis, margin, handleLeft}){
  let today = new Date();
  let nowDay = today.getDay();

  const [field, setField] = useState("");
  const [detail, setDetail] = useState("");
  const [income, setIncome] = useState(0);
  const [expenditure, setExpenditure] = useState(0);

  const adding = () => {
    if (field.trim() === "") return;
    if (detail.trim() === "") return;
    if (income.trim() === "") return;
    if (expenditure.trim() === "") return;

    handleHis({"day" : nowDay, "field" : field, "detail" : detail, "income" : income, "expenditure" : expenditure, "left" : margin-expenditure+income});
    handleLeft(margin-expenditure+income);

    setField("");
    setDetail("");
    setIncome(0);
    setExpenditure(0);
  }

  return (
    <form className={styles.box}>
      <input type='text' value={field} onChange={(event) => setField(event.target.value)} placeholder='분류' />
      <input type='text' value={detail} onChange={(event) => setDetail(event.target.value)} placeholder='세부사항' />
      <input type='number' value={income} onChange={(event) => setIncome(event.target.value)} placeholder='수입' />
      <input type='number' value={expenditure} onChange={(event) => setExpenditure(event.target.value)} placeholder='지출' />
      <button onClick={adding}>입력</button>
    </form>
  );
}

export default InputArea;