const express = require('express');
const router = express.Router();
// router.use(express.json());
const ordersContraller = require('../controllers/ordersContraller');

router.get('/', async (req, res, next)=>{
    try {
        const result = await ordersContraller.getOders();
        res.render('orders_page', {order: result});
        return res;
    } catch(err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await ordersContraller.getOrderById(id);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.post('/add', async(req, res, next)=>{
    try {   
        const {customerName, productName, shipmentDate} = req.body;
        await ordersContraller.addOrder({customerName, productName, shipmentDate});
        res.status(200).send('Order added sucsessfully')
    } catch (err) {
        next(err);
    }
});

router.post('/update', async (req, res, next) => {
    try {
        const { id, customerName, productName, shipmentDate } = req.body;
        await ordersContraller.updateOrder(id, customerName, productName, shipmentDate);
        res.status(200).send('Order updated successfully');
    } catch (err) {
        next(err);
    }
});

router.delete('/delete/:id', async (req, res, next) => {
    try {
        const orderId = req.params.id;
        console.log('Received delete request for ID:', orderId);  // Debugging line
        await ordersContraller.deleteOrder(orderId);
        res.status(200).send('Row deleted successfully');
    } catch (err) {
        next(err);
    }
});


module.exports = router;