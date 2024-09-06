const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('homepage', { title: 'My Blog', message: 'Welcome to my blog!' });
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard', { title: 'Dashboard', message: 'Welcome to your dashboard!' });
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login', message: 'Please log in to continue.' });
});

app.get('/logout', (req, res) => {
    res.render('logout', { title: 'Logout', message: 'You have been logged out.' });
});

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

// Serve static files from the 'css' directory
app.use('/css', express.static(__dirname + '/css'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error!');
});

app.use(express.static('public'));

app.use((err, req, res, next) => {
    console.error('Error message:', err.message);  // Logs the error message to the console
    console.error('Error stack:', err.stack);  // Logs the error stack to the console
    res.status(500).send('Internal Server Error!');  // Sends a user-friendly message
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});