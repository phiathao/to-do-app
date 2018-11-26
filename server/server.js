
// setup/require
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const tasksRouter = require('./routes/tasks.route');

//static
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));
app.use('/tasks', tasksRouter);

//starting server
app.listen(PORT, ()=>{
    console.log('listing on port', PORT);
});