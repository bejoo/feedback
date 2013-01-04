var users = {
  'nico' : {login: 'nico', password: 'maps', role: 'admin'},
  'joris' : {login: 'joris', password: 'hans1', role: 'admin'},
  'andrin' : {login: 'andrin', password: 'crysis', role: 'superduperadmin'}
};
module.exports.authenticate = function(login, password, callback) {
  var user = users[login];
  if (!user) {
    callback(null);
    return;
  }
  if (user.password == password) {
    callback(user);
    return;
  }
  callback(null);
};