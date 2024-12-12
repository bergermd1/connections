// import { connect } from './router.cjs';
// const fs = require('fs');
// const { body, validationResult } = require('express-validator');

const prisma = require('./prisma.cjs');
const genPassword = require('../server/lib/passwordUtils').genPassword
const passport = require('passport');

exports.registerPost = async (req, res) => {
    const username = req.body.username;
    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    let user = await prisma.user.findUnique({
        where: {
            username: req.body.username,
        }
    });
    console.log(user);
    if (user === null) {
        user = await prisma.user.create({
            data: {
                username,
                hash,
                salt,
            },
        })
        console.log('user added');
        res.send({"message": 'User added'});
    } else {
        res.send({"message": 'Username already take'});
    }

    
    // res.redirect('/');
}
exports.loginPost = async (req, res) => {
    const username = req.user.username;
       
    res.send({"username": username, "loggedIn": true, "userId": req.user.id});
}
// exports.test = async (req, res) => {
//     console.log(req.sesseion);
//     res.send('yyyy')
    
// }
exports.validate = passport.authenticate(
    'local',
    {
        failureRedirect: '/loginFailure',
    }
)
exports.loginFailureGet = (req, res) => {
    res.send({"loggedIn": false, "message": "Wrong username/password"});
}
exports.logoutGet = (req, res) => {
    req.logout(() => {});
    res.send('logged out')
}

exports.dataGet = async (req, res, next) => {
    console.log(req.params);
    let puzzleIdsDone;
    if (req.params.userId) {
        const userData = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.userId),
            },
            include: {
                puzzlesDone: true,
            }
        })
        puzzleIdsDone = userData.puzzlesDone.map(puzzle => puzzle.puzzleId);
    } else {
        puzzleIdsDone = [];
    }
    // console.log(puzzleIdsDone);
    
    const result = await prisma.$queryRaw`SELECT DISTINCT "puzzleId" FROM "key"`;
    const ids = result.map(item => item.puzzleId)
    let id;
    do {
        const randomIndex = Math.floor(Math.random() * ids.length);
        id = ids[randomIndex];
        // console.log(id);
    }
    while (puzzleIdsDone.includes(id))
    //461, 487, 223
    
    const key = await prisma.key.findMany({
        where: {
            puzzleId: id,
        },
        select: {
            connection: true,
            answers: true,
            puzzleId: true,
        }
    });
    res.send(key);
}

exports.complete = async (req, res) => {
    console.log(req.body);
    await prisma.puzzle.create({
        data: {
            puzzleId: req.body.puzzleId,
            mistakes: req.body.mistakesMade,
            solver: {
                connect: {
                    id: req.body.userId,
                }
            } 
        }
    })
}

exports.statsGet = async (req, res) => {
    // console.log(req.params);
    
    const results = await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.userId),
        },
        include: {
            puzzlesDone: true,
        }
    })
    // console.log(results.puzzlesDone);
    const stats = {};
    results.puzzlesDone.forEach(puzzle => {
        if (!stats[puzzle.mistakes]) {
            stats[puzzle.mistakes] = 1;
        } else {
            stats[puzzle.mistakes] += 1;
        }
    })
//     fs.writeFile("../src/testData.js", `
//         const xValues = ["0", "1", "2", "3", "4"];
//         const yValues = [${stats[0] || 0},${stats[1] || 0},${stats[2] || 0},${stats[3] || 0},${stats[4] || 0}];
//         const barColors = ["red", "green","blue","orange","brown"];

//         new Chart("myChart", {
//         type: "bar",
//         data: {
//             labels: xValues,
//             datasets: [{
//                 backgroundColor: barColors,
//                 data: yValues
//             }]
//         },
//         options: {
//             legend: {display: false},
//             title: {
//                 display: true,
//                 text: "Solve stats"
//             }
//         }
//         });
// `, (err) => {
//         if (err) console.log(err);
//         else {
//             // console.log("File written successfully\n");
//             // console.log("The written file has the following contents:");
//             // console.log(fs.readFileSync("books.txt", "utf8"));
//         }
//     });
    console.log(stats);
    res.send(stats);
}