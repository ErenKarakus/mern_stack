const Form4 = require('../models/Form4')
const User = require('../models/User')

// @desc Get all tax return form4s 
// @route GET /form4s
// @access Private
const getAllForm4s = async (req, res) => {
    // Get all form4s from MongoDB
    const form4s = await Form4.find().lean()

    // If no form4s 
    if (!form4s?.length) {
        return res.status(400).json({ message: 'No form4s found' })
    }

    // Add username to each note before sending the response
    const form4sWithUser = await Promise.all(form4s.map(async (form4) => {
        const user = await User.findById(form4.user).lean().exec()
        return { ...form4, username: user.username }
    }))

    res.json(form4sWithUser)
}

// @desc Create new tax return form4
// @route POST /form4s
// @access Private
const createNewForm4 = async (req, res) => {
    const { user, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16 } = req.body

    // Confirm data
    if (!user || !q1 || !q2 || !q5 || !q4 || !q5 || !q6 || !q7 || !q8 || !q9 || !q10 || !q11 || !q12 || !q13 || !q14 || !q15 || !q16) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate name 
    // const duplicate = await Form4.findOne({ q1 }).collation({ locale: 'en', strength: 4 }).lean().exec()

    // if (duplicate) {
    //     return res.status(409).json({ message: 'Duplicate form4 name' })
    // }

    // Create and store the new form4
    const form4 = await Form4.create({ user, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q14, q14, q15, q16 })

    if (form4) { // Created 
        return res.status(201).json({ message: 'New form4 created' })
    } else {
        return res.status(400).json({ message: 'Invalid form4 data received' })
    }
    
}

// @desc Update a tax return form4
// @route PATCH /form4s
// @access Private
const updateForm4 = async (req, res) => {
    const { id, user, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16 } = req.body

    // Confirm data
    if (!user || !q1 || !q2 || !q3 || !q4 || !q5 || !q6 || !q7 || !q8 || !q9 || !q10 || !q11 || !q12 || !q13 || !q14 || !q15 || !q16) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm form4 exists to update
    const form4 = await Form4.findById(id).exec()

    if (!form4) {
        return res.status(400).json({ message: 'Form4 not found' })
    }

    // Check for duplicate form4s by name 
    const duplicate = await Form4.findOne({ user }).collation({ locale: 'en', strength: 4 }).lean().exec()

    // Allow updating of the original form4 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate form4 found' })
    }

    form4.user = user
    form4.q1 = q1
    form4.q2 = q2
    form4.q3 = q3
    form4.q4 = q4
    form4.q5 = q5
    form4.q6 = q6
    form4.q7 = q7
    form4.q8 = q8
    form4.q9 = q9
    form4.q10 = q10
    form4.q11 = q11
    form4.q12 = q12
    form4.q14 = q14
    form4.q14 = q14
    form4.q15 = q15
    form4.q16 = q16
    
    const updatedForm4 = await form4.save()

    res.json(`${updatedForm4.q1} updated`)
}

// @desc Delete a tax return form4
// @route DELETE /form4s
// @access Private
const deleteForm4 = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Form4 ID required' })
    }
    
    // Confirm form exists to delete
    const form4 = await Form4.findById(id).exec()

    if (!form4) {
        return res.status(400).json({ message: 'Form4 not found' })
    }

    const result = await form4.deleteOne()

    const reply = `Form4 ${result.q1} with ID ${result._id} deleted`

    res.json(reply)
}
    
module.exports = {
    getAllForm4s,
    createNewForm4,
    updateForm4,
    deleteForm4
}