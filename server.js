const express           = require('express');
const bodyParser        = require('body-parser');
const cors              = require('cors');
const port              = process.env.PORT || 3000;
const mongoose          = require('mongoose');
const config            = require('./configuration/config');
const authRouter        = require('./routes/auth');
const apiRouter         = require('./routes/api');
const ErrorHandler      = require('./services/ErrorHandler');

const app = express();

const initialize = () => {
    app.use(bodyParser.json());
    app.use(cors());
    
    // Connect to DB
    mongoose.connect(config.mongoConfiguration.connection, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on('open', () => {
        ErrorHandler.log('Connected to DB!');
    });

    app.use('/auth', authRouter);
    app.use('/api', apiRouter);
    
    app.listen(port, () => {
        ErrorHandler.log(`Server running on port: ${port}`);
    });
}

initialize();