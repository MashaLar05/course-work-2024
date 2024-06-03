const express = require('express');
const router = express.Router();
// router.use(express.json());
const productionController = require('../controllers/productionController');

router.get('/', async (req, res, next)=>{
    try {
        const result = await productionController.getProducts();
        res.render('products_page', {production: result});
        return res;
    } catch(err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await productionController.getProductById(id);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.post('/add', async (req, res, next) => {
    try {
        const {productName, productDescription, productPrice} = req.body;
        await productionController.addProduct({productName, productDescription, productPrice});
        res.status(200).send('Product added sucsessfully');
    } catch(err) {
        next(err);
    }
});

router.post('/update', async (req, res, next) => {
    try {
        const {id, productName, productDescription, productPrice} = req.body;
        await productionController.updateProduct({ id, productName, productDescription, productPrice});
        res.status(200).send('Product updated successfully');
    } catch (err) {
        next(err);
    }
});

router.delete('/delete/:id', async (req, res, next) => {
    try {
        const productId = req.params.id;
        await productionController.deleteProduct(productId);
        res.status(200).send('Row deleted successfully');
    } catch (err) {
        next(err);
    }
});
module.exports = router;