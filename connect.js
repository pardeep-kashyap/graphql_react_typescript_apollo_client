import mongoose from 'mongoose'
import { MONGODB_URL } from './config.js';
export const connect = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.log(error)
    });

}