const express = require('express');
const router = express.Router();

/* GET users listing. */
module.exports = (param) => {

  const userService = param;

  router.get('/', async function(req, res, next){

    const allUsers = await userService.getAllUsers();

    const added = req.query.added
    const addResult =  {
      success: added === 'true',
      error: added === 'false'
    }

    return res.render('users', {
      users: allUsers,
      addResult: addResult
    });
  });

  router.get('/add', (req, res, next) => {
    const added = req.query.added
    const addResult = {
      success: added === 'true',
      error: added === 'false'
    }

    return res.render('users/add', {
      addResult: addResult
    });
  });

  router.post('/', async (req, res, next) => {

    //validation of user
    const name = req.body.uaName.trim();
    const lastName = req.body.uaLastName.trim();
    const email = req.body.uaEmail.trim();
    const password = req.body.uaPassword.trim();
    const address = req.body.uaAddress.trim();
    const birthday = req.body.uaBirthday.trim();

    if(!email || !password) return res.redirect('/users/add?added=false');

    await userService.addUser({
      name: name,
      lastName: lastName,
      email: email,
      password: password,
      address: address,
      birthday: birthday
    });

    return res.redirect('/users?added=true');
  });

  router.get('/:id', function(req, res, next){
    return res.send('User with id ' + req.params.id);
  });

  return router;
}