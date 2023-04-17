const mongoose = require('mongoose')

// What makes up your tax return
const form2Schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    q1: {                        // Employment
        type: [String],
        required: true
    },
    q2: {                        // Self-employment
        type: [String],
        required: true
    },
    q3: {                        // Partnership
        type: [String],
        required: true
    },
    q4: {                        // Property
        type: [String],
        required: true
    },
    q5: {                        // Foreign 
        type: [String],
        required: true
    },
    q6: {                        // Trusts etc
        type: [String],
        required: true
    },
    q7: {                        // Capital Gains Tax Summary
        type: [String],
        required: true
    },
    q8: {                        // Residence, remittance basis etc
        type: [String],
        required: true
    },
    q9:{                         // Other income 
        type: [String],
        required: true
    }
})

module.exports = mongoose.model('Form2', form2Schema)
