//console.log('this is loaded');
exports.connections = { //exports an object of all items needed for mySQL connection.
    host: process.env.mysql_host,
    port: process.env.mysql_port,
    user: process.env.mysql_user,
    password: process.env.mysql_password,
    database: process.env.mysql_database
};