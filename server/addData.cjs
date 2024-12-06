const prisma = require('./prisma.cjs');
const fs = require('fs');

console.log(process.cwd());


async function insertData() {
    let data;
    // await prisma.key.deleteMany();
    // fs.readFile('')
    fs.readFile('./server/data.json', 'utf8', (err, fileData) => {
        // if (err) {
        //     console.error(err);
        // }
        data = fileData;
        data = JSON.parse(data);
        const row1 = Object.keys(data)[10];
        data.forEach((key, index) => {
            key.forEach(async entry => {
                // console.log(entry);
                
                await prisma.key.create({
                    data: {
                        puzzleId: index,
                        connection: entry.connection,
                        answers: entry.answers,
                    }
                })
            })
        });
    });
}

// insertData()
