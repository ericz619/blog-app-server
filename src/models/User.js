import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
    fullName: String,
    email: {
        type: String,
        validate: {
            async validator(value) {
                const result = await this.constructor.findOne({ email: value });
                if (result) {
                    return false;
                }
            },
            message: 'Email already taken!',
        },
    },
    password: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(this.password, salt);
    // # replace our plain txt to hash pwd
    this.password = hash;
    return next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
};

export default mongoose.model('user', userSchema);
