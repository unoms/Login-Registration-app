const { Schema, model } = require('mongoose')

const roleSchema = new Schema({
    role: {
        type: String,
        unique: true,
        default: 'USER'
    }
})

module.exports = model('roles', roleSchema)