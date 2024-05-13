// withGuard middleware function with three parameters: req, res, and next function. Only allowing access to certin info when logged in
const withGuard = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
//   sends 403 error code if not logged in and redirects to login in. Else calls next function in the stack
  const apiGuard = (req, res, next) => {
    if (!req.session.logged_in) {
      res.status(403).json({ msg: 'Please login to view this route!' });
    } else {
      next();
    }
  };
// Restricks access to certain routes for logged in users they are redirected to the home. Otherwise it proceeds normally 
  const withoutGuard = (req, res, next) => {
    if (!req.session.logged_in) {
      next();
    } else {
      res.redirect('/');
    }
  };
  
  module.exports = { withGuard, apiGuard, withoutGuard };