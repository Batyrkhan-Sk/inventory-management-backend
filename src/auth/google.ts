import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from '../config/prisma';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "https://inventory-management-backend-s5o3.onrender.com/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        let user = await prisma.user.findUnique({
          where: { email: profile.emails?.[0].value },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: profile.emails?.[0].value!,
              username: profile.displayName,
              googleId: profile.id,
            },
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;
