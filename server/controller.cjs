const prisma = require('./prisma.cjs');
const genPassword = require('../server/lib/passwordUtils').genPassword
const passport = require('passport');

exports.registerPost = async (req, res) => {
    const username = req.body.username;
    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const user = await prisma.user.create({
        data: {
            username,
            hash,
            salt,
        },
    })
    console.log('user added');
    
    // res.redirect('/');
}
exports.loginPost = async (req, res) => {
    const username = JSON.stringify(req.user.username);
    // console.log(username);
       
    res.send(username);
}
exports.validate = passport.authenticate(
    'local',
    {
        failureRedirect: '/loginFailure',
    }
)

exports.dataGet = async (req, res, next) => {
    // console.log('yeahhh');
    
    const result = await prisma.$queryRaw`SELECT DISTINCT "puzzleId" FROM "key"`;
    const ids = result.map(item => item.puzzleId)

    const randomIndex = Math.floor(Math.random() * ids.length);
    const id = ids[randomIndex];
    //461, 487, 223
    
    const key = await prisma.key.findMany({
        where: {
            puzzleId: id,
        },
        select: {
            connection: true,
            answers: true,
        }
    });
    res.send(key);
}
