const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { getDatabase } = require('../database/connect');

const oauthEnabled =
  Boolean(process.env.GITHUB_CLIENT_ID) &&
  Boolean(process.env.GITHUB_CLIENT_SECRET) &&
  Boolean(process.env.GITHUB_CALLBACK_URL);

passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getDatabase().collection('users').findOne({
      _id: new (require('mongodb').ObjectId)(id)
    });

    done(null, user || false);
  } catch (error) {
    done(error);
  }
});

if (oauthEnabled) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const users = getDatabase().collection('users');
          const githubId = profile.id;

          let user = await users.findOne({ githubId });

          if (!user) {
            const newUser = {
              githubId,
              username: profile.username || null,
              displayName: profile.displayName || null,
              profileUrl: profile.profileUrl || null,
              provider: profile.provider,
              createdAt: new Date(),
              lastLoginAt: new Date()
            };

            const insertResult = await users.insertOne(newUser);
            user = { ...newUser, _id: insertResult.insertedId };
          } else {
            await users.updateOne(
              { _id: user._id },
              {
                $set: {
                  username: profile.username || user.username,
                  displayName: profile.displayName || user.displayName,
                  profileUrl: profile.profileUrl || user.profileUrl,
                  lastLoginAt: new Date()
                }
              }
            );
          }

          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
} else {
  console.warn(
    'GitHub OAuth is not configured. Set GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, and GITHUB_CALLBACK_URL.'
  );
}

module.exports = {
  passport,
  oauthEnabled
};
