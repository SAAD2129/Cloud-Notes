const express = require('express');
const router = express.Router();
const Note = require('../models/Notes');
let fetchUser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// ROUTE 1 : // To fetch all notes Login Required
router.get('/fetchnotes', fetchUser, async (req, res) => {
	try {
		let id = req.user.id;
		let notes = await Note.find({ user: id });
		res.json(notes);
	} catch (error) {
		res.status(401).json({ error: 'Not found!' });
	}
});

// ROUTE 2 : // Add note all notes Login Required
router.post(
	'/addnote',
	fetchUser,
	[
		// validating the Title & Description
		body('title', 'minimum length should be 3').isLength({ min: 3 }),
		body('description', 'minimum length should be 6').isLength({ min: 5 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(404).json({ errors: errors.array() });
		}
		try {
			const { title, description } = req.body;
			const note = new Note({
				user: req.user.id,
				title,
				description,
			});
			const notesaved = await note.save();
			res.json(notesaved);
		} catch (err) {
			res.send(404).json({ err });
		}
	},
);

// ROUTE 3 : // Delete note all notes Login Required
router.delete('/deletenote', fetchUser, async (req, res) => {
	try {
		let id = req.header('id');
		console.log(id);
		let finded = await Note.findOne({ id });
		if (finded) {
			await Note.deleteOne({ id });
			res.send('Note Deleted with id ' + id);
		} else {
			res.send('Note not Found with id');
		}
	} catch (error) {
		res.status(401).json({ error });
	}
	// res.json(note);
});

// ROUTE 4 : // Update note all notes Login Required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
	// try {
	let { title, description } = req.body;
	let newNote = {
		title: '',
		description: '',
	};
	if (title) {
		newNote.title = title;
	}
	if (description) {
		newNote.description = description;
	}
	let note = await Note.findById(req.params.id);
	if (!note) return res.status(404).send('Not found');

	if (note.user.toString() !== req.user.id) {
		return res.status(401).send('Not Allowed');
	}
	note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
	res.json({ note });
});

module.exports = router;
