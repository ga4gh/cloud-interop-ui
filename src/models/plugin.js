import mongoose from 'mongoose';

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
        type: String,
        required: true
    },
    codebase: {
        type:String,
        required: true
    }
})

var Plugin = mongoose.model("Plugin", pluginSchema);

export default Plugin;
