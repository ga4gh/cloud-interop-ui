import mongoose from 'mongoose';

var inputSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

var Input = mongoose.model("Input", inputSchema);

export {
    inputSchema,
    Input
};
