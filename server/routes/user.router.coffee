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
                optionals = requirements[0].opleidingsniveau[0].split(', ')
                optionals.sort(alphaSort.asc)
                common_optionals = intersect(tags, optionals)
                v = common_optionals.length * 10
                job = {
                  value: v,
                  content: vacature
                }
                if foundJobs.length is 0 then foundJobs.push job
                else 
                  iindex = findIndex(foundJobs, (element, index, arr) ->
                    return element.value < v
                  )
                  if iindex isnt -1 then foundJobs = arrayInsert(foundJobs, iindex, job)
                  else arrayInsert(foundJobs, iindex, job)
            else if requirements[0].opleidingsniveau.length is 1
              studies = requirements[0].opleidingsniveau[0].split(', ')
              studies.sort(alphaSort.asc)
              common_studies = intersect(tags, studies)
              if equals(common_studies, studies)
                job = {
                  value: 0,
                  content: vacature
                }
                if foundJobs.length is 0 then foundJobs.push job
                else 
                  foundJobs = arrayInsert(foundJobs, foundJobs.length, job)
            else if requirements.length is 0
              job = {
                value: 0,
                content: vacature
              }
              arrayInsert(foundJobs, foundJobs.length-1, job)
        )
        res.status(200).json(foundJobs)
      )
  )
)

# aplicar
router.get('/:user_id/job/:job_id/', (req,res,next) ->
  # calcular value (v)
  user_id = req.params.user_id
  job_id = req.params.job_id
  JobVacancy.findOne({_id: new ObjectId(job_id)}, (err, job) ->
    users = job.users
    iindex = findIndex(users, (element,index,arr) ->
      return element.value < v
    )
    if iindex isnt -1 then job.users = arrayInsert(users, iindex, req.body.user.id)
    else job.users.push req.body.user.id
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
    tags: req.body.tags.sort(alphaSort.asc);
  }
  User.update({_id: new ObjectId(id)}, {$set: user}, (err) -> res.status(200).send('ok') if !err)
)

module.exports = router;