import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
    name: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('tag', tagSchema);
