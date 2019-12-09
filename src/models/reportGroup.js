import mongoose from 'mongoose';
import {reportSummarySchema} from './reportSummary';
import {reportCaseSchema} from './reportCase';

var reportGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    summary: {
        type: reportSummarySchema,
        required: true
    },
    cases: {
        type: [reportCaseSchema],
        required: true
    }
})

var ReportGroup = mongoose.model("ReportGroup", reportGroupSchema);

export {
    reportGroupSchema,
    ReportGroup
}
