const express = require("express");
const sql = require("mssql");
const dbConfig = require("./dbConfig")

const app = express();
const PORT = process.env.port || 3000;

app.use(express.json());
app.use(express.urlencoded())

app.listen(PORT, async () => {
    try{
        await sql.connect(dbConfig);
        console.log(`Database connected successfully`);
    } catch (err) {
        console.error("Database failed to connect: ", err);
        process.exit(1)
    }
    console.log(`Server listening on port ${PORT}`);
})

app.get('/', (req, res) => {
    res.send(`Hello ${dbConfig.user}`)
})

app.get('/uni', async (req, res) => {
    let connection;
    try{
        connection = await sql.connect(dbConfig);
        const sqlQuery = `SELECT * FROM Universities`;
        const request = connection.request();
        const result = await request.query(sqlQuery);
        res.json(result.recordset);
    } catch (err) {
        console.error("Error in GET /uni: ", err);
        res.status(500).send("Error retrieving uni");
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (closeError) {
                console.error("Error closing DB connection", closeError);
            }
        }
    }
});

app.post('/uni', async (req, res) => {
    let connection;
    const newUniData = req.body;
    try{      
        connection = await sql.connect(dbConfig);
        const sqlQuery = `INSERT INTO Universities (uni_name, uni_acronym) 
                            OUTPUT INSERTED.*
                            VALUES (@uni_name, @uni_acronym);`;
        const request = connection.request();
        request.input("uni_name", newUniData.uni_name);
        request.input("uni_acronym", newUniData.uni_acronym);
        const result = await request.query(sqlQuery);

        res.status(201).json(result.recordset[0]);

    } catch (err) {
        if (err.number === 2627 || err.number === 2601) {
            return res.status(400).send("Duplicate university not allowed");
        }
        console.error("Error IN /POST: ", err);
        res.status(500).send("Error Posting Uni")
    } finally{
        if (connection){
            try{
                await connection.close();
            } catch (closeError){
                console.error("Error closing DB connection:", closeError)
            }
        }
    }
})

app.put('/uni/:id', async (req, res) => {
    const uniId = parseInt(req.params.id);
    if (isNaN(uniId)){
        return res.status(400).send("Invalid ID");
    }
    
    let connection;
    const newData = req.body;
    try{
        connection = await sql.connect(dbConfig);
        const sqlQuery = `UPDATE Universities SET uni_name = @newName, uni_acronym = @newAcro OUTPUT INSERTED.* WHERE id = @Id`;
        const request = connection.request();
        request.input("id", uniId);
        request.input("newName", newData.uni_name);
        request.input("newAcro", newData.uni_acronym);
        result = await request.query(sqlQuery);
        
        res.json(result.recordset[0]);
    } catch (err){
        console.error("Error IN /UPDATE: ", err);
        res.status(500).send("Error Updating Uni");
    } finally {
        if (connection){
            try {
                connection.close()
            } catch (closeError){
                console.error("Error closing DB connection:", closeError);
            }
        }
    }
})

app.delete('/uni/:id', async (req, res) => {   
    const uniId = parseInt(req.params.id);
    if (isNaN(uniId)){
        return res.status(400).send("Invalid ID");
    }

    let connection;
    try{
        connection = await sql.connect(dbConfig);
        const sqlQuery = `DELETE FROM Universities OUTPUT DELETED.* WHERE id = @id`
        const request = connection.request();
        request.input("id", uniId);
        const result = await request.query(sqlQuery);
        res.json(result.recordset[0]);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error Deleting University", err);
    } finally {
        if (connection) {
            try{
                await connection.close();
            } catch (closeError){
                console.error("Error closing DB connection", closeError);
            }
        }
    }
})

process.on("SIGINT", async () => {
    console.log("Server gracefully shutting down");
    await sql.close();
    console.log("Database connection closed");
    process.exit(0);
})