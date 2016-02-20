var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
    var jobVacancySchema = new Schema({
        category: String,
        jobDescription: String,
        latitude: Number,
        longitude: Number,
        //city: {type: String, required: true},
        postCode: String,
        //workingDays: {type: Number, required: true},
        //hoursPerWeek: {type: Number, required: true},
        //salaryPerMonth: {type: Number, required: true},
        optionalSkills: [{type: String, default:[]}],
        requiredSkills: [{type: String, default:[]}],
        area: String,
        subAreas: [{type: String, default:[]}],
        companyField: String,
        //jobLink: {type: String, required: true},
        label: String,
        internal: String,
        publicationDate: {type: Date, default: Date.now},
        employer: String,
        employerID: String,

        tags: [{type: String, default:[]}],
        users: [{type: ObjectId, ref: 'User'}]
    });
    mongoose.model('JobVacancyModel', jobVacancySchema, 'jobVacancyModel');
};