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

async function createNotes(req, res) {
    try{
        const newNote = await notesModel.createNotes(req.body);
        res.status(201).json(newNote);
    } catch (err) {
        console.error("Controller Error", err);
        res.status(500).json({ error: "Error Creating Note"});
    } 
}

module.exports = {
    getNotes,
    createNotes
}