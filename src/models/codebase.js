import mongoose from 'mongoose';

var codebaseSchema = new mongoose.Schema({
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

var Codebase = mongoose.model("Codebase", codebaseSchema);

export {
    codebaseSchema,
    Codebase
};
