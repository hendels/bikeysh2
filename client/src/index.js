import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import registerServiceWorker from './registerServiceWorker';
import config from './config/config.js';

require('dotenv').config();
if (config.prod)
    axios.defaults.baseURL  = process.env.PORT;
else
    axios.defaults.baseURL  = 'http://localhost:4000'; 
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
