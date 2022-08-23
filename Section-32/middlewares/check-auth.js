function checkAuthStatus(req, res, next) {
  const uid = req.session.uid;

  if (!uid) {
    return next();
  }

  // Else User is logged in :)
  res.locals.uid = uid;
  res.locals.isAuth = true;
  return next();
}

module.exports = checkAuthStatus;
