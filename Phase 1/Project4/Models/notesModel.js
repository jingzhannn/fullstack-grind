const sql = require("mssql");
const dbConfig = require("../dbConfig");

async function getNotes(){
    let connection;
    try{
        connection = await sql.connect(dbConfig);
        const query = `SELECT * FROM Notes`;
        const result = await connection.request().query(query);
        return result.recordset;
    } catch (err) {
        console.error("Database Error: ", err);
    } finally {
        if (connection){
            try{
                await connection.close();
            } catch (closeError){
                console.error("Error closing connection", err);
            }
        }
    }
}

module.exports = {
    getNotes
}