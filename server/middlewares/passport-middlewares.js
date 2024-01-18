import passport from 'passport';
import { Strategy } from 'passport-jwt';
import { PrismaClient } from '@prisma/client';

const SECRET = process.env.SECRET;

const prisma = new PrismaClient();

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) token = req.cookies['token'];
  return token;
};

const opts = {
  secretOrKey: SECRET,
  jwtFromRequest: cookieExtractor,
};

passport.use(
  new Strategy(opts, async ({ email }, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { 
            email: email 
        },
        select: { 
            id: true, 
            email: true,
            firstName: true,
            lastName: true,
            createdAt: true
        },
      });

      if (!user) {
        throw new Error('401 not authorized');
      }

      return done(null, user);
    } catch (error) {
      console.log(error.message);
      done(null, false);
    }
  })
);

export default passport;
