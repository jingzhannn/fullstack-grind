const userModel = require("../Models/usersModel");

async function createUser(req, res){
    try{
        const newUser = await userModel.createUser(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        console.error("Controller Error:", err)
        res.status(500).json({ error: "Error Creating User" })
    }
}

module.exports = {
    createUser
}