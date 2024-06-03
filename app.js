const fs = require('fs');
const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './public');

app.use(express.static('public'));
app.use(express.static('styles'));
app.use(express.json());

const customerRouter = require('./routes/customer');
const oderRouter = require('./routes/order');
const productionRouter = require('./routes/production');
const productionPlanRouter = require('./routes/production_plan');

app.use('/customers_page', customerRouter);
app.use('/orders_page', oderRouter);
app.use('/products_page', productionRouter);
app.use('/prodaction_plan_page', productionPlanRouter);

app.get('/', (req, res)=>{
    res.render('main_page_page', {name: "Alex", id: 1});
})

app.get('/about_page', (req, res)=>{
    res.render('about_page', {name: "Jafar", id: 2});
})


let port = 3001;

app.listen(port, ()=>{
    console.log(`Server is working: http://localhost:${port}`)
})


