const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const authApi = require('./api/authApi');
const adoptionApi = require('./api/adoptionApi');
const dataApi = require('./api/dataApi');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

});

// Use the authentication, adoption, and data APIs
app.use('/auth', authApi);
app.use('/adoption', adoptionApi);
app.use('/data', dataApi);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
