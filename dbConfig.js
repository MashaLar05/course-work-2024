const mysql = require('mysql2');
const connection = mysql.createConnection({
     host: "localhost",
     port: 3306,
     user: 'root',
     password: 'root_root1991',
     database: 'main_calendar_plan'
});


connection.connect((err) => {
    if(err){
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to MySQL database');

})

module.exports = connection;