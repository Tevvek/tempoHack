mongoose = require('mongoose');
router = require('express').Router();
async = require('async');
equals = require('array-equal')
alphaSort = require('alpha-sort')
User = mongoose.model('User');
ObjectId = mongoose.Types.ObjectId;
intersect = require('intersect')
fs = require('fs')
xml2js = require('xml2js')
parser = new xml2js.Parser()
JobVacancy = mongoose.model('JobVacancyModel')
strsplit = require('strsplit')


router.get('/', (req,res,next) -> 
  User.find({}, (err,users) ->
    if !err then res.status(200).json(users)
  )
)

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

router.get('/:id/jobs', (req,res,next) ->
  id = req.params.id
  User.findOne({_id: new ObjectId(id)}, (err, user) -> 
    foundJobs = []
    if !err
      tags = user.tags 
      fs.readFile(__dirname + '/jobs.xml', (err, data) ->
        parser.parseString(data,(err, result) ->
          for vacature in result.vacatures.vacature
            requirements = vacature.opleidingsniveaus
            if requirements[0].opleidingsniveau.length is 2
              studies = requirements[0].opleidingsniveau[1].split(', ')
              studies.sort(alphaSort.asc)
              common_studies = intersect(tags, studies)
              if equals(common_studies, studies)
                # todo: tiene los minimos, mirar que tiene opcionales
                # requirements[0].opleidingsniveau[0].split(', ')
                foundJobs.push vacature
            else if requirements[0].opleidingsniveau.length is 1
              studies = requirements[0].opleidingsniveau[0].split(', ')
              studies.sort(alphaSort.asc)
              common_studies = intersect(tags, studies)
              if equals(common_studies, studies)
                foundJobs.push vacature
            else if requirements.length is 0
              foundJobs.push vacature
        )
        res.status(200).json(foundJobs)
      )
  )
)

router.get('/:user_id/job/:job_id', (req,res,next) ->
  user_id = req.params.user_id
  job_id = req.params.job_id
)

# post users info
router.post('/:id', (req, res, next) -> 
  id = req.params.id
  user = {
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    tags: req.body.tags.sort(alphaSort.asc);
  }
  User.update({_id: new ObjectId(id)}, {$set: user}, (err) -> res.status(200).send('ok') if !err)
)

module.exports = router;