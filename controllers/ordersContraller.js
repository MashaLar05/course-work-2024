const connection = require('../dbConfig');

exports.getOders = async ()=>{
    try {
         const [readResult] = await connection.promise().query('SELECT Buyers_order.Id, customer.Customer_name, production.Product_name, buyers_order.Date_of_shipment FROM main_calendar_plan.buyers_order JOIN main_calendar_plan.customer ON buyers_order.Customer_id = customer.Id JOIN main_calendar_plan.production ON buyers_order.Product_id = production.Id');
        return readResult;
    } catch(err) {
        throw err;
    }
}

exports.getOrderById = async (id) => {
    try {
        const [order] = await connection.promise().query(
            'SELECT Buyers_order.Id, customer.Customer_name, production.Product_name, buyers_order.Date_of_shipment FROM buyers_order JOIN customer ON buyers_order.Customer_id = customer.Id JOIN production ON buyers_order.Product_id = production.Id where buyers_order.Id = ?',
            // 'SELECT * FROM buyers_order WHERE Id = ?',
            [id]
        );
        return order;
    } catch (err) {
        throw err;
    }
};

exports.addOrder = async (orderData) => {
    try {
        const{customerName, productName, shipmentDate} = orderData;

        const[productRows] = await connection.promise().query('SELECT Id FROM production WHERE Product_name = ?', [productName]);
        const[customerRows] = await connection.promise().query('SELECT Id FROM customer WHERE Customer_name = ?', [customerName]);

        if(productRows.length > 0 & customerRows.length > 0) {
            const productId = productRows[0].Id;
            const customerId = customerRows[0].Id;
            
            const [insertResult] = await connection.promise().query(
                'INSERT INTO Buyers_order(Customer_id, Product_id, Date_of_shipment) values (?, ?, ?)',
                [customerId, productId, shipmentDate]
            ); 
            console.log(insertResult);
            return insertResult;
        } else {
            throw new Error('Product or customer not found')
        }

    } catch(err) {
        throw err;
    }
}


exports.updateOrder = async (id, customerName, productName, shipmentDate) => {
    try {
        const[productRows] = await connection.promise().query('SELECT Id FROM production WHERE Product_name = ?', [productName]);
        const[customerRows] = await connection.promise().query('SELECT Id FROM customer WHERE Customer_name = ?', [customerName]);

        if(productRows.length > 0 & customerRows.length > 0) {
            const productId = productRows[0].Id;
            const customerId = customerRows[0].Id;
            
            const [insertResult] = await connection.promise().query(
                'UPDATE Buyers_order SET Customer_id = ?, Product_id = ?, Date_of_shipment = ? WHERE Id = ?',
                [customerId, productId, shipmentDate, id]
            );
            return insertResult;
        } else {
            throw new Error('Product or customer not found')
        }
    } catch (err) {
        throw err;
    }
};

exports.deleteOrder = async (orderId) => {
    try {
        console.log('Deleting order from database with ID:', orderId);  // Debugging line
        const [deleteResult] = await connection.promise().query(
            'DELETE FROM Buyers_order WHERE Id = ?',
            [orderId]
        );
        console.log('Row deleted successfully');
        return deleteResult;
    } catch (err) {
        throw err;
    }
};
