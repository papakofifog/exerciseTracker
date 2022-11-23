const mongoose = require('mongoose')
const ModelSchema= mongoose.Schema

const logsSchema= ModelSchema({
    username: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
    },
    _id: {
        type: ModelSchema.Types.ObjectId,
        ref: 'user'
    },
    logs: {
        type: Array
    }
})


module.exports= mongoose.model('log',logsSchema)