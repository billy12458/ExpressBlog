const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();
const sequelize = new Sequelize({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQl_USERNAME,
    password: process.env.MYSQl_PASSWORD,
    dialect: 'mysql',
    protocol: 'tcp',
    timezone: process.env.TIMEZONE,
    pool: {
        max: 300,
        min: 50,
        idle: 1000 * 180,
        evict: 1000 * 60 * 60
    }
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;