import mongoose from 'mongoose';

var githubSourceSchema = new mongoose.Schema({
    organization: {
        type: String,
        required: true
    },
    repository: {
        type: String,
        required: true
    },
    branch: {
        type: String
    }
})

export {
    githubSourceSchema
}
