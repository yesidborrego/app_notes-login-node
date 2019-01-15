const helpers = {
isAuth: ((req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/users/login');
})
};

module.exports = helpers;