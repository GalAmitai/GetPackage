require('dotenv/config');

const environment = {
    status: process.env.ENVIROMENT
};

const jwt = {
    key: process.env.JWT_KEY
}

const mongoConfiguration = {
    connection: process.env.MONGOOSE_CONNECTION,
}

module.exports = {
    environment,
    mongoConfiguration,
    jwt
}