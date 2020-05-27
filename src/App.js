import React, {useState} from 'react';
import './App.css';
import {Bar} from './Components/Bar'
import axios from'axios'

function App() {
  const [input,setInput] = useState('')
  const [data, setData] = useState([])
  const [max,setMax] = useState(0)

  const dataArray = []
  async function getData(){
    var result = await axios.get('/v1/cryptocurrency/quotes/latest',
    {
        params: {symbol: input},
        headers: { 'X-CMC_PRO_API_KEY': 'ef0ea64e-9214-4d0f-8135-e4baac946eaf' },
        json : true,
        gzip : true
    })
    return result.data.data
  }
  const onSubmit = e => {
    e.preventDefault();
    if(input){
      getData().then(function(data){
        var tempMax = 0;
        for(var key in data){
          dataArray.push(data[key])
          if(data[key].quote.USD.price > tempMax){
            tempMax = data[key].quote.USD.price
          }
        }
        setMax(tempMax)
        setData(dataArray)
      });
    }
  }

  return (
    <div className="App">
      <h1 style={{fontWeight:700, color:"green"}}>BITCOINS</h1>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value.toUpperCase())} placeholder="BITCOIN CODE" />
        </div>
      </form>
      <div style={{display: "inline-block", height: "125px", overflow:"hidden", marginTop: "50px"}}>
      {data.map(value => (<Bar key={value.id} data={value} max={max}></Bar>))}
      </div>
    </div>
  );
}

export default App;
