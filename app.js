
const express= require('express');
const app= express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const db = require('./src/config/dbconfig');

// Config
app.use(express.json());
dotenv.config();

// Routes
const playersRoute = require('./src/api/routes/players')

// Middleware
app.use('/players', playersRoute);

// Conntecting to Mongo Atlas db
db.connectDB();

app.listen(process.env.PORT=3000, ()=>{
	console.log(`server is listening on port:${process.env.PORT}`)
})