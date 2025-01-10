const express = require("express");
const app  = express();

let port  = 8080;

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});

let about = {
    name : "praful koli",
    age : 21,
    location : "pune"
}

let project = {
    name : "Chat App",
    texh:"react,mangodb, express",
}

// app.use((req, res) => {
//     console.log("request received");
//     console.log(req);
//     res.send();
// });


app.get('/about',(req, res) => {
    res.send(about);

});

app.get('/project',(req, res) => {
    // const userId = req.params.id; res.send(`User ID: ${userId}`);
    
    res.send(project);
});
app.post('/' , (req, res) => {
    res.send("you send post request");
})

//  Path parameter 





app.get('/search' ,(req, res) => {
     let {q}  = req.query;
     res.send(`<h1>this are the search result query : ${q} </h1>`);
});