import mongoose from 'mongoose';

var pypiSourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    version: {
        type: String,
    }
})

export {
    pypiSourceSchema
}