const router = require('express').Router();
const Users = require('../models/Users');

// Show the form to "Create" User
router.get('/users/signup', (req, res) => {
  res.render('users/new-user');
})

// Save user
router.post('/users/save-user', async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];
  if(!name) errors.push('The Name is required.');
  if(!email) errors.push('The Email is required.');
  if(!password) errors.push('The Password is required.');
  if(!confirm_password) errors.push('You must confirm the password.');
  if(password <= 4 || confirm_password <= 4){
    errors.push('The Password must have at least 4 characters.')
  }
  if(password !== confirm_password){
    errors.push("The Password and Confirmation Password not match.");
  }
  if(errors.length > 0){
    req.flash('errorMsg', errors);
    res.redirect('/users/signup');
  } else {
    const emailUser = await Users.findOne({email});
    if(emailUser) {
      req.flash('errorMsg', 'The Email already exist.');
      res.redirect('/users/signup');
    } else {
      const user = new Users();
      user.name = name;
      user.email = email;
      user.password = user.encryptPassword(password);
      await user.save();
      req.flash('successMsg', 'You are registered')
      res.redirect('/users/login');
    }
  }

});

router.get('/users/login', (req, res) => {
  res.render('users/login-user');
});

module.exports = router;