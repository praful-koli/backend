const mongoose = require('mongoose');

const chatShema = mongoose.Schema({
      form : {
        type : String,
        require : true,
      },

      to : {
        type : String,
        require : true,
      },

      msg : {
        type : String,
        maxLength : 50,
      },

      date : {
        type : Date,
        require : true,
      }
});

const chat = mongoose.model('chat' , chatShema);

module.exports = chat ;