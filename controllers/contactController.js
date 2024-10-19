const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel")

//@desc Get all contacts
//@route Get /api/contacts
//@acc ess public
const getContacts = asyncHandler (async(req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

//@desc Create New Contacts
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async(req, res) => {
    console.log("The requested body is ", req.body);
    const {name, email, phone} = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone
    });
    res.status(201).json(contact);
});

//@desc Get New Contacts
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
    res.status(201).json({message: `Create contact for ${req.params.id}`});
});

//@desc delete New Contacts
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async(req, res) => {
    res.status(201).json({message: `Deleted contact for ${req.params.id}`});
});

//@desc Update New Contacts
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async(req, res) => {
    res.status(201).json({message: `Updated contact for ${req.params.id}`});
});

module.exports = {getContact, getContacts, createContact, deleteContact, updateContact};