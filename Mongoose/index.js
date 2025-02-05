const user = require("./model/user");
const mongoose = require("mongoose");
const main = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
};

main()
  .then((response) => {
    console.log("connections sucessfull 👍😊🧑‍💻");
  })
  .catch((err) => console.log(err));

user.find()
.then((res) => console.log(res))
.catch((err) => console.log("data not found"));