mongoose = require('mongoose');
router = require('express').Router();
async = require('async');
alphaSort = require('alpha-sort')
User = mongoose.model('User');
ObjectId = mongoose.Types.ObjectId;
intersect = require('intersect')
fs = require('fs')
xml2js = require('xml2js')
parser = new xml2js.Parser()
JobVacancy = mongoose.model('JobVacancyModel')
strsplit = require('strsplit')
equals = require('array-equal')
difference = require('array-difference')
arrayInsert = require('array-insert')
findIndex = require('array-findindex')

router.get('/job/:id', (req,res,next) ->
  id = req.params.id
  JobVacancy.findOne(_id: new ObjectId(id), (err, job) ->
    result_users = []
    for user in job.users
      User.findOne({_id: new ObjectId(user.id)}, (err, user) ->
        if !err result_users.push user
      )
    res.status(200).send(result_users)
)

module.exports = router;