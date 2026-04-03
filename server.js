const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config();

const { connectToMongo } = require('./src/database/connect');
const routes = require('./src/routes');
const { passport, oauthEnabled } = require('./src/config/passport');
const { notFoundHandler, errorHandler } = require('./src/middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3001;

app.set('trust proxy', 1);

app.use((req, res, next) => {
  if (req.path !== '/' && 
      !req.path.startsWith('/api-docs') && 
      req.path.length > 1 && 
      req.path.endsWith('/')) {
    res.redirect(301, req.path.slice(0, -1));
  } else {
    next();
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback-session-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.locals.oauthEnabled = oauthEnabled;

app.use('/', routes);

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectToMongo();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
