const connection = require('../dbConfig');

exports.getMasterProductionSchedule = async ()=>{
    try {
         const [readResult] = await connection.promise().query(
            'SELECT master_production_schedule.Id, production.Product_name, master_production_schedule.Id, master_production_schedule.Stock_balance, master_production_schedule.ATP, master_production_schedule.Date_of_shipment, master_production_schedule.Reserved_production, master_production_schedule.Internal_demand, master_production_schedule.Products_shipped, master_production_schedule.Production_quantity, master_production_schedule.New_Stock_balance FROM main_calendar_plan.master_production_schedule JOIN main_calendar_plan.production ON master_production_schedule.Production_id = production.Id');
        return readResult;
    } catch(err) {
        throw err;
    }
}

exports.getPlanForOneProduct = async (planRowtId)=>{
    try {
         const [readResult] = await connection.promise().query(
            'SELECT production.Product_name, master_production_schedule.Stock_balance, master_production_schedule.ATP, master_production_schedule.Date_of_shipment, master_production_schedule.Reserved_production, master_production_schedule.Internal_demand, master_production_schedule.Products_shipped, master_production_schedule.Production_quantity, master_production_schedule.New_Stock_balance FROM main_calendar_plan.master_production_schedule JOIN main_calendar_plan.production ON master_production_schedule.Production_id = production.Id WHERE master_production_schedule.Id = ?',
            [planRowtId]);
        return readResult;
    } catch(err) {
        throw err;
    }
}


exports.addRowToPlan = async(planData) => {
    try {
        const { productName, stockBalance, shipmentDate, reservedProduction, internalDemand, productsShipped, productionQuantity } = planData;

        const [rows] = await connection.promise().query('SELECT Id FROM production WHERE Product_name = ?', [productName]);

        if (rows.length > 0) {
            const productId = rows[0].Id;
            console.log(productId);
            const [insertResult] = await connection.promise().query(
                'INSERT INTO master_production_schedule (Stock_balance, Date_of_shipment, Reserved_production, Internal_demand, Products_shipped, Production_quantity, Production_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [stockBalance, shipmentDate, reservedProduction, internalDemand, productsShipped, productionQuantity, productId]
            );

            console.log('Data row for master production schedule inserted successfully');
            return insertResult;
        } else {
            throw new Error('Product not found');
        }
    } catch (err) {
        throw err;
    }
};

exports.updateRowToPlan = async (planData) => {
    try {
        const { id, productName, stockBalance, shipmentDate, reservedProduction, internalDemand, productsShipped, productionQuantity } = planData;
        console.log(id);
        console.log(productName);
            const productId = id;
            console.log(productId);
            const [updateResult] = await connection.promise().query(
                'UPDATE master_production_schedule SET Stock_balance = ?, Date_of_shipment = ?, Reserved_production = ?, Internal_demand = ?, Products_shipped = ?, Production_quantity = ? WHERE Id = ?',
                [stockBalance, shipmentDate, reservedProduction, internalDemand, productsShipped, productionQuantity, productId, id]
            );

            console.log('Data row for master production schedule updated successfully');
            return updateResult;
    } catch (err) {
        throw err;
    }
}

exports.getMasterProductionScheduleForDate = async (shipmentDate) => {
    try {
        const [readResult] = await connection.promise().query(
            `SELECT production.Product_name, master_production_schedule.Production_quantity, master_production_schedule.Stock_balance, master_production_schedule.ATP, master_production_schedule.Reserved_production, master_production_schedule.Internal_demand, master_production_schedule.Products_shipped, master_production_schedule.Date_of_shipment 
             FROM main_calendar_plan.master_production_schedule 
             JOIN main_calendar_plan.production ON master_production_schedule.Production_id = production.Id 
             WHERE master_production_schedule.Date_of_shipment = ?`,
            [shipmentDate]
        );
        return readResult;
    } catch (err) {
        throw err;
    }
}

exports.deleteRowFromPlan = async (planRowId) => {
    try {
        const [deleteResult] = await connection.promise().query(
            'DELETE FROM master_production_schedule WHERE Id = ?',
            [planRowId]
        );
        console.log('Row deleted successfully');
        return deleteResult;
    } catch (err) {
        throw err;
    }
};
