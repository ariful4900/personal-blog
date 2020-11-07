//name email passwor and profile

const { Schema, model } = require('mongoose');

// const Profile = require('./Profile');

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        maxlength: 15
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',

    },
    profilePics: {
        type: String,
        default:'/uploads/user-default.png'
    }
}, {
    timestamps: true
})

const User = model('User', userSchema);

module.exports = User