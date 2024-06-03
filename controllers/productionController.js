const connection = require('../dbConfig');

exports.getProducts = async ()=>{
    try {
         const [readResult] = await connection.promise().query('select * from Production');
        return readResult;
    } catch(err) {
        throw err;
    }
}

exports.getProductById = async (id) => {
    try {
        const [product] = await connection.promise().query(
            'SELECT * FROM production WHERE Id = ?',
            [id]
        );
        return product;
    } catch (err) {
        throw err;
    }
};


exports.addProduct = async (productData) => {
    try {
        const {productName, productDescription, productPrice} = productData;

        console.log('productData', productData)
        const[insertResult] = await connection.promise().query(
            'INSERT INTO production (Product_name, Product_description, Price) VALUES (?, ?, ?)',
            [productName, productDescription, productPrice]
        );
        return insertResult;
    } catch (err) {
        throw err;
    }
};

exports.updateProduct = async(productData) =>{
    try {
        const{id, productName, productDescription, productPrice} = productData;
        const [updateResult] = await connection.promise().query (
            'update production set Product_name = ?, Product_description = ?, Price = ? where Id = ?',
            [productName, productDescription, productPrice, id]
        );
        console.log('Data row for production updated successfully');
        return updateResult;
    } catch (err) {
        throw err
    }
}

exports.deleteProduct = async (productId) => {
    try {
        const [deleteResult] = await connection.promise().query(
            'DELETE FROM production WHERE Id = ?',
            [productId]
        );
        console.log('Row deleted successfully');
        return deleteResult;
    } catch (err) {
        throw err;
    }
};
