const connection = require('../dbConfig');

exports.getCustomers = async ()=>{
    try {
         const [readResult] = await connection.promise().query('select * from customer');
        return readResult;
    } catch(err) {
        throw err;
    }
}

exports.getCustomerById = async (id) => {
    try {
        const [customer] = await connection.promise().query(
            'SELECT * FROM customer WHERE Id = ?',
            [id]
        );
        return customer;
    } catch (err) {
        throw err;
    }
};

exports.addCustomer = async(customerData) =>{
    try {

        const {customerName, customerEmail, customerPhone} = customerData;
        const[insertResult] = await connection.promise().query(
            'INSERT INTO Customer (Customer_name, Email, Phone) VALUES(?, ?, ?)',
            [customerName, customerEmail, customerPhone]
        );
        return insertResult;
    } catch(err) {
        throw(err);
    }
}

exports.updateCustomer = async(productData) =>{
    try {
        const{id, customerName, customerEmail, customerPhone} = productData;
        const [updateResult] = await connection.promise().query (
            'update Customer set Customer_name = ?, Phone = ?, Email = ? where Id = ?',
            [customerName, customerPhone, customerEmail, id]
        );
        console.log('Data row for production updated successfully');
        return updateResult;
    } catch (err) {
        throw err
    }
}

exports.deleteCustomer = async (сustomerId) => {
    try {
        const [deleteResult] = await connection.promise().query(
            'DELETE FROM Customer WHERE Id = ?',
            [сustomerId]
        );
        console.log('Row deleted successfully');
        return deleteResult;
    } catch (err) {
        throw err;
    }
};