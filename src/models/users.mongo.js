const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    email: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true
    },
    role: {
        type : String,
        enum : ['admin','user'],
        default: 'user'
    },
    isDeleted : {
        type : Boolean,
        required : true,
        default : false
    }
})

usersSchema.pre("save",async function(next) {

})

// hash the password
usersSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

// checking if password is valid
usersSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

usersSchema.index({email : 1},{unique:true})

module.exports = mongoose.model('User',usersSchema);