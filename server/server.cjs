require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router.cjs');
const passport = require('passport');
require('./config/passport');

const expressSession = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const prisma = require('./prisma.cjs');

app.use(
    expressSession({
      cookie: {
       maxAge: 7 * 24 * 60 * 60 * 1000 // ms
      },
      secret: 'a santa at nasa',
      resave: true,
      saveUninitialized: true,
      store: new PrismaSessionStore(
        prisma,
        {
          checkPeriod: 2 * 60 * 1000,  //ms
          dbRecordIdIsSessionId: true,
          dbRecordIdFunction: undefined,
        }
      )
    })
  );

app.use(cors());
app.use(express.static('public'))

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', router);

const PORT = 3000;
app.listen(PORT, () => console.log(`Connected at port: ${PORT}`))

// module.exports = prisma;