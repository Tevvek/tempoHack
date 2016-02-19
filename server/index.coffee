mongoose = require('mongoose')
models = require('./models')
express = require('express')
http = require('http')
async = require('async')
bodyparser = require('body-parser')

db_path = 'mongodb://localhost/tempoteam'
mongoose.connect(db_path)
models.initialize()

app = express()
app.use(bodyparser.json())
app.use('/user', require('./routes/user.router.coffee'))
# app.use('/job', require('./routes/job.router.js'))
# app.use('/', require('./routes/public.coffee'))

http.createServer(app).listen(8080) 