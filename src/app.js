import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';

function App({ name }) {
  const [state, setState] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const p = await fetch('https://edurpap2.asia.edu.tw/app_api/api/app_04/poi_list');
      const res = await p.json();
      setState(res);
    }
    // fetchData();
  }, []);
  return (
    <>
      <div>{state}</div>
      <div>
        <input type='text' name='username' />
      </div>
      <button type='submit'>Submit</button>
    </>
  );
}

export default hot(App);
