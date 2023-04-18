const mongoose = require('mongoose')

// Income
const form3Schema = new mongoose.Schema({
    // Interest and dividends from UK banks and building societies
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    q1: {                        // Taxed UK interest
        type: Number,
        required: false
    },
    q2: {                        // Untaxed UK interest
        type: Number,
        required: false
    },
    q3: {                        // Untaxed foreign interest (up to £2,000)
        type: Number,
        required: false
    },
    q4: {                        // Dividends from UK companies
        type: Number,
        required: false
    },
    q5: {                        // Other dividends 
        type: Number,
        required: false
    },
    q6: {                        // Foreign dividends (up to £2,000)
        type: Number,
        required: false
    },
    q7: {                        // Tax taken off foreign dividends 
        type: Number,
        required: false
    },
    // UK pensions, annuities and other state benefits received
    q8: {                        // State Pension
        type: Number,
        required: false
    },
    q9:{                         // State Pension lump sum 
        type: Number,
        required: false
    },
    q10: {                      // Tax taken off box 9
        type: Number,
        required: false
    },
    q11: {                      // Pensions (other than State Pension), retirement annuities and taxable lump sums treated as pensions
        type: Number,
        required: false
    },
    q12: {                      // Tax taken off box 11
        type: Number,
        required: false
    },
    q13: {                      // Taxable Incapacity Benefit and contribution-based Employment and Support Allowance
        type: Number,
        required: false
    },
    q14: {                      // Tax taken off Incapacity Benefit and contribution-based Employment and Support Allowance
        type: Number,
        required: false
    },
    q15: {                      // Jobseeker's Allowance
        type: Number,
        required: false
    },
    q16: {                      // Total of any other taxable State Pensions and benefits
        type: Number,
        required: false
    },
    // Other UK income not included on supplementary pages
    q17: {                      // Other taxable income
        type: Number,
        required: false
    },
    q18: {                      // Total amount of allowable expenses
        type: Number,
        required: false
    },
    q19: {                      // Any tax taken off box 17
        type: Number,
        required: false
    },
    q20: {                      // Benefit from pre-owned assets
        type: Number,
        required: false
    },
    q21: {                      // Description of income in boxes 17 and 20
        type: String,
        required: false
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Form3', form3Schema)
