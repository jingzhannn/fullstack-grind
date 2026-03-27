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

async function createNotes(newText){
    let connection;
    try{
        connection = await sql.connect(dbConfig);
        const sqlQuery = `INSERT INTO Notes (notes) OUTPUT INSERTED.* VALUES (@note)`;
        const request = connection.request();
        request.input("note", newText.note);
        const result = await request.query(sqlQuery);
        return result.recordset;
    } catch (err) {
        console.error("Database Error", err);
        throw err;
    } finally {
        if (connection){
            try{
                await connection.close();
            } catch (closeError) {
                console.error ("Error Closing Database", closeError);
            }
        }
    }
}

async function deleteNotes(notesId){
    let connection;
    try{
        connection = await sql.connect(dbConfig);
        const sqlQuery = `DELETE FROM Notes OUTPUT DELETED.* WHERE id = @id`;
        const request = connection.request();
        request.input("id", notesId);
        const result = await request.query(sqlQuery);
        return result.recordset[0] || null;
    } catch (err){
        console.error("Database Error: ", err);
        throw err;
    } finally{
        if (connection) {
            try{
                await connection.close();
            } catch (closeError) {
                console.error("Error Closing Databse: ", closeError);
                throw closeError;
            }
        }
    }
}

module.exports = {
    getNotes,
    createNotes,
    deleteNotes
}