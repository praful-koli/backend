const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    from : {
        type : String,
        require : true
    },

    to : {
        type : String,
        require : true
    },

    msg : {
        type : String,
        maxLength : 50
    },

    created_at : {
        type : Date,
        require : true

    }

})


const chat = mongoose.model('chat', chatSchema);


module.exports = chat;