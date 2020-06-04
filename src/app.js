import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

function Hello() {
  return <div>Hello World</div>;
}

function Notify() {
  useEffect(() => {
    notify();
  }, []);

  const notify = async () => {
    const p = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });

    await p;
    console.log('notify');
  };
  return <div>Notify Works!!</div>;
}

function App() {
  return (
    <Router>
      <Link to="/">Hello</Link>
      <Link to="/Notify">Notify</Link>

      <Route path="/" exact component={Hello}></Route>
      <Route path="/Notify" component={Notify}></Route>
    </Router>
  );
}

export default hot(App);
