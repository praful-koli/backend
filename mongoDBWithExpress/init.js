

const mongoose = require("mongoose");
const chat = require("./models/chat.js");





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


let chats = [
    {
      from: "neha",
      to: "preeti",
      msg: "send me notes for the exam",
      created_at: new Date(),
    },
    {
      from: "rahul",
      to: "anita",
      msg: "can you join the meeting?",
      created_at: new Date(),
    },
    {
      from: "arjun",
      to: "neha",
      msg: "don't forget the project submission",
      created_at: new Date(),
    },
    {
      from: "shivani",
      to: "rohan",
      msg: "happy birthday!",
      created_at: new Date(),
    },
    {
      from: "anita",
      to: "rahul",
      msg: "sent you the report",
      created_at: new Date(),
    },
    {
      from: "preeti",
      to: "neha",
      msg: "got the notes, thanks",
      created_at: new Date(),
    },
    {
      from: "rohan",
      to: "shivani",
      msg: "thanks for the wishes!",
      created_at: new Date(),
    },
    {
      from: "neha",
      to: "arjun",
      msg: "project submission done",
      created_at: new Date(),
    },
    {
      from: "anita",
      to: "arjun",
      msg: "need help with the presentation",
      created_at: new Date(),
    },
    {
      from: "shivani",
      to: "anita",
      msg: "I'll send the slides",
      created_at: new Date(),
    },
  ];

  
  chat.insertMany(chats);