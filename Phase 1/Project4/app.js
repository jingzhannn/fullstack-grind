const express = require("express");
const sql = require("mssql");
const dotenv = require("dotenv");

dotenv.config();

const notesController = require("./Controllers/notesController");
const { validateNotes } = require("./Middlewares/notesMiddleware");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/notes", notesController.getNotes);
app.post("/notes", validateNotes, notesController.createNotes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})

process.on("SIGINT", async () => {
    console.log("Server is gracefully shutting down");
    await sql.close();
    console.log("Database connection is closed");
    process.exit(0);
})