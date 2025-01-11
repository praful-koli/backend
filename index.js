const express = require("express");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')
const app = express();
const port = 8080;
const path = require("path");
const { ppid } = require("process");


app.use(methodOverride('_method'))
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"/public")));

app.set("view engine" ,"ejs")
app.set("views",path.join(__dirname,"/views"));

let posts = [
    {   id : uuidv4(),
        username: "praful@124",
        content : "I am MERN Developer, Working google",
    },

    {   
        id : uuidv4(),
        username: "Harry@146",
        content : "Hey, I am a youtuber and make tech content !"
    },
    
    {
        id : uuidv4(),
        username: "jack@34",
        content : "Hey, I am  Movie actor !"
    },
];

app.get('/posts',(req ,res) => {  
    res.render('index',{posts});
})

app.get('/posts/new' , (req, res) => {
    res.render('new');
});

app.post('/posts', (req , res) => {
   let {username, content} = req.body;
   let id = uuidv4();
   posts.push({ id ,username ,content});
   res.redirect('/posts');
});

app.get('/posts/:id', (req , res) => {
    let {id} = req.params;
    let post = posts.find((p)=> p.id == id) ;
    res.render('show', {post});
 });

app.patch('/posts/:id', (req, res) => {
    let {id} = req.params;
    let post = posts.find((p)=> p.id == id) ;
    let newContent = req.body.content;
    post.content = newContent;
    console.log(post);
    res.redirect('/posts');
    res.send("patch is working");
});


app.get('/posts/:id/edit' ,(req, res) => {
    let {id} = req.params;
    let post = posts.find((p)=> p.id == id) ;
    console.log(post);
    res.render('edit', {post});
});


app.delete('/posts/:id', (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id) ;
    res.redirect('/posts')
})

app.listen(port, (req, res) => {
    console.log(`Listening to port : ${port}`);
});
