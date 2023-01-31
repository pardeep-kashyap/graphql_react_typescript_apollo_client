import mongoose, { model, Schema } from 'mongoose';
const quoteSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },

})

model('quotes', quoteSchema)