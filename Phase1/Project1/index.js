const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/intro', (req, res) => {
  res.send("Im Jing Zhan. I want to go SMU");
})

app.get('/name', (req, res) => {
  res.send("Sew Jing Zhan");
})

app.get('/hobbies', (req, res) => {
  const hobbies = ["coding", "reading", "cycling"];
  
  res.json(hobbies);
});

app.get('/food', (req, res) => {
  res.send("Chicken");
})  

app.get('/student', (req, res) => {
  const profile = {
    "name" : "Jing Zhan",
    "hobbies" : ["coding", "reading", "cycling"],
    "University" : "Singapore Management University"
  }

  res.json(profile);
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 