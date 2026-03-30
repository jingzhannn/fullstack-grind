const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/hello", (req, res) => {
    res.send("Hello World")
})

let universities = [];

app.post('/uni', (req, res) => {
    const { uni, uni_acronym } = req.body;
    if ( !uni || uni_acronym == null){
        return res
            .status(400)
            .json({ message: "Cannot create Uni: name and uni acronym is required"})
    }

    const university = {
        id: Date.now(),
        uni,
        uni_acronym      
    }
    universities.push(university);
    res
        .status(201)
        .json({ message: `SUCCESS. ${uni}, ${uni_acronym} created`});
});

app.get("/uni", (req, res) => {
    let results = universities;
    
    res.json({
        message: `Retrieve all Universities (${results.length})`,
        uni: results,
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})