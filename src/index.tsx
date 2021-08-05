import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import reportWebVitals from './reportWebVitals';
import startAuth from "./setupAPI";

startAuth().then(
  (success) => {
    ReactDOM.render(
      <React.StrictMode>
        <App loadingApp={success}/>
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
