import mongoose from 'mongoose';
import {reportSummarySchema} from './reportSummary';
import {reportGroupSchema} from './reportGroup';

var reportSchema = new mongoose.Schema({
    configurationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Configuration",
        required: true
    },
    parameters: {
        type: Object,
        required: true
    },
    generatedAt: {
        type: String,
        required: true
    },
    summary: {
        type: reportSummarySchema,
        required: true
    },
    groups: {
        type: [reportGroupSchema],
        required: true
    }
})

var Report = mongoose.model("Report", reportSchema);

export default Report;