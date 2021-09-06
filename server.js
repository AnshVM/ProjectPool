const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }) 
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.listen(port,()=>{
    console.log(`Server up on port ${port}`)
})