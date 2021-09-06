const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server up on port ${port}`)
})