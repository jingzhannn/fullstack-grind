const notesModel = require("../Models/notesModel");

async function getNotes(req, res){
    try{
        const notes = await notesModel.getNotes();
        res.json(notes);
    } catch (error){
        console.error("Controller Error: ", error);
        res.status(500).json({ error: "Error Retrieving Notes" })
    }
}

module.exports = {
    getNotes
}