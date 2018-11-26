const express = require('express');
const bodyParser = require('body-parser');
const tasksRouter = express.Router();
const pool = require ('../modules/pool.db')

//get
tasksRouter.get('/', (req,res)=>{
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
//post
tasksRouter.post('/', (req,res)=>{
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
})
//put to complete
tasksRouter.put('/c/:id', (req,res)=>{
    // console.log('in Put');
    let taskId = req.params.id;
    // console.log(taskId);
    let queryString = `UPDATE "todolist" SET "complete" = 'true' WHERE "id" = $1;`;
    pool.query(queryString, [taskId]).then((result)=>{
        res.sendStatus(201);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    });
})
//put to not complete
tasksRouter.put('/n/:id', (req,res)=>{
    // console.log('in Put');
    let taskId = req.params.id;
    // console.log(taskId);
    let queryString = `UPDATE "todolist" SET "complete" = 'false' WHERE "id" = $1;`;
    pool.query(queryString, [taskId]).then((result)=>{
        res.sendStatus(201);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    });
})
//delete
tasksRouter.delete('/:id', (req,res)=>{
    // console.log('in delete');
    let taskId = req.params.id;
    // console.log(taskId);
    let queryString = `DELETE FROM "todolist" WHERE "id" = $1;`;
    pool.query(queryString, [taskId]).then((result)=>{
        res.sendStatus(201);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    });
})

module.exports = tasksRouter;