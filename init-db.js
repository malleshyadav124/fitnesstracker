const sequelize = require('./config/database');
const User = require('./models/User');
const Health = require('./models/Health');
const Fitness = require('./models/Fitness');
const Goal = require('./models/Goal');
const Water = require('./models/Water');

async function initializeDatabase() {
    try {
        // Test the connection
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        // Sync all models without force
        await sequelize.sync(); // Removed { force: true }
        console.log('All tables have been synchronized successfully.');

        // Only create test user if no users exist
        const userCount = await User.count();
        if (userCount === 0) {
            const testUser = await User.create({
                name: 'Test User',
                email: 'test@example.com',
                password: 'test123',
                age: 25,
                gender: 'male',
                height: 170,
                weight: 70,
                activity_level: 'moderate'
            });
            console.log('Test user created successfully.');

            // Create some test data
            await Health.create({
                user_id: testUser.id,
                weight: 70,
                height: 170,
                blood_pressure_systolic: 120,
                blood_pressure_diastolic: 80,
                heart_rate: 72,
                blood_sugar: 5.5,
                sleep_hours: 8,
                stress_level: 'moderate',
                date: new Date()
            });

            await Fitness.create({
                user_id: testUser.id,
                workoutType: 'cardio',
                duration: 30,
                notes: 'Morning run',
                date: new Date()
            });

            await Water.create({
                user_id: testUser.id,
                amount: 500,
                date: new Date()
            });
        } else {
            console.log('Database already contains users, skipping test data creation.');
        }
    } catch (error) {
        console.error('Database initialization error:', error);
        process.exit(1);
    }
}

initializeDatabase(); 