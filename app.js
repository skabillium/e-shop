const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

// Add routes to api
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');

// Connect to database
mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;

// Use the morgan and body parser middlewares
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Grant ability to send requests to browsers outside of localhost
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE. GET');
        return res.status(200).json({});
    }
    next();
});

// Use products, orders and users routers
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

// If request doesn't get handled by the routers above
// throw error
app.use((req, res, next) => {

    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;