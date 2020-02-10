const express = require('express');
const mongodb = require('mongoose');
const dotEnv = require('dotenv');
const router =  require('./router/routes')

const app = express();


//App use
app.use(express.json())
app.use('/root',router)

//Load Env
dotEnv.config({path:'./env/environment.env'})

//Connect Database
mongodb.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

const db = mongodb.connection;

db.on('error',(error)=>console.log(error));
db.once('open',()=>console.log('Database Connected'))


//Port Listen
app.listen(3000,()=>{console.log('Server is Running on Port 3000 ')})