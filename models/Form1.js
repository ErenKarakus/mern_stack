const mongoose = require('mongoose')

// Starting your tax return
const form1Schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    q1: {                        // Your date of birth
        type: Date,
        required: true
    },
    q2: {                        // Your name
        type: String,
        required: true
    },
    q3a: {                       // Address line 1
        type: String,
        required: true
    },
    q3b: {                      // Address line 2
        type: String,
        required: false
    },
    q3c: {                      // City
        type: String,
        required: true
    },
    q3d: {                      // County              
        type: String,
        required: true
    },
    q3e: {                      // Postcode
        type: String,
        required: true
    },
    q4: {                       // Phone number
        type: String,
        required: true
    },
    q5: {                       // National insurance number
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Form1', form1Schema)
