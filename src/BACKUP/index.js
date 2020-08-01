/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();*/


import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom"
import App from './App'
import './index.css'
//import { library } from '@fortawesome/fontawesome-svg-core'
//import {
//  faPlus, faChevronLeft, faTrashAlt, faCheckDouble
//} from '@fortawesome/free-solid-svg-icons'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);


