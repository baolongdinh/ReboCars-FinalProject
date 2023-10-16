var mongoose = require('mongoose');
var databaseConfig = require('./config/database.config');

class Database {
    static createDatabase() {
        try {
            // Set Up the Database connection
            mongoose
                .connect(databaseConfig.database_connect_url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
                .then((db) => {
                    console.log('Mongoose connection Successfully');
                    db.connection.on('error', (err) => {
                        console.error(err);
                    }); // <- print nothing
                    db.connection.on('disconnected', () => {
                        console.log('disconnected');
                    }); // <- print once
                    db.connection.on('reconnected', () => {
                        console.log('reconnected');
                    }); // <- never printed
                });
        } catch (error) {
            console.log('Mongoose connection Failed :', error.message);
            process.exit(1);
        }
    }
}

module.exports = Database;
