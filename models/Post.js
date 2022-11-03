const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    postimage: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    like: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            likededAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    commets: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
            },
            name: {
                type: String,
            },
            profileImage: {
                type: String,
            },
            commentedAt: {
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

const Post = mongoose.model('post', postSchema);
module.exports = Post;