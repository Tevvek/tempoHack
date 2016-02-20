var mongoose = require('mongoose');
var jobRouter = require('express').Router();
var intersect = require('intersect');

var JobVacancy = mongoose.model('JobVacancyModel');

jobRouter.post('/newJobVacancy', function(req, res, next) {
    var jobVacancyInstance = new JobVacancy(req.body);
    jobVacancyInstance.save(function(err, newJobVacancy) {
        if (err) res.status(500).send(err);
        else res.status(200).json({ jobVacancy: newJobVacancy });
    });
});


jobRouter.post('/getJobVacancy', function(req, res, next) {
    var tags = req.body.tags;
    console.log("Tags->"+tags);
    JobVacancy.find({}, function(err, jobVacancies) {
        console.log("JB->"+jobVacancies);
        if (err) res.status(500).send(err);
        else {
            var respuesta = [];
            for (var i = 0; i < jobVacancies.length; i++) {
                var b = intersect(tags, jobVacancies[i].tagsForDemo);
                console.log("JB[i]->"+jobVacancies[i]);
                console.log("b->"+b);
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

module.exports = jobRouter;

