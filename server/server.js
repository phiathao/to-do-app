
// setup/require
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

//db stuff
const pg = require('pg');

const Pool = pg.Pool;
const pool = new Pool ({
    database: 'todoDB',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
})

pool.on('connect', ()=>{
    console.log('connected to DB');
});
  
pool.on('error', (error)=>{
    console.log('Error connecting to DB', error);
});
// end db stuff

//static
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));


//starting server
app.listen(PORT, ()=>{
    console.log('listing on port', PORT);
});