import styles from './History.module.css';

function History({ data }) {
  console.log(`히스 ${data}`);

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
      <summary>{`${data.year}년 ${data.month}월`}</summary>
      {data.history.map((his, index) => {
        return (
          <div>
            <div>{`${data.year}/${data.month}/${his.day}`}</div>
            <div>{his.field}</div>
            <div>{his.detail}</div>
            <div>{his.income}</div>
            <div>{`-${his.expenditure}`}</div>
            <div>{his.left}</div>
          </div>
        );
      })}
    </details>
  );
}

export default History;