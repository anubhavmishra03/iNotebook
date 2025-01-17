const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1: Get all the notes using GET "/api/auth/getuser". Login requires
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occurred");
  }
});

// Route 2:  Add a new note using POST "/api/auth/addnote". Login requires
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
        const { title, description, tag } = req.body; 
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors:errors.array() });
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occurred");
    }
  }
);

// Route 3:  Update an existing note using PUT "/api/auth/updatenote". Login requires
router.put(
    "/updatenote/:id",
    fetchUser, async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const newNote = {};
            if (title) {newNote.title = title};
            if (description) {newNote.description = description};
            if (tag) {newNote.tag = tag};

            // Find the note note to be updated and update it
            let note = await Notes.findById(req.params.id);
            if (!note) {return res.status(404).send("Note not found!")}

            if (note.user.toString() !== req.user.id){
                return res.status(401).send("Not Allowed!");
            }

            note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
            res.json({note});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error Occurred");
        }
    }
);

// Route 4:  Delete an existing note using: DELETE "/api/auth/deletenote". Login requires
router.delete(
    "/deletenote/:id",
    fetchUser, async (req, res) => {
        try {
            // Find the note note to be deleted and delete it
            let note = await Notes.findById(req.params.id);
            if (!note) {return res.status(404).send("Note not found!")}

            if (note.user.toString() !== req.user.id){
                return res.status(401).send("Not Allowed!");
            }

            note = await Notes.findByIdAndDelete(req.params.id)
            res.json({"Success": "Note has been deleted!", note:note});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error Occurred");
        }
    }
);

module.exports = router;
