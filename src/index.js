import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import App from './App';
import reportWebVitals from './reportWebVitals';
import {StateProvider} from './components/StateProvider/StateProvider';
import reducer, {initialState} from './components/StateProvider/reducer';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/js/dist/modal.js'; 
import '../node_modules/bootstrap/js/dist/modal.js.map';


ReactDOM.render(
  <React.StrictMode>
 <StateProvider initialState={initialState} reducer={reducer}>
    <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
