let corsOptions = {
    origin: ['http://localhost:8080', 'http://localhost:8081', 'https://api.nodejsblog.com'],
    // allowedHeaders: 'Content-Type,Authorization',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    maxAge: 60,
    optionsSuccessStatus: 215
};

module.exports = corsOptions;