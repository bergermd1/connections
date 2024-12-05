const prisma = require('./prisma.cjs');
// const genPassword = require('../lib/passwordUtils').genPassword
// const passport = require('passport');

exports.dataGet = async (req, res, next) => {
    const result = await prisma.$queryRaw`SELECT DISTINCT "puzzleId" FROM "key"`;
    const ids = result.map(item => item.puzzleId)

    const randomIndex = Math.floor(Math.random() * ids.length);
    const id = ids[randomIndex];
    console.log(id);
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