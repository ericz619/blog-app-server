import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('user', userSchema);
