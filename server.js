const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtConfig, serverConfig } = require('./dube');
const { Op } = require('sequelize');

const sequelize = require('./config/database');
const User = require('./models/User');
const Health = require('./models/Health');
const Fitness = require('./models/Fitness');
const Goal = require('./models/Goal');
const Water = require('./models/Water');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database synchronization
sequelize.sync({ force: false })
    .then(() => console.log('Database synchronized successfully'))
    .catch(err => console.error('Error synchronizing database:', err));

// Auth Routes
app.post('/api/register', async (req, res) => {
    try {
        const { 
            name, 
            email, 
            password,
            age,
            gender,
            height,
            weight,
            activity_level 
        } = req.body;

        // Validate input
        if (!name || !email || !password || !age || !gender || !height || !weight || !activity_level) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Validate numeric fields
        if (isNaN(age) || age < 1 || age > 120) {
            return res.status(400).json({ error: 'Age must be between 1 and 120' });
        }

        if (isNaN(height) || height < 100 || height > 250) {
            return res.status(400).json({ error: 'Height must be between 100 and 250 cm' });
        }

        if (isNaN(weight) || weight < 20 || weight > 300) {
            return res.status(400).json({ error: 'Weight must be between 20 and 300 kg' });
        }

        // Validate activity level
        const validActivityLevels = ['sedentary', 'light', 'moderate', 'active', 'very_active'];
        if (!validActivityLevels.includes(activity_level)) {
            return res.status(400).json({ error: 'Invalid activity level' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password with proper salt rounds
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log('Password hashed successfully');

        // Create user with all profile fields
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            age: parseInt(age),
            gender,
            height: parseFloat(height),
            weight: parseFloat(weight),
            activity_level
        });
        console.log('User created successfully:', user.email);

        // Generate token
        const token = jwt.sign({ id: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

        res.status(201).json({ 
            token, 
            user: { 
                id: user.id, 
                name: user.name, 
                email: user.email,
                age: user.age,
                gender: user.gender,
                height: user.height,
                weight: user.weight,
                activity_level: user.activity_level
            } 
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed. Please try again.' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Add input validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user with more detailed logging
        const user = await User.findOne({ where: { email } });
        console.log('Login attempt for email:', email);
        
        if (!user) {
            console.log('User not found for email:', email);
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check password with more detailed logging
        const validPassword = await bcrypt.compare(password, user.password);
        console.log('Password validation result:', validPassword);
        
        if (!validPassword) {
            console.log('Invalid password for user:', email);
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate token
        const token = jwt.sign({ id: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
        console.log('Login successful for user:', email);

        res.json({ 
            token, 
            user: { 
                id: user.id, 
                name: user.name, 
                email: user.email 
            } 
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed. Please try again.' });
    }
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    jwt.verify(token, jwtConfig.secret, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Health Routes
app.get('/api/health', authenticateToken, async (req, res) => {
    try {
        const healthData = await Health.findAll({ 
            where: { user_id: req.user.id },
            order: [['date', 'DESC']],
            attributes: [
                'id', 'date', 'weight', 'height', 'heart_rate', 
                'sleep_hours', 'stress_level',
                'blood_pressure_systolic', 'blood_pressure_diastolic', 
                'blood_sugar'
            ]
        });
        res.json(healthData);
    } catch (error) {
        console.error('Error fetching health data:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/health', authenticateToken, async (req, res) => {
    try {
        const {
            weight,
            height,
            heart_rate,
            sleep_hours,
            stress_level,
            blood_pressure_systolic,
            blood_pressure_diastolic,
            blood_sugar,
            date
        } = req.body;

        // Validate mandatory fields
        if (!weight || !height || !heart_rate || !sleep_hours || !stress_level) {
            return res.status(400).json({ 
                error: 'Missing mandatory fields: weight, height, heart rate, sleep hours, and stress level are required' 
            });
        }

        // Validate stress level
        if (parseInt(stress_level) < 1 || parseInt(stress_level) > 5) {
            return res.status(400).json({ error: 'Stress level must be between 1 and 5' });
        }

        // Validate sleep hours
        if (parseFloat(sleep_hours) < 0 || parseFloat(sleep_hours) > 24) {
            return res.status(400).json({ error: 'Sleep hours must be between 0 and 24' });
        }

        const health = await Health.create({
            user_id: req.user.id,
            weight: parseFloat(weight),
            height: parseFloat(height),
            heart_rate: parseInt(heart_rate),
            sleep_hours: parseFloat(sleep_hours),
            stress_level: parseInt(stress_level),
            blood_pressure_systolic: blood_pressure_systolic ? parseInt(blood_pressure_systolic) : null,
            blood_pressure_diastolic: blood_pressure_diastolic ? parseInt(blood_pressure_diastolic) : null,
            blood_sugar: blood_sugar ? parseFloat(blood_sugar) : null,
            date: date || new Date()
        });

        res.json(health);
    } catch (error) {
        console.error('Error saving health data:', error);
        res.status(500).json({ error: error.message });
    }
});

// Fitness Routes
app.get('/api/fitness', authenticateToken, async (req, res) => {
    try {
        const fitnessData = await Fitness.findAll({ 
            where: { user_id: req.user.id },
            order: [['date', 'DESC']]
        });
        res.json(fitnessData);
    } catch (error) {
        console.error('Error fetching fitness data:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/fitness', authenticateToken, async (req, res) => {
    try {
        const { exercise_type, duration_minutes, calories_burned, distance_km, intensity_level, notes, date } = req.body;
        
        // Validate required fields
        if (!exercise_type || !duration_minutes) {
            return res.status(400).json({ error: 'Exercise type and duration are required' });
        }

        // Validate intensity level
        const validIntensities = ['low', 'moderate', 'high'];
        if (intensity_level && !validIntensities.includes(intensity_level)) {
            return res.status(400).json({ error: 'Intensity must be one of: low, moderate, high' });
        }

        const fitness = await Fitness.create({
            user_id: req.user.id,
            exercise_type: exercise_type.trim(),
            duration_minutes: parseInt(duration_minutes),
            calories_burned: calories_burned ? parseInt(calories_burned) : null,
            distance_km: distance_km ? parseFloat(distance_km) : null,
            intensity_level: intensity_level || 'moderate',
            notes: notes || '',
            date: date || new Date()
        });

        res.json(fitness);
    } catch (error) {
        console.error('Error saving fitness data:', error);
        res.status(500).json({ error: error.message });
    }
});

// Water Routes
app.get('/api/water', authenticateToken, async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        
        // Get today's water record
        let waterData = await Water.findOne({ 
            where: { 
                user_id: req.user.id,
                date: today
            }
        });
        
        if (!waterData) {
            waterData = await Water.create({
                user_id: req.user.id,
                dailyGoal: 2000,
                currentAmount: 0,
                date: today
            });
        }

        // Get water history for the last 7 days
        const history = await Water.findAll({
            where: {
                user_id: req.user.id,
                date: {
                    [Op.gte]: new Date(new Date().setDate(new Date().getDate() - 7))
                }
            },
            order: [['date', 'DESC']]
        });

        res.json({
            ...waterData.toJSON(),
            history: history.map(record => ({
                date: record.date,
                amount: record.currentAmount
            }))
        });
    } catch (error) {
        console.error('Error fetching water data:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/water', authenticateToken, async (req, res) => {
    try {
        const { amount } = req.body;
        const today = new Date().toISOString().split('T')[0];

        if (!amount || amount <= 0) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        let waterData = await Water.findOne({ 
            where: { 
                user_id: req.user.id,
                date: today
            }
        });

        if (!waterData) {
            waterData = await Water.create({
                user_id: req.user.id,
                dailyGoal: 2000,
                currentAmount: parseInt(amount),
                date: today
            });
        } else {
            waterData.currentAmount += parseInt(amount);
            await waterData.save();
        }

        // Get updated history
        const history = await Water.findAll({
            where: {
                user_id: req.user.id,
                date: {
                    [Op.gte]: new Date(new Date().setDate(new Date().getDate() - 7))
                }
            },
            order: [['date', 'DESC']]
        });

        res.json({
            ...waterData.toJSON(),
            history: history.map(record => ({
                date: record.date,
                amount: record.currentAmount
            }))
        });
    } catch (error) {
        console.error('Error saving water data:', error);
        res.status(500).json({ error: error.message });
    }
});

// Goals Routes
app.get('/api/goals', authenticateToken, async (req, res) => {
    try {
        const goals = await Goal.findAll({ 
            where: { user_id: req.user.id },
            order: [['createdAt', 'DESC']]
        });
        res.json(goals);
    } catch (error) {
        console.error('Error fetching goals:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/goals', authenticateToken, async (req, res) => {
    try {
        const { 
            goal_type, 
            target_value, 
            current_value, 
            target_date, 
            status, 
            description 
        } = req.body;

        // Validate required fields
        if (!goal_type || !target_value || !target_date) {
            return res.status(400).json({ error: 'Goal type, target value, and target date are required' });
        }

        // Validate goal type
        const validGoalTypes = ['weight', 'exercise', 'nutrition', 'sleep', 'water', 'other'];
        if (!validGoalTypes.includes(goal_type)) {
            return res.status(400).json({ error: 'Invalid goal type' });
        }

        const goal = await Goal.create({
            user_id: req.user.id,
            goal_type,
            target_value: parseFloat(target_value),
            current_value: parseFloat(current_value) || 0,
            start_date: new Date(),
            target_date: new Date(target_date),
            status: status || 'in_progress',
            description: description || ''
        });

        res.json(goal);
    } catch (error) {
        console.error('Error creating goal:', error);
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/goals/:id', authenticateToken, async (req, res) => {
    try {
        const goal = await Goal.findOne({
            where: { id: req.params.id, user_id: req.user.id }
        });

        if (!goal) {
            return res.status(404).json({ error: 'Goal not found' });
        }

        const { 
            goal_type, 
            target_value, 
            current_value, 
            target_date, 
            status, 
            description,
            progress_notes 
        } = req.body;

        // Validate goal type if provided
        if (goal_type) {
            const validGoalTypes = ['weight', 'exercise', 'nutrition', 'sleep', 'water', 'other'];
            if (!validGoalTypes.includes(goal_type)) {
                return res.status(400).json({ error: 'Invalid goal type' });
            }
        }

        await goal.update({
            goal_type: goal_type || goal.goal_type,
            target_value: target_value ? parseFloat(target_value) : goal.target_value,
            current_value: current_value ? parseFloat(current_value) : goal.current_value,
            target_date: target_date ? new Date(target_date) : goal.target_date,
            status: status || goal.status,
            description: description || goal.description,
            progress_notes: progress_notes || goal.progress_notes
        });

        res.json(goal);
    } catch (error) {
        console.error('Error updating goal:', error);
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/goals/:id', authenticateToken, async (req, res) => {
    try {
        const goal = await Goal.findOne({
            where: { id: req.params.id, user_id: req.user.id }
        });

        if (!goal) {
            return res.status(404).json({ error: 'Goal not found' });
        }

        await goal.destroy();
        res.json({ message: 'Goal deleted successfully' });
    } catch (error) {
        console.error('Error deleting goal:', error);
        res.status(500).json({ error: 'Failed to delete goal' });
    }
});

// Profile Routes
app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'name', 'email', 'age', 'gender', 'height', 'weight', 'activity_level']
        });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

app.put('/api/profile', authenticateToken, async (req, res) => {
    try {
        const { name, email, age, gender, height, weight, activity_level } = req.body;
        
        // Validate required fields
        if (!name || !email || !age || !gender || !height || !weight || !activity_level) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        
        // Validate numeric fields
        if (isNaN(age) || age < 1 || age > 120) {
            return res.status(400).json({ error: 'Age must be between 1 and 120' });
        }
        
        if (isNaN(height) || height < 100 || height > 250) {
            return res.status(400).json({ error: 'Height must be between 100 and 250 cm' });
        }
        
        if (isNaN(weight) || weight < 20 || weight > 300) {
            return res.status(400).json({ error: 'Weight must be between 20 and 300 kg' });
        }
        
        // Validate activity level
        const validActivityLevels = ['sedentary', 'light', 'moderate', 'active', 'very_active'];
        if (!validActivityLevels.includes(activity_level)) {
            return res.status(400).json({ error: 'Invalid activity level' });
        }
        
        // Check if email is already taken by another user
        const existingUser = await User.findOne({ 
            where: { 
                email,
                id: { [Op.ne]: req.user.id }
            }
        });
        
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already taken' });
        }
        
        // Update user profile
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        await user.update({
            name,
            email,
            age: parseInt(age),
            gender,
            height: parseFloat(height),
            weight: parseFloat(weight),
            activity_level
        });
        
        res.json({
            message: 'Profile updated successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                age: user.age,
                gender: user.gender,
                height: user.height,
                weight: user.weight,
                activity_level: user.activity_level
            }
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route for the main application
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Update the server port configuration
let PORT = 3001;

function startServer(port) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is busy, trying ${port + 1}`);
            startServer(port + 1);
        } else {
            console.error('Server error:', err);
        }
    });
}

// Start the server
startServer(PORT); 