mongoose = require('mongoose');
models = require('./models');
express = require('express');
express_jwt = require('express-jwt');
http = require('http');
async = require('async');
bodyparser = require('body-parser');

config = require('./config');
mongoose.connect(config.db_path);
models.initialize();

app = express();
app.use(bodyparser.json());
app.use('/authenticate', require('./routes/authenticate'));
app.use('/admin', require('./routes/admin.coffee'));
app.use('/', require('./routes/publica.coffee'));

http.createServer(app).listen(8080); 