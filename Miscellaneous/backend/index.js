const express = require("express");
const app = express();
let port = 8080;

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.get('/register', (req, res) => {
    let {user, password} = req.query;
    res.send(`stander get respones . Wlcome ${user} ${password}`);
})

app.post('/register', (req, res) => {
    let {user, password} = req.body;
    res.send(`stander get respones . Wlcome ${user} ${password}`);

    console.log(req.body);   
    res.send("stander post request");
})
app.listen(port, () => {
    console.log(`Linting to port ${port} `);
});
