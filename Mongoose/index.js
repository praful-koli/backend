const user = require("./model/user");
const express = require('express');
const mongoose = require("mongoose");
const methodOverride = require('method-override')
const path = require('path');
const app = express();
const port = 8080;
const  chats = require('./model/chats');

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static(path.join(__dirname, "/public")));
app.set('view engine' , 'ejs' );
app.set('views', path.join(__dirname, "/views"))

//database connection
const main = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
};

main()
  .then((response) => {
    console.log("connections sucessfull 👍😊🧑‍💻");
  })
  .catch((err) => console.log(err));

  
  app.get('/chats' , async(req, res) => {
      try {
         let chatData = await chats.find();
         console.log(chatData);
         res.render('index.ejs' , {chatData});
        
      } catch (error) {
        res.status(500).json({error : "issue to fech data from database "});
      }
  })



  app.get('/chats/new' , (req, res) => {
    try {
       res.render('new');
    } catch (error) {
      // res.status(500).json({error : "issue to fech data from database "});
      console.log(error)
    }
})




app.post('/chats/new' , (req, res) => {
    let {to , form , msg} = req.body;
    let data = new chats({
      form : form,
      to : to,
      msg : msg,
      date : new Date()
    });

    data.save()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));

    res.redirect("/chats")
  
})


//  edit route
app.get("/chats/:id/edit", async (req, res) => {
     try {
      let { id } = req.params;
      const chat = await chats.findById(id.trim())
      res.render('edit', {chat});
     } catch (error) {
       console.log(error)
     }
});


app.put('/chats/:id' ,async (req, res) => {
  try {
    let {id} = req.params;
    let {msg  : newMsg} = req.body;
    let data = await chats.findByIdAndUpdate(id, {msg : newMsg} , {runValidators: true , new : true });
    console.log(data);
    res.redirect('/chats')
  } catch (error) {
    console.log(error)
  }
})



app.delete('/chats/:id' , async(req, res) => {
     try {
      let {id} = req.params;
      const data = await chats.findByIdAndDelete(id.trim());
      console.log(data);
      res.redirect('/chats');
     } catch (error) {
      console.log(error)
     }
})

  app.listen(port , () => {
      console.log(`sever lising on port ${port}`);
  })

  