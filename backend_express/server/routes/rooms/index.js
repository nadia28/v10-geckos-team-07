const express = require('express');
const router = express.Router;

module.exports = (param) => {

  const roomService = param;

  router.get('/', async function(req, res, next){

    const rooms = await roomService.getRooms();

    return res.render('rooms', {
      rooms
    });
  });

  router.get('/:id', async function(req, res, next){

    const roomDetails = await roomService.getRoomDetails(req.params.id);

    return res.render('roomDetails', {
      roomDetails: roomDetails
    });
  });

  // add new room
  router.get('/add', (req, res, next) => {
    const added = req.query.added
    const addResult = {
      success: added === 'true',
      error: added ==='false'
    }
   
    return res.render('rooms/add', {
      addResult: addResult
    });
  });

  router.post('/', async (req, res, next) => {

    //Validate
    const type = req.body.raType.trim();
    const status = req.body.raStatus.trim();
    const description = req.body.raDescription.trim();
    const price = req.body.raPrice.trim();
    const location = req.body.raLocation.trim();
    // what about image?

    if (!email || !password ) return res.redirect('/rooms/add?added=false');

    try {
      await userService.addUser({
        type: type,
        status: status,
        description: description,
        price: price,
        location: location
      });
    } catch (error) {
      return res.redirect(`/rooms/add?added=false&message=${error}`)
    }
    return res.redirect('/rooms?added=true');
  });

  router.get('/:id', function(req, res, next){
    return res.send('Page for room with id ' + req.params.id);
  });

  return router; 
}