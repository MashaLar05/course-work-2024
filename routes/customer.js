const express = require('express');
const router = express.Router();
router.use(express.json());

const customerController = require('../controllers/customersController');

router.get('/', async (req, res, next)=>{
    try {
        const result = await customerController.getCustomers();
        res.render('customers_page', {customer: result});
        return res;
    } catch(err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await customerController.getCustomerById(id);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.post('/add', async(req, res, next) => {
    try {
        const {customerName, customerEmail, customerPhone} = req.body;
        await customerController.addCustomer({customerName, customerEmail, customerPhone});
        res.status(200).send('Customer added sucsessfully')
    } catch(err) {
        next(err);
    }
});

router.post('/update', async (req, res, next) => {
    try {
        const {id, customerName, customerEmail, customerPhone} = req.body;
        await customerController.updateCustomer({ id, customerName, customerEmail, customerPhone});
        res.status(200).send('Customer updated successfully');
    } catch (err) {
        next(err);
    }
});

router.delete('/delete/:id', async (req, res, next) => {
    try {
        const сustomerId = req.params.id;
        await customerController.deleteCustomer(сustomerId);
        res.status(200).send('Row deleted successfully');
    } catch (err) {
        next(err);
    }
});

module.exports = router;