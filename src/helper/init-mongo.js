import mongoose from 'mongoose';
import config from '../config';

(async () => {
    try {
        await mongoose.connect(config.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        console.log('Successfully connected to database!');
    } catch (e) {
        if (e) throw new Error(E);
    }
})();
