const Form1 = require('../models/Form1')
const User = require('../models/User')

// @desc Get all tax return form1s 
// @route GET /form1s
// @access Private
const getAllForm1s = async (req, res) => {
    // Get all form1s from MongoDB
    const form1s = await Form1.find().lean()

    // If no form1s 
    if (!form1s?.length) {
        return res.status(400).json({ message: 'No form1s found' })
    }



    // Add username to each note before sending the response
    const form1sWithUser = await Promise.all(form1s.map(async (form1) => {
        const user = await User.findById(form1.user).lean().exec()
        return { ...form1, username: user.username }
    }))

    res.json(form1sWithUser)
}

// @desc Create new tax return form1
// @route POST /form1s
// @access Private
const createNewForm1 = async (req, res) => {
    const { user, q1, q2, q3a, q3b, q3c, q3d, q3e, q4, q5 } = req.body

    // Confirm data
    if (!user || !q1 || !q2 || !q3a || !q3b || !q3c || !q3d || !q3e || !q4 || !q5) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate name 
    const duplicate = await Form1.findOne({ q1 }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate form1 name' })
    }

    // Create and store the new form1
    const form1 = await Form1.create({ user, q1, q2, q3a, q3b, q3c, q3d, q3e, q4, q5 })

    if (form1) { // Created 
        return res.status(201).json({ message: 'New form1 created' })
    } else {
        return res.status(400).json({ message: 'Invalid form1 data received' })
    }
    
}

// @desc Update a tax return form1
// @route PATCH /form1s
// @access Private
const updateForm1 = async (req, res) => {
    const { id, user, q1, q2, q3a, q3b, q3c, q3d, q3e, q4, q5 } = req.body

    // Confirm data
    if (!id || !user || !q1 || !q2 || !q3a || !q3b || !q3c || !q3d || !q3e || !q4 || !q5) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm form1 exists to update
    const form1 = await Form1.findById(id).exec()

    if (!form1) {
        return res.status(400).json({ message: 'Form1 not found' })
    }

    // Check for duplicate form1s by name 
    const duplicate = await Form1.findOne({ q1 }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow updating of the original form1 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate form1 found' })
    }

    form1.user = user
    form1.q1 = q1
    form1.q2 = q2
    form1.q3a = q3a
    form1.q3b = q3b
    form1.q3c = q3c
    form1.q3d = q3d
    form1.q3e = q3e
    form1.q4 = q4
    form1.q5 = q5

    const updatedForm1 = await form1.save()

    res.json(`${updatedForm1.q1} updated`)
}

// @desc Delete a tax return form1
// @route DELETE /form1s
// @access Private
const deleteForm1 = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Form1 ID required' })
    }
    
    // Confirm form exists to delete
    const form1 = await Form1.findById(id).exec()

    if (!form1) {
        return res.status(400).json({ message: 'Form1 not found' })
    }

    const result = await form1.deleteOne()

    const reply = `Form1 ${result.q1} with ID ${result._id} deleted`

    res.json(reply)
}
    
module.exports = {
    getAllForm1s,
    createNewForm1,
    updateForm1,
    deleteForm1
}