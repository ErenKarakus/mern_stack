const Form2 = require('../models/Form2')
const User = require('../models/User')

// @desc Get all tax return form2s 
// @route GET /form2s
// @access Private
const getAllForm2s = async (req, res) => {
    // Get all form2s from MongoDB
    const form2s = await Form2.find().lean()

    // If no form2s 
    if (!form2s?.length) {
        return res.status(400).json({ message: 'No form2s found' })
    }



    // Add username to each note before sending the response
    const form2sWithUser = await Promise.all(form2s.map(async (form2) => {
        const user = await User.findById(form2.user).lean().exec()
        return { ...form2, username: user.username }
    }))

    res.json(form2sWithUser)
}

// @desc Create new tax return form2
// @route POST /form2s
// @access Private
const createNewForm2 = async (req, res) => {
    const { user, q1, q2, q3, q4, q5, q6, q7, q8, q9 } = req.body

    // Confirm data
    if (!user || !q1 || !q2 || !q3 || !q4 || !q5 || !q6 || !q7 || !q8 || !q9) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate name 
    // const duplicate = await Form2.findOne({ q1 }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // if (duplicate) {
    //     return res.status(409).json({ message: 'Duplicate form2 name' })
    // }

    // Create and store the new form2
    const form2 = await Form2.create({ user, q1, q2, q3, q4, q5, q6, q7, q8, q9 })

    if (form2) { // Created 
        return res.status(201).json({ message: 'New form2 created' })
    } else {
        return res.status(400).json({ message: 'Invalid form2 data received' })
    }
    
}

// @desc Update a tax return form2
// @route PATCH /form2s
// @access Private
const updateForm2 = async (req, res) => {
    const { id, user, q1, q2, q3, q4, q5, q6, q7, q8, q9 } = req.body

    // Confirm data
    if (!user || !q1 || !q2 || !q3 || !q4 || !q5 || !q6 || !q7 || !q8 || !q9) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm form2 exists to update
    const form2 = await Form2.findById(id).exec()

    if (!form2) {
        return res.status(400).json({ message: 'Form2 not found' })
    }

    // Check for duplicate form2s by name 
    const duplicate = await Form2.findOne({ user }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow updating of the original form2 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate form2 found' })
    }

    form2.user = user
    form2.q1 = q1
    form2.q2 = q2
    form2.q3 = q3
    form2.q4 = q4
    form2.q5 = q5
    form2.q6 = q6
    form2.q7 = q7
    form2.q8 = q8
    form2.q9 = q9

    const updatedForm2 = await form2.save()

    res.json(`${updatedForm2.q1} updated`)
}

// @desc Delete a tax return form2
// @route DELETE /form2s
// @access Private
const deleteForm2 = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Form2 ID required' })
    }
    
    // Confirm form exists to delete
    const form2 = await Form2.findById(id).exec()

    if (!form2) {
        return res.status(400).json({ message: 'Form2 not found' })
    }

    const result = await form2.deleteOne()

    const reply = `Form2 ${result.q1} with ID ${result._id} deleted`

    res.json(reply)
}
    
module.exports = {
    getAllForm2s,
    createNewForm2,
    updateForm2,
    deleteForm2
}