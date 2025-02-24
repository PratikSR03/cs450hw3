import React, { useEffect, useState } from 'react';
import * as d3 from "d3";
import './App.css';
import Child1 from './Child1';
import Child2 from './Child2';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.csv("/tips.csv").then((data) => {
      data.forEach((d) => {
        d.total_bill = +d.total_bill;
        d.tip = +d.tip;
      });
      setData(data);
    });
  }, []);

  return (
    <div className='container'>
      <Child1 data={data} />
      <Child2 data={data} />
    </div>
  );

}

export default App;
