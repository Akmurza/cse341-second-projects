const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger-output.json');
const { passport } = require('../config/passport');
const { ensureOAuthConfigured } = require('../middleware/auth');
const booksRoutes = require('./books');
const receiptsRoutes = require('./receipts');

const router = express.Router();

router.get('/', (req, res) => {
  /* #swagger.tags = ['Health'] */
  res.status(200).json({
    message: 'Second Project API is running',
    docs: '/api-docs',
    auth: {
      login: '/login',
      status: '/auth/status',
      logout: '/logout'
    }
  });
});

router.get('/login', ensureOAuthConfigured, (req, res, next) => {
  /* #swagger.tags = ['Auth'] */
  /* #swagger.description = 'Starts GitHub OAuth login flow.' */
  passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
});

router.get('/oauth/github/callback', ensureOAuthConfigured, (req, res, next) => {
  /* #swagger.tags = ['Auth'] */
  /* #swagger.description = 'GitHub OAuth callback endpoint.' */
  passport.authenticate('github', {
    failureRedirect: '/auth/failure',
    session: true
  })(req, res, next);
}, (req, res) => {
  res.status(200).json({
    message: 'OAuth login successful',
    user: {
      id: req.user?._id,
      username: req.user?.username,
      displayName: req.user?.displayName
    }
  });
});

router.get('/auth/status', (req, res) => {
  /* #swagger.tags = ['Auth'] */
  /* #swagger.description = 'Returns authentication state of current session.' */
  res.status(200).json({
    authenticated: Boolean(req.isAuthenticated && req.isAuthenticated()),
    user: req.user
      ? {
          id: req.user._id,
          username: req.user.username,
          displayName: req.user.displayName
        }
      : null
  });
});

router.get('/logout', (req, res, next) => {
  /* #swagger.tags = ['Auth'] */
  /* #swagger.description = 'Logs out current user session.' */
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });
});

router.get('/auth/failure', (req, res) => {
  /* #swagger.tags = ['Auth'] */
  res.status(401).json({ message: 'OAuth login failed' });
});

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/books', booksRoutes);
router.use('/receipts', receiptsRoutes);

module.exports = router;
