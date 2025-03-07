import styles from './History.module.css';

function History({ history }) {
  
  return(
    <details>
      <summary>{`${history.year}년 ${history.month}월`}</summary>
      {history.history.map((his, index) => {
        return (
          <div>
            <div>{`${history.year}/${history.month}/${his.day}`}</div>
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