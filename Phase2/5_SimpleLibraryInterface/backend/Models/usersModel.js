const sql = require('mssql');
const dbConfig = require('../dbConfig');

async function createUser(newUser){
    let connection;
    try{
        connection = await sql.connect(dbConfig);
        const sqlQuery = `INSERT INTO Users(username, password) 
                         OUTPUT INSERTED.* 
                         VALUES (@username, @password)`;
        const request = connection.request();
        request.input("username", newUser.username);
        request.input("password", newUser.password);
        const result = await request.query(sqlQuery);
        return result.recordset;
    } catch (err){
        console.error("Database Connection Error: ", err);
        throw err;
    } finally{
        if (connection){
            try{
                await connection.close();
            } catch (closeError){
                console.error("Error Closing Connection");
                throw closeError;
            }
        }
    }
}

module.exports = {
    createUser
}