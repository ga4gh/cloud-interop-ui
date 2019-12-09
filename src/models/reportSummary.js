import mongoose from 'mongoose';

var reportSummarySchema = new mongoose.Schema({
    run: {
        type: Number,
        required: true
    },
    passed: {
        type: Number,
        required: true
    },
    warned: {
        type: Number,
        required: true
    },
    failed: {
        type: Number,
        required: true
    },
    skipped: {
        type: Number,
        required: true
    }
})

var ReportSummary = mongoose.model("ReportSummary", reportSummarySchema);

export {
    reportSummarySchema,
    ReportSummary
}
