const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: [true, "Namespace cannot be empty"],
        trim: true,
        minlength: 2,
        maxlength: 30
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: [30, "Last name must be 30 characters max."]
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    avatar:{
        type: String,
        default:'default.png'
    },
    password: {
        type: String,
        required: true,

    }
}, { collection: 'user', timestamps: true })

const User = mongoose.model('User', UserSchema)

module.exports=User