const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cors = require('cors');
require('./models/bmart_crank');
require('./models/bmart_dhframe');
require('./models/bmart_enduroframe');
require('./models/bmart_hub');
require('./models/bmart_wheel');

mongoose.connect(keys.mongoURI);

const app = express();
console.log('==================start====================');
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
require('./routes/getRoutes')(app);



app.listen(4000);
console.log('===============end=================');
