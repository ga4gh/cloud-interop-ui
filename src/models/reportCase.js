import mongoose from 'mongoose';

var reportCaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    debug: {
        type: [String]
    },
    info: {
        type: [String]
    },
    warn: {
        type: [String]
    },
    error: {
        type: String
    }
})

var ReportCase = mongoose.model("ReportCase", reportCaseSchema);

export {
    reportCaseSchema,
    ReportCase
}
