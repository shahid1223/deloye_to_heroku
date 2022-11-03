const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true
    },
    followers: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            followerSince: {
                type: Date,
                default: Date.now
            }
        }
    ],
    following: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            followingSince: {
                type: Date,
                default: Date.now
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('user', userSchema);
module.exports = User;