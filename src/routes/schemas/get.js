import {codebaseSchema} from '../../models/codebase';

const get = (req, res) => {
    const schemas = {
        codebase: codebaseSchema
    }

    // console.log(codebaseSchema.paths.source.options.enum);
    res.send(schemas[req.params.schema]);
}

export default get;
