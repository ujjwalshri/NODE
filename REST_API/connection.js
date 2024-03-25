const mongoose = require('mongoose')

async function connectMongoDb(URL){
    return mongoose.connect(URL);
}

module.exports = {
    connectMongoDb,
};