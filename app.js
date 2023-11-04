const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const request = require('request');
const ejs = require('ejs');
const path = require('path');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcryptjs');
const { URL, checkURLStatus, sendEmailNotification } = require('./api/schemas/urlSchema');
const User = require('./api/schemas/userSchema');
const urlRoutes = require('./api/routes/urlRoutes');
const userRoutes = require('./api/routes/userRoutes');
const indexRoutes = require('./api/routes/index');
const cron = require('./cron');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup session
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

let mongo_db_url;
if(process.env.user == 'pb_status'){
    mongo_db_url = 'mongodb+srv://status_page_user:yO4YmFCTBO7mzMpw@cluster0.dm3xbxb.mongodb.net/status_page?retryWrites=true&w=majority'
} else {
    mongo_db_url = 'mongodb://localhost:27017/status_checker';
}
mongoose.connect(mongo_db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Passport setup
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set view engine and static files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

// Use routes
app.use('/', indexRoutes);
app.use('/', urlRoutes);
app.use('/', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
