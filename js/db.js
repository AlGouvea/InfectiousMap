
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
module.exports = {connect}


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

async function buscaDoenca(doenca){
    const conn = await connect();
    const sql = 'SELECT *  FROM doencas WHERE nome LIKE "%'+doenca.nome+'%"';

    const [rows] = await conn.query(sql);
return rows;
}
async function buscaNomeDoenca(doenca){
    const conn = await connect();
    const sql = 'SELECT nome FROM doencas WHERE cid LIKE "%'+doenca.cid+'%"';

    const [rows] = await conn.query(sql);
return rows;
}


async function buscaQntDoenca(doenca){
    if(doenca.ra){
        const conn = await connect();
        const sql = 'SELECT COUNT(*) AS countCasos FROM casos WHERE cid = "'+doenca.cid+'" AND ra = "'+doenca.ra+'"';
        const [rows] = await conn.query(sql);
 
return rows[0];
}else{
    const conn = await connect();
        const sql = 'SELECT COUNT(*) AS countCasos FROM casos WHERE cid = "'+doenca.cid+'"';
        const [rows] = await conn.query(sql);
 
return rows[0];
}
}





async function buscaGraph(doenca){
    if(doenca){
    const conn = await connect();
    const sql = 'SELECT *  FROM casos WHERE ra LIKE "%'+doenca.ra+'%"';

    const [rows] = await conn.query(sql);


return rows;}
else{
    const conn = await connect();
    const sql = 'SELECT *  FROM casos';

    const [rows] = await conn.query(sql);
    
return rows;
}
}



async function insertDoenca(doenca){
    const conn = await connect();
    const sql = 'SELECT COUNT(*) AS countDoencas FROM doencas WHERE cid = "'+doenca.cid+'"';
    const [rows] = await conn.query(sql);
    if(rows[0].countDoencas<=0){
        var data = new Date();
        var dataA = data.getFullYear()+"-"+data.getMonth()+"-"+data.getDate()
    const sql = 'INSERT INTO doencas(nome,cid,transmissao,prev,risco,sintomas,dataCadastro,crmCadastrante) VALUES (?,?,?,?,?,?,?,?);';
    const values = [doenca.nome,doenca.cid,doenca.transmissao,doenca.prevencao,doenca.risco,doenca.sintomas,dataA,doenca.crmCadastrante];
    if(conn.query(sql, values)){return await 1;}else{return await 0;}
}
else{return await 3;}
}

async function insertCaso(caso){
    const conn = await connect();
    var data = new Date();
        var dataA = data.getFullYear()+"-"+data.getMonth()+"-"+data.getDate()
    const sql = 'SELECT COUNT(*) AS countCasos FROM casos WHERE cid = "'+caso.cid+'" AND data ="'+dataA+'" AND usuario ="'+caso.usuario+'" AND ra ="'+caso.ra+'"';
    const [rows] = await conn.query(sql);
    if(rows[0].countCasos<=0){
    const sql = 'INSERT INTO casos(cid,data,usuario,ra,dataOcorrencia) VALUES (?,?,?,?,?);';
    const values = [caso.cid,dataA,caso.usuario,caso.ra,caso.dataOcorrencia];
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
 
module.exports = {selectUser,insertUser,insertDoenca,buscaDoenca,insertCaso,buscaGraph,buscaNomeDoenca,buscaQntDoenca}
