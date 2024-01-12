const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let isConnected;

module.exports = connectToDatabase = () => {
    if (isConnected) {
        return Promise.resolve(true);
    }

    return mongoose.connect(process.env.DB_HOST)
        .then(db => {
            isConnected = db.connections[0].readyState;
        });
};