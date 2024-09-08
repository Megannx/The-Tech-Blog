const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection'); // Ensure this path is correct
const path = require('path');
const { Post, User } = require('./models'); // Ensure this path is correct
const apiRoutes = require('./routes/api'); // Import the API routes file

const app = express();
const PORT = process.env.PORT || 3000;

// Handlebars setup
const hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Session configuration
const sess = {
    secret: 'Super secret secret',
    cookie: { maxAge: 3600000 }, // Optional: Set cookie expiration (1 hour in milliseconds)
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};
app.use(session(sess));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use API routes
app.use('/api', apiRoutes); // Integrate API routes into the app

// Routes

// Create a new blog post
app.post('/api/posts', async (req, res) => {
    try {
        const { title, description } = req.body;

        // Create a new blog post
        await Post.create({ title, description });

        // Send a successful response
        res.status(201).json({ message: 'Post created successfully!' });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Error creating post!' });
    }
});

// Fetch and display all blog posts
app.get('/', async (req, res) => {
    try {
        // Fetch blog posts from the database
        const blogPosts = await Post.findAll({ order: [['date', 'DESC']] });
        
        // Render the homepage with blog posts
        res.render('homepage', { title: 'The Tech Blog', blogPosts });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).send('Internal Server Error!');
    }
});

// Fetch and display all users on the dashboard
app.get('/dashboard', async (req, res) => {
    try {
        // Fetch users from the database
        const users = await User.findAll();
        
        // Render the dashboard with users
        res.render('dashboard', { title: 'Dashboard', users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error!');
    }
});

// Render the login page
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login', message: 'Please log in to continue.' });
});

// Render the logout page
app.get('/logout', (req, res) => {
    res.render('logout', { title: 'Logout', message: 'You have been logged out.' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
