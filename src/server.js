const path = require('path');
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');

// Initialize
const app = express();
const routes = require('./routes/routes');
app.set('port', process.env.PORT || 3000);
const port = app.get('port');


// Settings
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join('views', 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs')

// Middlewares
app.use(morgan('dev'));

// Global variables


// Routes
app.get('/', routes);

// Server listening
app.listen(port, () => {
  console.log(`Server ON in localhost:${port}`);
});