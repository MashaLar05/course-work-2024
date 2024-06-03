const express = require('express');
const router = express.Router();
// router.use(express.json());
const planController = require('../controllers/production_planController');

router.get('/', async (req, res, next)=>{
    try {
        const result = await planController.getMasterProductionSchedule();
        res.render('prodaction_plan_page', {production_plan: result, prodaction_plan_for_one: null});
        return res;
    } catch(err) {
        next(err);
    }
});


router.get('/:id', async (req, res, next) => {
    try {
        const planRowtId = req.params.id;
        const result = await planController.getPlanForOneProduct(planRowtId);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/add', async (req, res, next) => {
    try {
        const {productName, stockBalance, shipmentDate, reservedProduction, internalDemand, productsShipped, productionQuantity} = req.body;
        await planController.addRowToPlan({productName, stockBalance, shipmentDate, reservedProduction, internalDemand, productsShipped, productionQuantity});
        res.status(200).send('Plan added sucsessfully');
    } catch(err) {
        next(err);
    }
});


router.post('/update', async (req, res, next) => {
    try {
        const { id, productName, stockBalance, shipmentDate, reservedProduction, internalDemand, productsShipped, productionQuantity } = req.body;
        await planController.updateRowToPlan({ id, productName, stockBalance, shipmentDate, reservedProduction, internalDemand, productsShipped, productionQuantity });
        res.status(200).send('Plan updated successfully');
    } catch (err) {
        next(err);
    }
});

router.get('/date/:shipmentDate', async (req, res, next) => {
    try {
        const shipmentDate = req.params.shipmentDate;
        const result = await planController.getMasterProductionScheduleForDate(shipmentDate);
        res.render('prodaction_plan_page', { production_plan: result, prodaction_plan_for_one: null });
        console.log('here')
    } catch (err) {
        next(err);
    }
});

router.delete('/delete/:id', async (req, res, next) => {
    try {
        const planRowId = req.params.id;
        await planController.deleteRowFromPlan(planRowId);
        res.status(200).send('Row deleted successfully');
    } catch (err) {
        next(err);
    }
});

module.exports = router;


