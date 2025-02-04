const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");6
const chat = require("./models/chat.js");
const port = 8080;
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

main()
  .then((res) => {
    console.log("Database connection sucessful👍👍👍");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// Index Route

app.get("/chats", async (req, res) => {
  let chatData = await chat.find();
  // console.log(chatData);
  res.render("index", { chatData });
});

// new route

app.get("/chats/new", (req, res) => {
  res.render("new");
});

// post chats
app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });

  newChat
    .save()
    .then((res) => {
      console.log("chat was save");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

// edit route

app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chatData = await chat.findById(id.trim());
  res.render("edit", { chatData });
});

//Update route

app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg : newMsg } = req.body;
  let chats = await chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true , new : true });
  console.log(chats);
  res.redirect("/chats");
});



app.get("/", (req, res) => {
  res.send("Server is working");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
