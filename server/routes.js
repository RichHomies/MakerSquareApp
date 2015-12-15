var db = require('./controller/db')
var gitHub = require('./services/github')

//**PUT ALL API ENDPOINTS HERE

module.exports = {
  setup: function(app) {
    //api endpoints
    app.post('/api/users', db.getUser, gitHub.getUserToken, db.createUser)
  } 
}