const sql = require('mssql');
const dbConfig = require('../dbConfig');

async function getAllBooks(){
    let connection;
    try{
        connection = await sql.connect(dbConfig);
        const sqlQuery = `SELECT * FROM Books`
        const request = connection.request();
        const result = await request.query(sqlQuery);
        return result.recordset;
    } catch (err) {
        console.error("Database Connection Error: ", err);
        throw err;
    } finally {
        if (connection) {
            try{
                await connection.close();
            } catch (closeError) {
                console.error("Error Closing Connection: ", closeError);
                throw closeError;
            } 
        }
    }
}

module.exports = {
    getAllBooks
}