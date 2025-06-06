# Fitness Tracker Application

A comprehensive health and fitness tracking application that helps users monitor their health metrics, track workouts, manage water intake, and achieve their fitness goals.

## Features

- User Authentication (Register/Login)
- Health Metrics Tracking
- Fitness Workout Logging
- Water Intake Monitoring
- Goal Setting and Progress Tracking
- Nutrition Tracking
- Dashboard with Health Summary

## Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Git](https://git-scm.com/downloads)

## Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/malleshyadav124/fitnesstracker.git
   cd fitnesstracker
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   - Install PostgreSQL if you haven't already
   - Create a new database named `fitnessapp`
   - Default database settings:
     - Host: localhost
     - Port: 5432
     - Database: fitnessapp
     - Username: postgres
     - Password: (set your password)

4. **Environment Configuration**
   Create a `.env` file in the root directory with the following content:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=fitnessapp
   DB_USER=postgres
   DB_PASSWORD=your_password
   JWT_SECRET=your_secret_key
   PORT=3000
   ```

5. **Initialize Database**
   ```bash
   node database/init-db.js
   ```

6. **Start the Application**
   ```bash
   node server.js
   ```

7. **Access the Application**
   - Open your web browser
   - Go to `http://localhost:3000`

## Project Structure

```
fitnessapp/
├── public/              # Frontend files
│   ├── index.html      # Main application page
│   ├── style.css       # Styles
│   └── script.js       # Frontend JavaScript
├── models/             # Database models
├── config/            # Configuration files
├── database/          # Database scripts
└── server.js          # Main server file
```

## Features in Detail

### User Management
- Registration with detailed health information
- Secure login system
- Profile management

### Health Tracking
- Weight and height monitoring
- BMI calculation
- Heart rate tracking
- Sleep hours logging
- Stress level monitoring
- Optional health metrics (blood pressure, blood sugar)

### Fitness Tracking
- Multiple workout types
- Duration and calories tracking
- Intensity levels
- Workout history
- Progress visualization

### Water Intake
- Daily water consumption tracking
- Progress towards daily goals
- Historical data

### Goals
- Set various types of fitness goals
- Track progress
- View completed goals
- Set new targets

### Nutrition
- Food item search
- Category-based filtering
- Nutritional information

## Troubleshooting

### Common Issues and Solutions

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Verify database credentials in `.env`
   - Check if database exists

2. **Port Already in Use**
   - Change PORT in `.env` to a different number
   - Check if another application is using port 3000

3. **Module Not Found Errors**
   - Run `npm install` again
   - Check if all dependencies are listed in package.json

4. **Authentication Issues**
   - Verify JWT_SECRET in .env
   - Check if user exists in database

## Security Notes

- Never commit the `.env` file
- Use strong passwords for database
- Keep JWT_SECRET secure
- Regularly update dependencies

## Testing

Run the test suite:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For any issues or questions, please create an issue in the GitHub repository.
