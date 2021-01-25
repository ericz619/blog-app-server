import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tag' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('post', postSchema);
