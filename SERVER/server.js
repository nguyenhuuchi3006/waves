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

// Models
const { User } = require('./models/user');
const { Brand } = require('./models/brand');
const { Wood } = require('./models/wood');
const { Product } = require('./models/product');


// Middleware
const {auth} = require('./middleware/auth');
const {admin} = require('./middleware/admin');


// ================================
//             PRODUCT    
// ================================

app.post('/api/product/article',auth,admin,(req,res)=>{

    const product = new Product(req.body);

    product.save((err, doc)=>{
        if(err) return res.json({success: false,err});

        res.status(200).json({
            success: true,
            article: doc
        })
    })
})


// /api/product/articles?id=hkhjkh,jhfkdhjfk,dfkdjf&type=single         // type la single or array (1 product or nhieu)
app.get('/api/product/articles_by_id', (req,res)=>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === 'array') {
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item => {                               // chuyen sang kieu ObjectId giong trong mongo
            return mongoose.Types.ObjectId(item)
        });

    }

    Product.
    find({'_id': {$in: items}}).                                        // muon tim nhieu thi dung nhu nay
    populate('brand').                      // neu khog co thi chi hien thi id cua brand thoi
    populate('wood').                           // co thi se hien thi tat ca (name, ... )
    exec((err, docs)=>{
        return res.status(200).send(docs)
    })
})


//BY ARRIVAL
// /articles?sortBy=createdAt&order=-1&limit=4                // lay 4 cai ms nhat -1 la decs 1 la asc


//BY SELL
// /articles?sortBy=sold&order=-1&limit=4                

app.get('/api/product/articles',(req,res)=>{

    let order = req.query.order ? req.query.order: '1';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Product.
    find().
    populate('brand').
    populate('wood').
    sort([[sortBy,order]]).
    limit(limit).
    exec((err,articles) => {
        if(err) return res.status(400).send(err);
        res.send(articles)
    })
})


// ================================
//             BRAND    
// ================================

app.post('/api/product/brand',auth,admin,(req, res)=>{              // cho phep co user va la admin ms vao dc

    const brand = new Brand(req.body);
    
    brand.save((err,doc)=>{
        if(err) return res.json({success: false, err});

        res.status(200).json({
            success: true,
            brand: doc
        })
    })
})


app.get('/api/product/brands', (req,res)=>{
    Brand.find({},(err,brands)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(brands);
    })
})


// ================================
//             WOODS   
// ================================

app.post('/api/product/wood',auth,admin,(req, res)=>{              // cho phep co user va la admin ms vao dc

    const wood = new Wood(req.body);
    
    wood.save((err,doc)=>{
        if(err) return res.json({success: false, err});

        res.status(200).json({
            success: true,
            wood: doc
        })
    })
})


app.get('/api/product/woods', (req,res)=>{

    Wood.find({},(err,woods)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(woods);
    })
})


// ================================
//             USER    
// ================================

app.get('/api/users/auth',auth, (req, res)=>{

    
    res.status(200).json({
        isAdmin: req.user.role === 0? false:true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    })
})

app.get('/api/users/logout',auth,(req,res)=> {
    User.findOneAndUpdate(
        {_id: req.user._id},
        {token: ''},                    // nay bi update
        (err,doc)=>{
            if(err) return res.json({success: false,err});

            return res.status(200).send({
                success: true,
            })
        }
    )
})

app.post('/api/users/register',(req,res)=>{             // tao mot user moi bang postman

    const user = new User(req.body);

    user.save((err,doc)=>{
        if(err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            //userdata: doc                           // doc se la object {email:'', pass: '',...}
        })
    });
});

app.post('/api/users/login', (req,res)=>{

    //find the email
    //check password
    //generate a token                              ? chua biet de lam gi - hinh nhu de dung cho cookie

    User.findOne({'email': req.body.email}, (err,user)=>{
        if(!user) return res.json({loginSuccess: false, message: 'Auth failes, email not found'});

        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch) return res.json({loginSuccess: false, message: 'Wrong password'});

            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('x_auth',user.token).status(200).json({
                    loginSuccess: true
                })
            })
        })
    })


})


const port = process.env.PORT ||3002;     // gán port bằng 1 enviroment variable
app.listen(port, () => console.log(`Server listening on port ${port}!`));

// - chạy thì thay vì nodemon SERVER/server.js mà ta chạy yarn run server (vì
//     đã cài đặt ở package.json)