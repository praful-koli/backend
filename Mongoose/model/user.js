const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
    name : {
        type : String,
        require : true,
    },

    email : {
        type : String,
    },

    age : {
        type : Number,
        require : true,
    }
})


const user = mongoose.model('user' , userSchema);

module.exports =  user;