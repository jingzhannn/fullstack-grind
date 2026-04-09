const express = require('express');
const sql = require('mssql');
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config();

const booksController = require('./Controllers/booksController');
const usersController = require('./Controllers/usersController');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/allbooks", booksController.getAllBooks);
app.post("/createUser", usersController.createUser);

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
    console.log(`Server link http://localhost:${PORT}`)
})

process.on("SIGINT", async ()=> {
    try{
        console.log('Server is gracefully shutting down');
        await sql.close();
        console.log('Database Connection CLosed');
        process.exit(0);
    } catch (err) {
        console.error("Error Closing Database: ", err);
    }
})