
// setup/require
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;


//static
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));


//starting server
app.listen(PORT, ()=>{
    console.log('listing on port', PORT);
});