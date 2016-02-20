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

router.post('/:user_id/job/:job_id', (req,res,next) ->
  user_id = req.params.user_id
  job_id = req.params.job_id
  Apply.update({job: new ObjectId(job_id)}, {$})
  Apply.findOne({job: new ObjectId(job_id)}, (err, application) ->
    for user in application.users
      User.findOne({_id: new ObjectId(user.id)}, (err, user) ->

      )
  )
)

module.exports = router;