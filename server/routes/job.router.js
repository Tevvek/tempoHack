var mongoose = require('mongoose');
var jobRouter = require('express').Router();

var JobVacancy = mongoose.model('JobVacancyModel');

//create new Job Vacancy
jobRouter.post('/newJobVacancy', function(req, res, next) {
    var jobVacancyInstance = new JobVacancy(req.body);
    jobVacancyInstance.save(function(err, newJobVacancy) {
        if (err) res.status(500).send(err);
        else res.status(200).json({ jobVacancy: newJobVacancy });
    });
});

//get Job Vacancies by tags
jobRouter.post('/getJobVacancy', function(req, res, next) {
    var tags = req.body.tags;
    JobVacancy.find({}, function(err, jobVacancies) {
        var res = [];
        for (var i = 0; i < jobVacancies.length; i++) {
            var b = true;
            for (int j = 0; j < tags.length && b; ++j) {
                b = $.inArray(tags[j], jobVacancies[i]);
            }

            if (b) {
                res.add(jobVacancies[i]);
            }
        }
        if (err) res.status(500).json(err);
        else {
            res.status(200).json(res);
        }
    });
});

module.exports = jobRouter;

