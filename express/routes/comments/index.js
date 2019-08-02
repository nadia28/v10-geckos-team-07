const express = require('express');
const router = express.Router();

module.exports = (param) => {
  const commentService = param;

  router.get('/', async function(req, res, next) {

    const allComments = await commentService.getAllComments();

    const added = req.query.added
    const addResult = {
      success: added === 'true',
      error: added === 'false'
    }

    return res.render('comments', {
      comments: allComments,
      addResult: addResult
    });
  });

  router.get('/add', (req, res, next) => {
    const added = req.query.added
    const addResult = {
      success: added === 'true',
      error: added === 'false'
    }

    return res.render('comments/add', {
      addResult: addResult
    });
  });

  router.post('/', async (req, res, next) => {

    //Validate
    const email = req.body.caEmail.trim();
    const name = req.body.caName.trim();
    const message = req.body.caMessage.trim();
   
    if (!email || !name || !message ) return res.redirect('/comments/add?added=false');
    try {
      await commentService.addComment({
        email: email,
        name: name,
        message: message
      });
    } catch (error) {
      return res.redirect(`/comments/add?added=false&message=${error}`)
    }
    return res.redirect('/comments?added=true');
  });
}