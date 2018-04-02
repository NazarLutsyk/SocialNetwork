let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let session = require('express-session');
let MongoStorage = require('connect-mongo')(session);
let passport = require('passport');
let helmet = require('helmet');
let cors = require('cors');
require('./config/schedule');

require('./config/passport/index');

let passportMiddleware = require('./middleware/passport');
let index = require('./routes/index');
let api = require('./routes/api');
let auth = require('./routes/auth');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/socialnetwork');

let app = express();

app.use(cors());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'qweerasdxsd46s548454ad2as1d',
    resave: true,
    saveUninitialized: false,
    store: new MongoStorage({
        mongooseConnection: mongoose.connection
    })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/api', passportMiddleware.isLoggedIn,api);
app.use('/auth', auth);

app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
