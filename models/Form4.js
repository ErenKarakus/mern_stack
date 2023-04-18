const mongoose = require('mongoose')

// Tax reliefs
const form4Schema = new mongoose.Schema({
    // Paying into registered pension schemes and overseas pension schemes
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    q1: {                        // Payments to registered pension schemes where basicrate tax relief will be claimed by your 
                                 // pension provider (called ‘relief at source’). Enter the payments and basic rate tax
        type: Number,
        required: false
    },
    q2: {                        // Payments to a retirement annuity contract where basic rate tax relief will not be claimed by your 
                                 // provider
        type: Number,
        required: false
    },
    q3: {                        // Payments to your employer’s scheme which were not deducted from your pay before tax
        type: Number,
        required: false
    },
    q4: {                        // Payments to an overseas pension scheme, which is not UK-registered, which are eligible for tax 
                                 // relief and were not deducted from your pay before tax
        type: Number,
        required: false
    },
    // Charitable giving
    q5: {                        // Gift Aid payments made in the year to 5 April 2022 
        type: Number,
        required: false
    },
    q6: {                        // Total of any ‘one-off’ payments in box 5
        type: Number,
        required: false
    },
    q7: {                        // Gift Aid payments made in the year to 5 April 2022 but treated as if made in the year to 5 April 
                                 // 2021 
        type: Number,
        required: false
    },
    q8: {                        // Gift Aid payments made after 5 April 2022 but to be treated as if made in the year to 5 April 
                                 // 2022
        type: Number,
        required: false
    },
    q9:{                         // Value of qualifying shares or securities gifted to charity 
        type: Number,
        required: false
    },
    q10: {                      // Value of qualifying land and buildings gifted to charity
        type: Number,
        required: false
    },
    q11: {                      // Value of qualifying investments gifted to non-UK charities in boxes 9 and 10
        type: Number,
        required: false
    },
    q12: {                      // Gift Aid payments to non-UK charities in box 5
        type: Number,
        required: false
    },
    // Blind Person's Allowance
    q13: {                      // If you’re registered blind, or severely sight impaired, and your name is on a local authority or 
                                // other register, put ‘X’ in the box
        type: Boolean,
        required: false
    },
    q14: {                      // Enter the name of the local authority or other register
        type: String,
        required: false
    },
    q15: {                      // If you want your spouse’s, or civil partner’s, surplus allowance, put ‘X’ in the box
        type: Boolean,
        required: false
    },
    q16: {                      //  If you want your spouse, or civil partner, to have your surplus allowance, put ‘X’ in the box
        type: Boolean,
        required: false
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Form4', form4Schema)
