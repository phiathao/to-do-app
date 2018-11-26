const express = require('express');

//db stuff
const pg = require('pg');
const Pool = pg.Pool;
const pool = new Pool ({
    database: 'weekend-to-do-app',
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

module.exports = pool;