import mongoose from 'mongoose';

var scheduleSchema = new mongoose.Schema({
    cronString: {
        type: String,
        required: true
    }
})

var Schedule = mongoose.model("Schedule", scheduleSchema);

export {
    scheduleSchema,
    Schedule
};
