const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config.js');
const session = require('express-session');
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
mongoose.connect(keys.mongoURI);
const users = [
  {id: 1, name: 'demo', login: 'demo1', password: 'qwe'},
  {id: 2, name: 'demo2', login: 'demo2', password: 'qwe'},
]
const app = express();
app.use(express.static('public'));

console.log('==================start====================');
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true
//   }));
//<< cookies
app.use(session({
  name: 'sid',
  secret: keys.cookieKey, 
  saveUninitialized: false, 
  resave: true,
  cookie: {
    maxAge: 60000,
    sameSite: true,
    secure: true,
  },
  
}))
// }))
//>>
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
// app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/static', express.static('public'))

require('./routes/getRoutes')(app);
// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))

// Right before your app.listen(), add this:
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html")); 
});
//
if (config.prod)
  app.listen(process.env.PORT);
else
  app.listen(4000);
console.log('===============end=================');
