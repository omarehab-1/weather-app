// The Server

// including installed packages needed

const bodyParser = require("body-parser");
const cors = require("cors");
const port = 8000;

// Setup empty JS object to act as endpoint for all routes

projectData = {};

// Express to run server and routes

const express = require("express");

// Start up an instance of app

const app = express();

/* Dependencies */
/* Middleware*/

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance

app.use(cors());

// Initialize the main project folder

app.use(express.static('../Weather'))

// code to start the server and prints massages when the server starts

app.listen(port,() => {
    console.log('The server is running...');
    console.log(`Server is running on http://localhost:${port}`);
});

// Callback function to complete GET '/all'

app.get('/all',(req,res)=>{
    res.send(projectData);
});

// Post Route

  app.post('/postData',(req,res)=>{
    projectData={
        temp:req.body.temp,
        date:req.body.date,
        city:req.body.city,
        content:req.body.content
    };
    console.log(projectData);
    res.send(projectData);
  });