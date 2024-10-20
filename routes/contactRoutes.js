const express = require("express");
const router = express.Router();
const {getContact, getContacts, updateContact, deleteContact, createContact} = require("../controllers/contactController.js"); 

// after the user has signed in, they are assigned a jwt which is their validation token and will be used for future operations
const validateToken = require("../middleware/validateTokenHandler.js");

router.use(validateToken); 
router.route("/").get(getContacts);
router.route("/").post(createContact);
router.route("/:id").get(getContact);
router.route("/:id").put(updateContact);
router.route("/:id").delete(deleteContact);

module.exports = router;

// and you don't seem to understand