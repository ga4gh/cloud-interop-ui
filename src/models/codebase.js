import mongoose from 'mongoose';
import {githubSourceSchema} from './codebaseTypes/source/githubSource';
import {pypiSourceSchema} from './codebaseTypes/source/pypiSource';
import {pythonLanguageSchema} from './codebaseTypes/language/pythonLanguage';

var codebaseSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true,
        enum: ['github', 'pypi']
    },

    githubSource: {
        type: githubSourceSchema
    },

    pypiSource: {
        type: pypiSourceSchema
    },

    language: {
        type: String,
        required: true,
        enum: ['python']
    },

    pythonLanguage: {
        type: pythonLanguageSchema
    }
})

var Codebase = mongoose.model("Codebase", codebaseSchema);

export {
    codebaseSchema,
    Codebase
};
