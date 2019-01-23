const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cors = require('cors');
//<<post dependencies
const bodyParser = require('body-parser');
const path = require('path');
//>>
require('dotenv').config();
require('./models/bmart_crank');
require('./models/bmart_dhframe');
require('./models/bmart_enduroframe');
require('./models/bmart_hub');
require('./models/bmart_wheel');
// mongoose.connect(keys.mongoURI);
mongoose.connect(process.env.MONGODB);

const app = express();
app.use(express.static('public'));

console.log('==================start====================');
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/static', express.static('public'))

require('./routes/getRoutes')(app);

app.listen(process.env.PORT || 4000);
console.log('===============end=================');
