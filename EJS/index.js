const express = require('express');
const app = express();
const path = require('path');

let port = 8080;


app.use(express.static(path.join(__dirname,"/public/css")));
app.use(express.static(path.join(__dirname,"/public/js")));
app.set("view engine", "ejs"); 
app.set("views",path.join(__dirname, "/views"));



app.get('/home' , (req, res) => {
    res.render("home");
})


app.get('/rolldic' , (req, res) => {
    let dicVal = Math.round(Math.random()*6);
    res.render("rolldic", {dicVal});
})







//  INTGRAME active;

app.get("/ig/:username", (req, res) => {
    let {username} = req.params;
    const instData = require("./data.json");
    const data = instData[username];
    if (data) { 
        res.render('instagram.ejs', {data: instData[username]});
    } else {
        res.render('error.ejs');
    }
});


app.listen(port,()=> {
    console.log(`listening on port ${port}`);
})