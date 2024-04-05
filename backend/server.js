const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors())
require('dotenv').config()

app.use('/auth', require('./routes'))


app.listen(5000, ()=>{
    console.log('PORT running at 5000');
})