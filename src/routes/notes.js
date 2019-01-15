const router = require('express').Router();
const Notes = require('../models/Notes');
const { isAuth } =  require('../helpers/auth');

// Show all the notes
router.get('/notes', isAuth, async (req, res) => {
  const notes = await Notes.find({user_id: req.user.id}).sort({date: -1});
  res.render('notes/showNotes', { notes });
});

// Show the form to "Create" a new note
router.get('/notes/new', isAuth, (req, res) => {
  res.render('notes/newNote');
})

// Save the note
router.post('/notes/save-notes', isAuth, async (req, res) => {
  const { title, description } = req.body;
  const errors = []
  if(!title) {
    errors.push('You must write the title');
  }
  if(!description) {
    errors.push('You must write the description');
  }
  if(errors.length > 0){
    req.flash('errorMsg', errors);
    res.redirect('/notes/new');
  } else {
    const note = new Notes({title, description, user_id: req.user.id});
    await note.save();
    req.flash('successMsg', 'The Note was added successfully')
    res.redirect('/notes');
  }
});

// Show the form to "Edit" a note
router.get('/notes/edit/:id', isAuth, async (req, res) => {
  const note = await Notes.findById(req.params.id);
  res.render('notes/editNote', { note });
});

// Update the note
router.put('/notes/edit-notes/:id', isAuth, async (req, res) => {
  const { title, description } = req.body;
  await Notes.findByIdAndUpdate(req.params.id, {title, description});
  req.flash('successMsg', 'The Note was edit successfully');
  res.redirect('/notes');
});

// Show the form to "Delete" a note
router.delete('/notes/delete/:id', isAuth, async (req, res, next) => {
  await Notes.findByIdAndDelete(req.params.id);
  req.flash('successMsg', 'The Note was delete successfully')
  res.redirect('/notes');
});


module.exports = router;