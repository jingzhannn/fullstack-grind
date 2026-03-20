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
        res.status(500).send("Error retrieving books");
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
        const sqlQuery = `INSERT INTO Universities (uni_name, uni_acronym) VALUES (@uni_name, @uni_acronym);`;
        const request = connection.request();
        request.input("uni_name", newUniData.uni_name);
        request.input("uni_acronym", newUniData.uni_acronym);
        const result = await request.query(sqlQuery);
    } catch (err) {
        console.error()
    }
})

process.on("SIGINT", async () => {
    console.log("Server gracefully shutting down");
    await sql.close();
    console.log("Database connection closed");
    process.exit(0);
})