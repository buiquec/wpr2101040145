const cookie = require('cookie-parser')
const authenticateUser = (req, res, next) => {
    const user = req.cookies.user;
    if (!user) {
      return res.redirect('/');
    }
    next();
  };
  
  module.exports = authenticateUser;


