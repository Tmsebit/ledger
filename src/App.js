import { useState, useEffect } from 'react';
import './App.css';
import History from './components/History.js'
import InputArea from './components/InputArea.js'

function App() {
  let today = new Date();
  let nowYear = today.getFullYear();
  let nowMonth = today.getMonth();

  const [his, setHis] = useState([]);
  const [left, setLeft] = useState();

  useEffect(() => {
    const fetchHis = async () => {
      const data = await window.api.readHis();
      setHis(data);
      setLeft(data[0].history[0].left);
      if (his[0].month !== nowMonth+1) {
        addMonth(nowYear, nowMonth+1);
      }
    }
    fetchHis();
  }, []);

  const addMonth = async (year, month) => {
    const updated = await window.api.addMonth(year, month);
    setHis(updated);
  }

  const addHis = async (newHis) => {
    const updated = await window.api.addHis(newHis);
    setHis(updated);
  }

  return (
    <div>
      <InputArea handleHis={addHis} margin={left} handleLeft={setLeft}/>
      {his.length ? <History datum={his[0]}/> : <div>기록이 존재하지 않습니다.</div>}
    </div>
  );
}

export default App;
