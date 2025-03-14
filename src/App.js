import { useState, useEffect } from 'react';
import styles from './App.module.css';
import History from './components/History.js'
import InputArea from './components/InputArea.js'

function App() {
  let today = new Date();
  let nowYear = today.getFullYear();
  let nowMonth = today.getMonth();

  const [his, setHis] = useState([]);
  const [left, setLeft] = useState();
  const [monthIndex, setMonthIndex] = useState(0);

  const addHis = async (newHis) => {
    const updated = await window.api.addHis(newHis);
    setHis(updated);
  }

  const handleSelect = (event) => {
    setMonthIndex(event.target.value);
  }

  useEffect(() => {
    const fetchHis = async () => {
      let data = await window.api.readHis();
      if (data.length === 0){
        setLeft(0);
        data = await window.api.addMonth(nowYear, nowMonth+1);
      } else if (data[0].history.length !== 0){
        setLeft(data[0].history[0].left);
      }
      if (data[0].month !== nowMonth+1) {
        data = await window.api.addMonth(nowYear, nowMonth+1)
      }
      setHis(data);
    }
    fetchHis();

  }, []);

  return (
    <div className={styles.window}>
      <div>
        <select onChange={handleSelect} value={monthIndex}>
          {his.map((mon, index) => {
            return(
              <option value={index} key={index}>{`${mon.year}/${mon.month}`}</option>
            );
          })}
        </select>
        <InputArea handleHis={addHis} margin={left} handleLeft={setLeft}/>
        {his.length !== 0 ? <History data={his[monthIndex]}/> : <div>기록이 존재하지 않습니다.</div>}
      </div>
    </div>
  );
}

export default App;