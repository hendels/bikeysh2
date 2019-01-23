import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import registerServiceWorker from './registerServiceWorker';

require('dotenv').config();
// axios.defaults.baseURL  = 'http://localhost:4000';
axios.defaults.baseURL  = process.env.PORT;
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:4000';
// axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST';
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'X-PINGOTHER, Content-Type';
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
