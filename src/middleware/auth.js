const ensureOAuthConfigured = (req, res, next) => {
  if (!req.app.locals.oauthEnabled) {
    return res.status(500).json({
      message: 'OAuth is not configured on the server.'
    });
  }

  next();
};

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({
    message: 'Authentication required. Login first using /login.'
  });
};

module.exports = {
  ensureOAuthConfigured,
  isAuthenticated
};
