
// setup/require
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;


//static
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

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

//get
app.get('/tasks', (req,res)=>{
    // console.log('in Get');
    let queryString = `SELECT * FROM "todolist" ORDER BY "complete" ASC, "important" DESC;`;
    pool.query(queryString).then((result) => {
        // console.log(result.rows);
        res.send(result.rows);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

app.post('/tasks', (req,res)=>{
    // console.log('in POST');
    let task = req.body;
    // console.log(task);
    let queryString = `INSERT INTO "todolist" ("task", "important") VALUES ($1, $2);`;
    pool.query(queryString, [task.task, task.important]).then((result)=>{
        res.sendStatus(201);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    });
    res.send('hiii');
})

//starting server
app.listen(PORT, ()=>{
    console.log('listing on port', PORT);
});