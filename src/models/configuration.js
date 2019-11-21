import mongoose from 'mongoose';
import {scheduleSchema} from './schedule';

var configurationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pluginId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plugin",
        required: true
    },
    parameters: {
        type: Object,
        required: true
    },
    schedule: {
        type: scheduleSchema,
        required: true
    }
})

var Configuration = mongoose.model("Configuration", configurationSchema);

export default Configuration;
