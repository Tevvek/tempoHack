mongoose = require('mongoose');
router = require('express').Router();
async = require('async');
User = mongoose.model('User');
ObjectId = mongoose.Types.ObjectId;

# get users info
router.get('/:id', (req,res,next) ->
  id = req.params.id
  User.findOne({_id: new ObjectId(id)}, (err, user) ->
    if !err
      userResponse = {
        name: user.name,
        address: user.address,
        phone: user.phone,
        email: user.email,
        tags: user.tags
      }
      res.status(200).json(userResponse)
  )
)

# post users info
router.post('/:id', (req, res, next) -> 
  id = req.params.id
  user = {
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    tags: req.body.tags
  }
  User.update({_id: new ObjectId(id)}, {$set: user}, (err) -> res.status(200).send('ok') if !err)
)

module.exports = router;