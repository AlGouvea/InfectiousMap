
async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
 
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://esca:esca2020@34.95.133.231:3306/users");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}
connect();
module.exports = {}

async function selectCustomers(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM clientes;');
    return rows;
}
 
module.exports = {selectCustomers}

async function insertCustomer(customer){
    const conn = await connect();
    const sql = 'INSERT INTO users(user,password,ra,crm) VALUES (?,?,?,?);';
    const values = [customer.user,customer.password,customer.ra,customer.crm];
    if(conn.query(sql, values)){return await 1;}else{return await 0;}
}
module.exports = {insertCustomer}