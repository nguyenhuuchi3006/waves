const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();

mongoose.Promise=global.Promise;        //để setup mongoose ? chưa biết để làm gì
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const { User } = require('./models/user');

// ================================
//             USER    
// ================================

app.post('/api/users/register',(req,res)=>{             // tao mot user moi bang postman

    const user = new User(req.body);

    user.save((err,doc)=>{
        if(err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            userdata: doc                           // doc se la ...{email:'', pass: '',...} destructuring 
        })
    })
})


const port = process.env.PORT ||3002;     // gán port bằng 1 enviroment variable
app.listen(port, () => console.log(`Server listening on port ${port}!`));

// - chạy thì thay vì nodemon SERVER/server.js mà ta chạy yarn run server (vì
//     đã cài đặt ở package.json)