//require
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

//config
require('./Config');

//database
require('./database');

//initializations
const app = express();
app.set('port', process.env.PORT); //PORT FROM SERVER

//middlewares
app.use(cors()); //ACCESS CONTROL HTTP
app.options("*", cors()); //ACCESS CONTROL HTTP
app.use(bodyParser.urlencoded({extended: false})) //REQUEST IN BODY
app.use(bodyParser.json()) //JSON
app.use(methodOverride('_method')); //FORMS PUT AND DELETE

//routes
app.use(require('./Routes/index'));

//front
app.use(express.static(path.join(__dirname,"Public")));
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname,'/Public/index.html'));
});

//server
app.listen(app.get('port'), () => {
    console.log('Server listen on port', app.get('port'));
});