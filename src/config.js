import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (!dotenv.config()) throw new Error('No .env file found!');

const config = {
    port: process.env.PORT || 8080,
    mongoUri: process.env.MONGO_URI,
};

export default config;
