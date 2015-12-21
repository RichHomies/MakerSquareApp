var db = require('./controller/db')
var gitHub = require('./services/github')

//**PUT ALL API ENDPOINTS HERE

module.exports = {
  setup: function(app) {
    app.post('/api/users', gitHub.getUserToken, db.getUser, db.createUser)
  } 
}