const router = require('express').Router();

// Show "Home" page
router.get('/', (req, res) => {
  res.render('home');
})

// Show "About" page
router.get('/about', (req, res) => {
  res.render('about');
})

module.exports = router;