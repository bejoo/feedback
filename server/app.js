/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , fs = require('fs')
  , less = require('less');

var app = module.exports = express.createServer();

var MemStore = require('connect').session.MemoryStore;

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser());
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less']}));
  app.use(express.session({
    secret: 'somerandomstring',
    store: MemStore({
    reapInterval: 6000 * 10
    })
   })
  );
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});




// Authentication
function requiresLogin(req, res, next){
  if(req.session.user){
    next();
  }else{
    res.redirect('/sessions/new?redir='+req.url);
  }
};

// Helpers für die Views
app.dynamicHelpers(
  {
    session: function(req, res) {
      return req.session;
    },
    
    flash: function(req, res) {
      return req.flash();
    }
  }
);

// Routes

app.get('/:page?', requiresLogin, routes.index);
app.post('/api/feedback/log/', routes.feedback_log);

// Session Routes

app.get('/sessions/new', routes.sessions_new);
app.post('/sessions', routes.sessions_auth);
app.get('/sessions/destroy', routes.sessions_destroy);

app.listen(3000);
console.log("Feedback server listening on port %d in %s mode", app.address().port, app.settings.env);
