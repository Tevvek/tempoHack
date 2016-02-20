var mongoose = require('mongoose');
var jobRouter = require('express').Router();
var intersect = require('intersect');
var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var JobVacancy = mongoose.model('JobVacancyModel');

jobRouter.get('/test', function(req, res, next) {
    fs.readFile(__dirname + '/onejob.xml', function(err, data) {
        parser.parseString(data, function (err, result) {
            res.status(200).json(JSON.stringify(result));
        });
    });
});

jobRouter.post('/', function(req, res, next) {
    var jobVacancyInstance = new JobVacancy(req.body);
    jobVacancyInstance.save(function(err, newJobVacancy) {
        if (err) res.status(500).send(err);
        else res.status(200).json({ jobVacancy: newJobVacancy });
    });
});


jobRouter.post('/get', function(req, res, next) {
    var tags = req.body.tags;
    JobVacancy.find({}, function(err, jobVacancies) {
        if (err) res.status(500).send(err);
        else {
            var respuesta = [];
            for (var i = 0; i < jobVacancies.length; i++) {
                var b = intersect(tags, jobVacancies[i].tags);
                if (b.length > 0) {
                    respuesta.push(jobVacancies[i]);
                }
            }
            if (err) res.status(500).json(err);
            else {
                res.status(200).json(respuesta);
            }
        }
    });
});

jobRouter.get('/', function(req,res,next) {
    JobVacancy.find({}, function(err,jobs) {
        if (!err) res.status(200).json(jobs);
    })
});

module.exports = jobRouter;

