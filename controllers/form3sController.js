const Form3 = require('../models/Form3')
const User = require('../models/User')

// @desc Get all tax return form3s 
// @route GET /form3s
// @access Private
const getAllForm3s = async (req, res) => {
    // Get all form3s from MongoDB
    const form3s = await Form3.find().lean()

    // If no form3s 
    if (!form3s?.length) {
        return res.status(400).json({ message: 'No form3s found' })
    }



    // Add username to each note before sending the response
    const form3sWithUser = await Promise.all(form3s.map(async (form3) => {
        const user = await User.findById(form3.user).lean().exec()
        return { ...form3, username: user.username }
    }))

    res.json(form3sWithUser)
}

// @desc Create new tax return form3
// @route POST /form3s
// @access Private
const createNewForm3 = async (req, res) => {
    const { user, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21 } = req.body

    // Confirm data
    if (!user || !q1 || !q2 || !q3 || !q4 || !q5 || !q6 || !q7 || !q8 || !q9 || !q10 || !q11 || !q12 || !q13 || !q14 || !q15 || !q16 || !q17 || !q18 || !q19 || !q20 || !q21) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate name 
    // const duplicate = await Form3.findOne({ q1 }).collation({ locale: 'en', strength: 3 }).lean().exec()

    // if (duplicate) {
    //     return res.status(409).json({ message: 'Duplicate form3 name' })
    // }

    // Create and store the new form3
    const form3 = await Form3.create({ user, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21 })

    if (form3) { // Created 
        return res.status(303).json({ message: 'New form3 created' })
    } else {
        return res.status(400).json({ message: 'Invalid form3 data received' })
    }
    
}

// @desc Update a tax return form3
// @route PATCH /form3s
// @access Private
const updateForm3 = async (req, res) => {
    const { id, user, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21 } = req.body

    // Confirm data
    if (!user || !q1 || !q3 || !q3 || !q4 || !q5 || !q6 || !q7 || !q8 || !q9 || !q10 || !q11 || !q12 || !q13 || !q14 || !q15 || !q16 || !q17 || !q18 || !q19 || !q20 || !q21) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm form3 exists to update
    const form3 = await Form3.findById(id).exec()

    if (!form3) {
        return res.status(400).json({ message: 'Form3 not found' })
    }

    // Check for duplicate form3s by name 
    const duplicate = await Form3.findOne({ user }).collation({ locale: 'en', strength: 3 }).lean().exec()

    // Allow updating of the original form3 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate form3 found' })
    }

    form3.user = user
    form3.q1 = q1
    form3.q3 = q3
    form3.q3 = q3
    form3.q4 = q4
    form3.q5 = q5
    form3.q6 = q6
    form3.q7 = q7
    form3.q8 = q8
    form3.q9 = q9
    form3.q10 = q10
    form3.q11 = q11
    form3.q12 = q12
    form3.q13 = q13
    form3.q14 = q14
    form3.q15 = q15
    form3.q16 = q16
    form3.q17 = q17
    form3.q18 = q18
    form3.q19 = q19
    form3.q20 = q20
    form3.q21 = q21

    const updatedForm3 = await form3.save()

    res.json(`${updatedForm3.q1} updated`)
}

// @desc Delete a tax return form3
// @route DELETE /form3s
// @access Private
const deleteForm3 = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Form3 ID required' })
    }
    
    // Confirm form exists to delete
    const form3 = await Form3.findById(id).exec()

    if (!form3) {
        return res.status(400).json({ message: 'Form3 not found' })
    }

    const result = await form3.deleteOne()

    const reply = `Form3 ${result.q1} with ID ${result._id} deleted`

    res.json(reply)
}
    
module.exports = {
    getAllForm3s,
    createNewForm3,
    updateForm3,
    deleteForm3
}