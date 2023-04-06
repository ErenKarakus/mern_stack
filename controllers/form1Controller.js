const Form1 = require('../models/Form1')
const User = require('../models/User')

// @desc Get all tax return forms 
// @route GET /forms
// @access Private
const getAllForm1s = async (req, res) => {
    // Get all form1s from MongoDB
    const forms = await Form1.find().lean()

    // If no form1s 
    if (!forms?.length) {
        return res.status(400).json({ message: 'No form1s found' })
    }

    res.json(forms)
}

// @desc Create new tax return form
// @route POST /forms
// @access Private
const createNewForm1 = async (req, res) => {
    const { q1, q2, q3a, q3b, q3c, q3d, q3e, q4, q5 } = req.body

    // Confirm data
    if (!q1 || !q2 || !q3a || !q3b || !q3c || !q3d || !q3e || !q4 || !q5) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate form1s by name 
    const duplicate = await Form1.findOne({ q1 }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate form1 name' })
    }

    // Create and store the new form
    const form = await Form1.create({ q1, q2, q3a, q3b, q3c, q3d, q3e, q4, q5 })

    if (form) { // Created 
        return res.status(201).json({ message: 'New form1 created' })
    } else {
        return res.status(400).json({ message: 'Invalid form1 data received' })
    }
}

// @desc Update a tax return form
// @route PATCH /forms
// @access Private
const updateForm1 = async (req, res) => {
    const { id, q1, q2, q3a, q3b, q3c, q3d, q3e, q4, q5 } = req.body

    // Confirm data
    if (!id || !q1 || !q2 || !q3a || !q3b || !q3c || !q3d || !q3e || !q4 || !q5) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm form exists to update
    const form = await Form1.findById(id).exec()

    if (!form) {
        return res.status(400).json({ message: 'Form1 not found' })
    }

    // Check for duplicate forms by name 
    const duplicate = await Form1.findOne({ q1 }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow updating of the original form 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate form found' })
    }

    form.q1 = q1
    form.q2 = q2
    form.q3a = q3a
    form.q3b = q3b
    form.q3c = q3c
    form.q3d = q3d
    form.q3e = q3e
    form.q4 = q4
    form.q5 = q5

    const updatedForm1 = await form.save()

    res.json(`${updatedForm1.q1} updated`)
}

const deleteForm1 = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Form1 ID required' })
    }
    
    // Confirm form exists to delete
    const form = await Form1.findById(id).exec()

    if (!form) {
        return res.status(400).json({ message: 'Form not found' })
    }

    const result = await form.deleteOne()

    const reply = `Form1 ${result.q1} with ID ${result._id} deleted`

    res.json(reply)
}
    
module.exports = {
    getAllForm1s,
    createNewForm1,
    updateForm1,
    deleteForm1
}