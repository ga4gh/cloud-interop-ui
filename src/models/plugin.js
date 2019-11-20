import mongoose from 'mongoose';
import {inputSchema} from './input';
import {codebaseSchema} from './codebase';

var pluginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    inputs: {
        type: [inputSchema],
        required: true
    },
    codebase: {
        type: codebaseSchema,
        required: true
    }
})

var Plugin = mongoose.model("Plugin", pluginSchema);

export default Plugin;
