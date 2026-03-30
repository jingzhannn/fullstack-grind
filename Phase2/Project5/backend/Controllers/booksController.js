const booksModel = require('../Models/booksModel');

async function getAllBooks(req, res) {
    try{
        const books = await booksModel.getAllBooks();
        res.json(books);
    } catch (err) {
        console.error("Controller Error: ", err);
        res.status(500).json({'error': "Error Retrieving Books"});
    }
}

module.exports = {
    getAllBooks
}