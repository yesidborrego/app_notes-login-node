const path = require('path');
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');

// Initialize
const app = express();
const routes = require('./routes/routes');
const routesNotes = require('./routes/notes');
const routesUsers = require('./routes/users');
app.set('port', process.env.PORT || 3000);
const port = app.get('port');
require('./config/database');
const { sessionConfig } = require('./config/keys');


// Settings
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended: false}));
app.use(session(sessionConfig));
app.use(flash());
app.use(methodOverride('_method'));

// Global variables
app.use((req, res, next) => {
  app.locals.successMsg = req.flash('successMsg');
  app.locals.errorMsg = req.flash('errorMsg');
  next();
});

// Routes
app.use('/', routes);
app.use(routesNotes);
app.use('/', routesUsers);

// Server listening
app.listen(port, () => {
  console.log(`Server ON in localhost:${port}`);
});