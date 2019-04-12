const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const IBMDB = require('./lib/ibmdb');
const appconfig = require('./appconfig.json');

// db config
const dbConfig = require('./dbconfig.json');
const dbOptions = dbConfig.DB2['DASDEV'];
global.dasdb = new IBMDB(dbOptions);


// setup logging
const options = {
  notification : appconfig.notification,
  logLevel : appconfig.logLevel,
  logFile : appconfig.logFile
}

global.logger = require('./lib/logger')(options);

const indexRouter = require('./routes/index');

const app = express();
// express security guide
const helmet = require('helmet');
app.use(helmet());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/:version', (req, res, next) => {
  require(`./routes/${req.params.version}`)(req, res, next);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(`error:${err}`);
});

module.exports = app;
