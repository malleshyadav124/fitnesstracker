// Database Configuration
const dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'fitness_db',
    username: 'postgres',
    password: 'rootnode',
    dialect: 'postgres',
    logging: true,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

// JWT Configuration
const jwtConfig = {
    secret: 'fitness_app_secret_key_2024',
    expiresIn: '24h'
};

// Server Configuration
const serverConfig = {
    port: 3000,
    environment: 'development'
};

// Export configurations
module.exports = {
    dbConfig,
    jwtConfig,
    serverConfig
}; 