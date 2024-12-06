const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const prisma = require('../prisma.cjs');
const { validPassword } = require('../lib/passwordUtils.js');

async function findUser(username) {    
    const user = await prisma.user.findFirst({
        where: {
            username: {
                equals: username,
                mode: 'insensitive',
            }

        },
    })
    return user;
 }
 async function findById(id) {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        }
    })
    return user;
 }

passport.use(new LocalStrategy(
    async function(username, password, done) {
        try {
            const user = await findUser(username);
            if (!user) {
                return done(null, false);
            }
            
            const isValid = validPassword(password, user.hash, user.salt);

            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }
        catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
})
