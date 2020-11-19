
async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
 
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://esca:esca2020@34.95.133.231:3306/infectious");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}
connect();
module.exports = {}


async function insertUser(user){
    const conn = await connect();
    const sql = 'SELECT COUNT(*) AS countUsers FROM users WHERE user = "'+user.user+'"';
    const [rows] = await conn.query(sql);
    if(rows[0].countUsers<=0){
    const sql = 'INSERT INTO users(user,password,ra,crm) VALUES (?,?,?,?);';
    const values = [user.user,user.password,user.ra,user.crm];
    if(conn.query(sql, values)){return await 1;}else{return await 0;}
}
else{return await 3;}
}

async function selectUser(user){
    const conn = await connect();
    
    const sql = 'SELECT COUNT(*) AS countUsers FROM users WHERE user = "'+user.user+'"'+' AND password= "'+user.password+'"';
    const [rows] = await conn.query(sql);
    if(rows[0].countUsers>0){
        const sql = 'SELECT user,crm,id,ra FROM users WHERE user = "'+user.user+'"'+' AND password= "'+user.password+'"';
        const [rows] = await conn.query(sql);
        return rows;
    }else{
    return 0;}
}
 
module.exports = {selectUser,insertUser}
