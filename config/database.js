let mysql = require('mysql2');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_team'
});
connection.connect(function(error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log('connection success');
    }
})

module.exports = connection;