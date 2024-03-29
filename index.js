const express = require('express');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

const app = express();

app.use(cookieParser());

app.use(express.urlencoded({extended: false}));

app.use(express.static('./assets'));

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    secret: 'blah',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'url goes here',
        autoRemove: 'disabled'
    })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticated);

app.use(flash());
app.use(customMware.setFlash);

app.use('/', require('./routes/index.js'));

app.listen(port, (err) => {
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is up and running at port: ${port}`);
});
