//**PUT ALL API ENDPOINTS HERE

module.exports = {
  setup: function(app) {
    //api endpoints

    app.post('/api/users', function(req, res, done){
      //if user doesn't exist
          //ping github for auth ish
            //error-  pass to client
            //create user in db
            //return user obj to client
        //else
          //return user obj to client
    })
  } 
}