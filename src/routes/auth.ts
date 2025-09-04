import { Router } from 'express';
import passport from '../auth/google';
import jwt from 'jsonwebtoken';

const router = Router();

router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
  })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const user = req.user as any;

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.redirect(`https://itemvault.netlify.app/login?token=${token}`);
  }
);

export default router;
