import styles from './History.module.css';

function History({ data }) {
  if (data.history.length === 0){
    return(
      <details>
        <summary>{`${data.year}년 ${data.month}월`}</summary>
        <div>내역 없음</div>
      </details>
    );
  }

  return(
    <details>
      <summary className={styles.title}>{`${data.year}년 ${data.month}월`}</summary>
      <div className={styles.box}>
        <div className={styles.contentDateAlter}>날짜</div>
        <div className={styles.contentBoxAlter}>분류</div>
        <div className={styles.contentBoxAlterBig}>세부사항</div>
        <div className={styles.contentBoxAlter}>수입</div>
        <div className={styles.contentBoxAlter}>지출</div>
        <div className={styles.contentBoxAlter}>잔액</div>
      </div>
      {data.history.map((his, index) => {
        return (
          <div className={styles.box}>
            <div className={styles.contentDate}>{`${data.year}/${data.month}/${his.day}`}</div>
            <div className={styles.contentBox}>{his.field}</div>
            <div className={styles.contentBoxBig}>{his.detail}</div>
            <div className={styles.contentBox}>{his.income}</div>
            <div className={styles.contentBox}>{his.expenditure===0 ? 0 : `-${his.expenditure}`}</div>
            <div className={styles.contentBox}>{his.left}</div>
          </div>
        );
      })}
    </details>
  );
}

export default History;