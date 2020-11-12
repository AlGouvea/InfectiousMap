
async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
 
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:vertrigo@localhost:3306/teste");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}
connect();
module.exports = {}