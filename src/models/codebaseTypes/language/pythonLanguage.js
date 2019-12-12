import mongoose from 'mongoose';

var pythonLanguageSchema = new mongoose.Schema({
    version: {
        type: String,
        required: true,
        enum: ["3.6", "3.7"]
    },

    package: {
        type: String,
        required: true
    },

    module: {
        type: String,
        required: true
    },

    method: {
        type: String,
        required: true
    }
})

export {
    pythonLanguageSchema
}
