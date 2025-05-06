// Global variables
let currentUser = null;
let weightChart = null;
let waterChart = null;
let timerInterval = null;

// Exercise data
const exercises = {
    Young: [
        {
            name: 'Running',
            description: '30 minutes of moderate-paced running',
            image: 'https://placehold.co/300x200/f0f0f0/333?text=Running'
        },
        {
            name: 'Cycling',
            description: '45 minutes of cycling',
            image: 'https://placehold.co/300x200/f0f0f0/333?text=Cycling'
        },
        {
            name: 'Swimming',
            description: '30 minutes of swimming',
            image: 'https://placehold.co/300x200/f0f0f0/333?text=Swimming'
        }
    ],
    Middle: [
        {
            name: 'Walking',
            description: '45 minutes of brisk walking',
            image: 'https://placehold.co/300x200/f0f0f0/333?text=Walking'
        },
        {
            name: 'Yoga',
            description: '30 minutes of yoga',
            image: 'https://placehold.co/300x200/f0f0f0/333?text=Yoga'
        },
        {
            name: 'Strength Training',
            description: '30 minutes of strength exercises',
            image: 'https://placehold.co/300x200/f0f0f0/333?text=Strength'
        }
    ],
    Senior: [
        {
            name: 'Walking',
            description: '30 minutes of gentle walking',
            image: 'https://placehold.co/300x200/f0f0f0/333?text=Walking'
        },
        {
            name: 'Chair Exercises',
            description: '20 minutes of chair-based exercises',
            image: 'https://placehold.co/300x200/f0f0f0/333?text=Chair'
        },
        {
            name: 'Stretching',
            description: '15 minutes of stretching',
            image: 'https://placehold.co/300x200/f0f0f0/333?text=Stretching'
        }
    ]
};

// Yoga poses data
const yogaPoses = {
    Young: [
        {
            name: 'Warrior Pose',
            description: 'Strengthens legs and improves balance',
            image: 'https://placehold.co/300x200/f0f0f0/333?text=Warrior'
        },
        {
            name: 'Tree Pose',
            description: 'Improves balance and concentration',
            image: 'https://placehold.co/300x200/f0f0f0/333?text=Tree'
        },
        {
            name: 'Downward Dog',
            description: 'Stretches the entire body',
            image: 'https://placehold.co/300x200/f0f0f0/333?text=Downward+Dog'
        }
    ],
    Middle: [
        {
            name: 'Cat-Cow Pose',
            description: 'Gentle spine movement',
            image: 'https://placehold.co/300x200/f0f0f0/333?text=Cat-Cow'
        },
        {
            name: 'Child\'s Pose',
            description: 'Relaxing pose for stress relief',
            image: 'https://placehold.co/300x200/f0f0f0/333?text=Child'
        },
        {
            name: 'Bridge Pose',
            description: 'Strengthens back and legs',
            image: 'https://placehold.co/300x200/f0f0f0/333?text=Bridge'
        }
    ],
    Senior: [
        {
            name: 'Mountain Pose',
            description: 'Basic standing pose',
            image: 'https://placehold.co/300x200/f0f0f0/333?text=Mountain'
        },
        {
            name: 'Seated Forward Bend',
            description: 'Gentle hamstring stretch',
            image: 'https://placehold.co/300x200/f0f0f0/333?text=Forward+Bend'
        },
        {
            name: 'Corpse Pose',
            description: 'Deep relaxation',
            image: 'https://placehold.co/300x200/f0f0f0/333?text=Corpse'
        }
    ]
};

// Nutrition Module
const nutritionData = {
    fruits: [
        {
            name: 'Apple',
            image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=500&auto=format&fit=crop&q=60',
            calories: 52,
            protein: 0.3,
            carbs: 14,
            fat: 0.2,
            vitamins: 'A, C, K',
            category: 'fruits'
        },
        {
            name: 'Banana',
            image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=500&auto=format&fit=crop&q=60',
            calories: 89,
            protein: 1.1,
            carbs: 23,
            fat: 0.3,
            vitamins: 'B6, C, Potassium',
            category: 'fruits'
        },
        {
            name: 'Orange',
            image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=500&auto=format&fit=crop&q=60',
            calories: 47,
            protein: 0.9,
            carbs: 12,
            fat: 0.1,
            vitamins: 'C, A, B6',
            category: 'fruits'
        },
        {
            name: 'Strawberry',
            image: 'https://images.unsplash.com/photo-1566393028639-d108a42c46a7?w=500&auto=format&fit=crop&q=60',
            calories: 32,
            protein: 0.7,
            carbs: 7.7,
            fat: 0.3,
            vitamins: 'C, K, Folate',
            category: 'fruits'
        },
        {
            name: 'Blueberry',
            image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=500&auto=format&fit=crop&q=60',
            calories: 57,
            protein: 0.7,
            carbs: 14,
            fat: 0.3,
            vitamins: 'C, K, Manganese',
            category: 'fruits'
        },
        {
            name: 'Mango',
            image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=500&auto=format&fit=crop&q=60',
            calories: 60,
            protein: 0.8,
            carbs: 15,
            fat: 0.4,
            vitamins: 'A, C, E',
            category: 'fruits'
        }
    ],
    vegetables: [
        {
            name: 'Broccoli',
            image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500&auto=format&fit=crop&q=60',
            calories: 34,
            protein: 2.8,
            carbs: 7,
            fat: 0.4,
            vitamins: 'C, K, A',
            category: 'vegetables'
        },
        {
            name: 'Carrot',
            image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?w=500&auto=format&fit=crop&q=60',
            calories: 41,
            protein: 0.9,
            carbs: 10,
            fat: 0.2,
            vitamins: 'A, K, C',
            category: 'vegetables'
        },
        {
            name: 'Spinach',
            image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=60',
            calories: 23,
            protein: 2.9,
            carbs: 3.6,
            fat: 0.4,
            vitamins: 'A, C, K, Iron',
            category: 'vegetables'
        },
        {
            name: 'Bell Pepper',
            image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60',
            calories: 31,
            protein: 1,
            carbs: 6,
            fat: 0.3,
            vitamins: 'C, A, B6',
            category: 'vegetables'
        },
        {
            name: 'Tomato',
            image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=60',
            calories: 22,
            protein: 1.1,
            carbs: 4.8,
            fat: 0.2,
            vitamins: 'C, K, Potassium',
            category: 'vegetables'
        },
        {
            name: 'Cucumber',
            image: 'https://images.unsplash.com/photo-1589621316382-008455b857cd?w=500&auto=format&fit=crop&q=60',
            calories: 16,
            protein: 0.7,
            carbs: 3.6,
            fat: 0.1,
            vitamins: 'K, C, Magnesium',
            category: 'vegetables'
        }
    ],
    grains: [
        {
            name: 'Brown Rice',
            image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=60',
            calories: 112,
            protein: 2.6,
            carbs: 24,
            fat: 0.9,
            vitamins: 'B1, B3, B6',
            category: 'grains'
        },
        {
            name: 'Quinoa',
            image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60',
            calories: 120,
            protein: 4.4,
            carbs: 21,
            fat: 1.9,
            vitamins: 'B1, B2, B6',
            category: 'grains'
        },
        {
            name: 'Oats',
            image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=500&auto=format&fit=crop&q=60',
            calories: 68,
            protein: 2.5,
            carbs: 12,
            fat: 1.4,
            vitamins: 'B1, B5, Iron',
            category: 'grains'
        },
        {
            name: 'Whole Wheat Bread',
            image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60',
            calories: 69,
            protein: 3.6,
            carbs: 12,
            fat: 1,
            vitamins: 'B1, B2, B3',
            category: 'grains'
        },
        {
            name: 'Barley',
            image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop&q=60',
            calories: 123,
            protein: 2.3,
            carbs: 28,
            fat: 0.4,
            vitamins: 'B1, B3, Selenium',
            category: 'grains'
        },
        {
            name: 'Buckwheat',
            image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=500&auto=format&fit=crop&q=60',
            calories: 92,
            protein: 3.4,
            carbs: 20,
            fat: 0.6,
            vitamins: 'B2, B3, Magnesium',
            category: 'grains'
        }
    ]
};

// DOM Elements
const navLinks = document.querySelectorAll('.nav-links li');
const sections = document.querySelectorAll('.section');
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');
const authContainer = document.getElementById('auth-container');
const mainContainer = document.getElementById('main-container');
const exerciseCategories = document.querySelectorAll('.exercise-categories .category-btn');
const yogaCategories = document.querySelectorAll('.yoga-categories .category-btn');
const exerciseCards = document.querySelectorAll('.exercise-card');
const yogaCards = document.querySelectorAll('.yoga-card');

// Water Tracking
let waterData = {
    dailyGoal: 2000,
    currentAmount: 0,
    history: []
};

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add auth tab click handlers
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            toggleAuthTab(tab.dataset.tab);
        });
    });

    // Check authentication status
    checkAuth();

    // Handle show register link
    document.getElementById('show-register').addEventListener('click', (e) => {
        e.preventDefault();
        toggleAuthTab('register');
    });

    // Handle show login link
    document.getElementById('show-login').addEventListener('click', (e) => {
        e.preventDefault();
        toggleAuthTab('login');
    });

    // Navigation handling
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.parentElement.getAttribute('data-section');
            const href = link.getAttribute('href');
            
            // Handle exercise link
            if (href === '/exercise') {
                window.location.href = '/exercise';
                return;
            }
            
            // Handle logout
            if (link.parentElement.id === 'logout') {
                logout();
                return;
            }
            
            // Handle other sections
            if (section) {
                showSection(section);
            }
        });
    });

    // Handle registration
    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const userData = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            age: formData.get('age'),
            gender: formData.get('gender'),
            height: formData.get('height'),
            weight: formData.get('weight'),
            activity_level: formData.get('activity_level')
        };

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            // Store token and user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Show success message
            showNotification('Registration successful!', 'success');

            // Update UI
            document.getElementById('auth-container').style.display = 'none';
            document.getElementById('main-container').style.display = 'flex';
            
            // Update profile display
            updateProfileDisplay(data.user);
            
            // Load initial data
            loadHealthHistory();
            loadFitnessHistory();
            loadWaterData();
            loadAndDisplayGoals();
        } catch (error) {
            showNotification(error.message, 'error');
        }
    });

    // Handle login
    document.getElementById('login-form').addEventListener('submit', handleLogin);

    // Handle logout
    document.getElementById('logout').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        document.getElementById('auth-container').style.display = 'flex';
        document.getElementById('main-container').style.display = 'none';
        document.getElementById('login-section').style.display = 'block';
        document.getElementById('register-section').style.display = 'none';
    });

    // Check authentication status
    checkAuth();

    // Set minimum date for date inputs
    const today = new Date().toISOString().split('T')[0];
    document.querySelector('input[name="start_date"]').min = today;
    document.querySelector('input[name="end_date"]').min = today;

    // Initialize Nutrition Module
    initNutritionModule();

    // Update the profile section event listener to use DOMContentLoaded
    const profileLink = document.querySelector('a[href="#profile-section"]');
    if (profileLink) {
        profileLink.addEventListener('click', loadProfile);
    }
});

// Auth Tabs
authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and forms
        authTabs.forEach(t => t.classList.remove('active'));
        authForms.forEach(f => f.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding form
        tab.classList.add('active');
        const formId = `${tab.dataset.tab}-form`;
        const form = document.getElementById(formId);
        if (form) {
            form.classList.add('active');
        }
    });
});

// Health Form
document.getElementById('health-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const healthData = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/api/health', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(healthData)
        });

        if (response.ok) {
            alert('Health data saved successfully!');
            e.target.reset();
            loadHealthHistory();
        } else {
            const data = await response.json();
            alert(data.error);
        }
    } catch (error) {
        console.error('Health data error:', error);
        alert('Failed to save health data. Please try again.');
    }
});

// Fitness Form
document.getElementById('fitness-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fitnessData = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/api/fitness', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(fitnessData)
        });

        if (response.ok) {
            alert('Workout saved successfully!');
            e.target.reset();
            loadFitnessHistory();
        } else {
            const data = await response.json();
            alert(data.error);
        }
    } catch (error) {
        console.error('Fitness data error:', error);
        alert('Failed to save workout. Please try again.');
    }
});

// Water Form
document.getElementById('water-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const amount = parseInt(e.target.amount.value);
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    
    try {
        const response = await fetch('/api/water', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ amount })
        });
        
        if (response.ok) {
            const data = await response.json();
            waterData.currentAmount = data.currentAmount;
            waterData.history = data.history;
            updateWaterDisplay();
            e.target.reset();
        } else {
            const error = await response.json();
            alert(error.message || 'Failed to add water intake');
        }
    } catch (error) {
        console.error('Water data error:', error);
        alert('Failed to add water intake. Please try again.');
    }
});

// Profile Form
document.getElementById('profile-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Validate form data
    const name = formData.get('name');
    const email = formData.get('email');
    const age = formData.get('age');
    const gender = formData.get('gender');
    const height = formData.get('height');
    const weight = formData.get('weight');
    const activity_level = formData.get('activity_level');
    
    if (!name || !email || !age || !gender || !height || !weight || !activity_level) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    const profileData = {
        name,
        email,
        age: parseInt(age),
        gender,
        height: parseFloat(height),
        weight: parseFloat(weight),
        activity_level
    };

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            showNotification('Please login first', 'error');
            window.location.href = '/';
            return;
        }

        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(profileData)
        });

        const data = await response.json();
        
        if (response.ok) {
            showNotification('Profile updated successfully!', 'success');
            // Update the profile display
            document.getElementById('profile-name').textContent = data.user.name;
            document.getElementById('profile-email').textContent = data.user.email;
            document.getElementById('profile-height').textContent = `${data.user.height} cm`;
            document.getElementById('profile-weight').textContent = `${data.user.weight} kg`;
            document.getElementById('profile-activity').textContent = data.user.activity_level;
        } else {
            showNotification(data.error || 'Failed to update profile', 'error');
        }
    } catch (error) {
        console.error('Profile update error:', error);
        showNotification('Failed to update profile. Please try again.', 'error');
    }
});

// Goals Tab Functionality
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and content
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.goals-tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(`${tabId}-goals`).classList.add('active');
    });
});

// Update unit display and input based on goal type
document.querySelector('select[name="type"]').addEventListener('change', (e) => {
    const unitDisplay = document.querySelector('.unit-display');
    const targetInput = document.querySelector('input[name="target"]');
    const type = e.target.value;
    
    let unit = '';
    let step = '0.1';
    let min = '0';
    let max = '';
    let placeholder = '';
    
    switch(type) {
        case 'weight':
            unit = 'kg';
            step = '0.1';
            min = '0';
            max = '200';
            placeholder = 'Enter weight in kg';
            break;
        case 'workout':
            unit = 'minutes';
            step = '1';
            min = '0';
            max = '240';
            placeholder = 'Enter duration in minutes';
            break;
        case 'water':
            unit = 'ml';
            step = '50';
            min = '0';
            max = '5000';
            placeholder = 'Enter amount in ml';
            break;
        case 'steps':
            unit = 'steps';
            step = '100';
            min = '0';
            max = '50000';
            placeholder = 'Enter number of steps';
            break;
        case 'sleep':
            unit = 'hours';
            step = '0.5';
            min = '0';
            max = '24';
            placeholder = 'Enter sleep duration in hours';
            break;
        case 'meditation':
            unit = 'minutes';
            step = '1';
            min = '0';
            max = '120';
            placeholder = 'Enter meditation duration in minutes';
            break;
        case 'calories':
            unit = 'kcal';
            step = '10';
            min = '0';
            max = '5000';
            placeholder = 'Enter calories';
            break;
        case 'running':
        case 'cycling':
        case 'swimming':
            unit = 'km';
            step = '0.1';
            min = '0';
            max = '100';
            placeholder = 'Enter distance in km';
            break;
        case 'yoga':
            unit = 'sessions';
            step = '1';
            min = '0';
            max = '30';
            placeholder = 'Enter number of sessions';
            break;
        case 'strength':
            unit = 'workouts';
            step = '1';
            min = '0';
            max = '30';
            placeholder = 'Enter number of workouts';
            break;
        default:
            unit = '';
            placeholder = 'Select goal type first';
    }
    
    // Update input attributes
    targetInput.min = min;
    targetInput.max = max;
    targetInput.step = step;
    targetInput.placeholder = placeholder;
    
    // Update unit display
    unitDisplay.textContent = unit ? `Unit: ${unit}` : 'Select goal type to see unit';
    
    // Add validation message
    if (max) {
        unitDisplay.textContent += ` (Max: ${max} ${unit})`;
    }
});

// Goals Form
document.getElementById('goal-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Get current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Validate dates
    const startDate = new Date(formData.get('start_date'));
    const endDate = new Date(formData.get('end_date'));
    
    if (startDate < today) {
        alert('Start date cannot be in the past');
        return;
    }
    
    if (endDate < startDate) {
        alert('Target date must be after start date');
        return;
    }
    
    const goalData = {
        type: formData.get('type'),
        target: parseFloat(formData.get('target')),
        current: 0, // Initialize current progress as 0
        startDate: formData.get('start_date'),
        endDate: formData.get('end_date'),
        purpose: formData.get('purpose'),
        description: formData.get('description'),
        status: 'active'
    };

    try {
        const response = await fetch('/api/goals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(goalData)
        });

        if (response.ok) {
            const data = await response.json();
            showNotification('Goal set successfully!', 'success');
            e.target.reset();
            await loadAndDisplayGoals(); // Load and display updated goals
        } else {
            const error = await response.json();
            showNotification(error.error || 'Failed to set goal', 'error');
        }
    } catch (error) {
        console.error('Goal error:', error);
        showNotification('Failed to set goal. Please try again.', 'error');
    }
});

// Load and display goals
async function loadAndDisplayGoals() {
    try {
        const goals = await loadGoals();
        updateGoalsDisplay(goals);
    } catch (error) {
        console.error('Error loading goals:', error);
        showNotification('Failed to load goals', 'error');
    }
}

// Update goals display
function updateGoalsDisplay(goals) {
    const activeGoalsContainer = document.querySelector('#active-goals .goals-grid');
    const completedGoalsContainer = document.querySelector('#completed-goals .goals-grid');
    
    if (!activeGoalsContainer || !completedGoalsContainer) {
        console.warn('Goals containers not found');
        return;
    }
    
    // Clear existing content
    activeGoalsContainer.innerHTML = '';
    completedGoalsContainer.innerHTML = '';

    if (!goals || goals.length === 0) {
        activeGoalsContainer.innerHTML = '<p class="no-goals">No active goals</p>';
        completedGoalsContainer.innerHTML = '<p class="no-goals">No completed goals</p>';
        return;
    }

    // Sort goals by end date
    goals.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));

    goals.forEach(goal => {
        const card = createGoalCard(goal);
        const isCompleted = goal.current >= goal.target || new Date(goal.endDate) < new Date();
        
        if (isCompleted) {
            completedGoalsContainer.appendChild(card);
        } else {
            activeGoalsContainer.appendChild(card);
        }
    });
}

// Create goal card
function createGoalCard(goal) {
    const card = document.createElement('div');
    card.className = 'goal-card';
    
    const progress = (goal.current / goal.target) * 100;
    const isCompleted = goal.current >= goal.target;
    const isExpired = new Date(goal.endDate) < new Date();
    const isCompletedOnTime = isCompleted && !isExpired;
    const statusClass = isCompleted ? 'completed' : 
                       isExpired ? 'failed' : 'active';
    const statusText = isCompleted ? 'Completed' : 
                      isExpired ? 'Expired' : 'Active';
    
    const daysLeft = Math.ceil((new Date(goal.endDate) - new Date()) / (1000 * 60 * 60 * 24));
    
    card.innerHTML = `
        <div class="goal-header">
            <span class="goal-status ${statusClass}">${statusText}</span>
            <h4>${formatGoalType(goal.type)}</h4>
        </div>
        <div class="goal-content">
            ${isCompletedOnTime ? `
                <div class="congratulations-message">
                    <h3>🎉 Congratulations! 🎉</h3>
                    <p>You've successfully achieved your goal!</p>
                    <p class="achievement-text">${goal.current} ${getGoalUnit(goal.type)} achieved!</p>
                </div>
            ` : ''}
            <p class="goal-purpose"><strong>Purpose:</strong> ${goal.purpose || 'Not specified'}</p>
            <p class="goal-description">${goal.description || ''}</p>
            <div class="goal-progress">
                <div class="progress-bar">
                    <div class="progress" style="width: ${Math.min(progress, 100)}%"></div>
                </div>
                <p class="progress-text">${Math.round(progress)}% Complete</p>
            </div>
            <p class="goal-target">Target: ${goal.target} ${getGoalUnit(goal.type)}</p>
            <p class="goal-current">Current: ${goal.current} ${getGoalUnit(goal.type)}</p>
            <div class="goal-dates">
                <p><strong>Start Date:</strong> ${new Date(goal.startDate).toLocaleDateString()}</p>
                <p><strong>Target Date:</strong> ${new Date(goal.endDate).toLocaleDateString()}</p>
                ${!isCompleted && !isExpired ? `<p><strong>Days Left:</strong> ${daysLeft}</p>` : ''}
            </div>
        </div>
        <div class="goal-actions">
            ${!isCompleted && !isExpired ? `
                <button onclick="updateGoalProgress(${goal.id})" class="update-btn">Update Progress</button>
                <button onclick="deleteGoal(${goal.id})" class="delete-btn">Delete</button>
            ` : `
                <button onclick="deleteGoal(${goal.id})" class="delete-btn">Delete</button>
            `}
        </div>
    `;
    
    return card;
}

// Update goal progress
async function updateGoalProgress(goalId) {
    const currentValue = prompt('Enter your current progress:');
    if (currentValue === null) return; // User cancelled

    const progress = parseFloat(currentValue);
    if (isNaN(progress) || progress < 0) {
        showNotification('Please enter a valid number', 'error');
        return;
    }

    try {
        const response = await fetch(`/api/goals/${goalId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ current: progress })
        });

        if (response.ok) {
            showNotification('Progress updated successfully!', 'success');
            await loadAndDisplayGoals();
        } else {
            const error = await response.json();
            showNotification(error.error || 'Failed to update progress', 'error');
        }
    } catch (error) {
        console.error('Error updating goal progress:', error);
        showNotification('Failed to update progress', 'error');
    }
}

// Delete goal
async function deleteGoal(goalId) {
    if (!confirm('Are you sure you want to delete this goal?')) return;

    try {
        const response = await fetch(`/api/goals/${goalId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            showNotification('Goal deleted successfully!', 'success');
            await loadAndDisplayGoals();
        } else {
            const error = await response.json();
            showNotification(error.error || 'Failed to delete goal', 'error');
        }
    } catch (error) {
        console.error('Error deleting goal:', error);
        showNotification('Failed to delete goal', 'error');
    }
}

// Load Functions
async function loadHealthHistory() {
    try {
        const response = await fetch('/api/health', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            const historyDiv = document.getElementById('health-history');
            historyDiv.innerHTML = data.map(record => `
                <div class="history-item">
                    <p>Date: ${new Date(record.date).toLocaleDateString()}</p>
                    <p>Weight: ${record.weight}kg</p>
                    <p>Height: ${record.height}cm</p>
                    <p>Heart Rate: ${record.heart_rate} bpm</p>
                    <p>Sleep: ${record.sleep_hours} hours</p>
                    <p>Stress Level: ${record.stress_level}</p>
                    ${record.blood_pressure_systolic && record.blood_pressure_diastolic ? 
                        `<p>Blood Pressure: ${record.blood_pressure_systolic}/${record.blood_pressure_diastolic}</p>` : ''}
                    ${record.blood_sugar ? `<p>Blood Sugar: ${record.blood_sugar}</p>` : ''}
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading health history:', error);
    }
}

async function loadFitnessHistory() {
    try {
        const response = await fetch('/api/fitness', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            const historyDiv = document.getElementById('fitness-history');
            historyDiv.innerHTML = data.map(workout => `
                <div class="history-item">
                    <p>Date: ${new Date(workout.date).toLocaleDateString()}</p>
                    <p>Type: ${workout.workoutType}</p>
                    <p>Duration: ${workout.duration} minutes</p>
                    <p>Notes: ${workout.notes || 'N/A'}</p>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading fitness history:', error);
    }
}

async function loadWaterHistory() {
    try {
        const response = await fetch('/api/water', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            const historyDiv = document.getElementById('water-history');
            historyDiv.innerHTML = data.map(record => `
                <div class="history-item">
                    <p>Date: ${new Date(record.date).toLocaleDateString()}</p>
                    <p>Amount: ${record.amount}ml</p>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading water history:', error);
    }
}

async function loadGoals() {
    try {
        const response = await fetch('/api/goals', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data || [];
        } else {
            console.log('No goals data available');
            return [];
        }
    } catch (error) {
        console.error('Error loading goals:', error);
        return [];
    }
}

// Load profile data
const loadProfile = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/';
            return;
        }

        const response = await fetch('/api/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to load profile data');
        }

        const data = await response.json();
        
        // Update form fields
        const form = document.getElementById('profile-form');
        form.querySelector('[name="name"]').value = data.name;
        form.querySelector('[name="email"]').value = data.email;
        form.querySelector('[name="age"]').value = data.age;
        form.querySelector('[name="gender"]').value = data.gender;
        form.querySelector('[name="height"]').value = data.height;
        form.querySelector('[name="weight"]').value = data.weight;
        form.querySelector('[name="activity_level"]').value = data.activity_level;
        
        // Update profile display
        document.getElementById('profile-name').textContent = data.name;
        document.getElementById('profile-email').textContent = data.email;
        document.getElementById('profile-height').textContent = `${data.height} cm`;
        document.getElementById('profile-weight').textContent = `${data.weight} kg`;
        document.getElementById('profile-activity').textContent = data.activity_level;
    } catch (error) {
        console.error('Error loading profile:', error);
        showNotification('Failed to load profile data. Please try again.', 'error');
    }
};

// Check Authentication
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (token && user) {
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('main-container').style.display = 'flex';
        showSection('dashboard');
        loadUserData();
    } else {
        document.getElementById('auth-container').style.display = 'flex';
        document.getElementById('main-container').style.display = 'none';
    }
}

// Show/Hide Sections
function showSection(sectionId) {
    console.log('Showing section:', sectionId);

    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    const selectedSection = document.getElementById(`${sectionId}-section`);
    if (selectedSection) {
        selectedSection.style.display = 'block';

        // Load section-specific data
        switch(sectionId) {
            case 'dashboard':
                loadDashboard();
                break;
            case 'health':
                loadHealthData();
                break;
            case 'fitness':
                loadFitnessData();
                break;
            case 'water':
                loadWaterData();
                break;
            case 'goals':
                loadGoals();
                break;
            case 'nutrition':
                initNutritionModule();
                break;
            case 'profile':
                loadProfile();
                break;
        }
    }
}

// Logout function
function logout() {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Show login form and hide main content
    document.getElementById('auth-container').style.display = 'flex';
    document.getElementById('main-container').style.display = 'none';
    toggleAuthTab('login');
    
    // Clear any existing data
    clearDashboardData();
}

function clearDashboardData() {
    // Clear any displayed data
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.innerHTML = '';
    });
}

// Exercise Categories
exerciseCategories.forEach(category => {
    category.addEventListener('click', () => {
        exerciseCategories.forEach(c => c.classList.remove('active'));
        category.classList.add('active');

        const selectedCategory = category.dataset.category;
        exerciseCards.forEach(card => {
            if (card.dataset.category === selectedCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Yoga Categories
yogaCategories.forEach(category => {
    category.addEventListener('click', () => {
        yogaCategories.forEach(c => c.classList.remove('active'));
        category.classList.add('active');

        const selectedCategory = category.dataset.category;
        yogaCards.forEach(card => {
            if (card.dataset.category === selectedCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Health tracking functions
async function handleHealthSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Validate mandatory input data
    const weight = parseFloat(formData.get('weight'));
    const height = parseFloat(formData.get('height'));
    const heartRate = parseInt(formData.get('heart_rate'));
    const sleepHours = parseFloat(formData.get('sleep_hours'));
    const stressLevel = formData.get('stress_level');

    // Input validation for mandatory fields
    if (!weight || !height || !heartRate || !sleepHours || !stressLevel) {
        alert('Please fill in all required fields');
        return;
    }

    if (weight <= 0 || height <= 0 || heartRate <= 0 || sleepHours <= 0) {
        alert('Please enter valid values for all fields');
        return;
    }

    try {
        const response = await fetch('/api/health', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                weight,
                height,
                heart_rate: heartRate,
                sleep_hours: sleepHours,
                stress_level: stressLevel,
                blood_pressure_systolic: formData.get('blood_pressure_systolic') || null,
                blood_pressure_diastolic: formData.get('blood_pressure_diastolic') || null,
                blood_sugar: formData.get('blood_sugar') || null,
                date: new Date().toISOString()
            })
        });

        if (response.ok) {
            const data = await response.json();
            alert('Health data saved successfully!');
            loadHealthData();
            event.target.reset();
        } else {
            const error = await response.json();
            alert(error.error || 'Failed to save health data');
        }
    } catch (error) {
        console.error('Health data error:', error);
        alert('An error occurred while saving health data');
    }
}

async function loadHealthData() {
    try {
        const response = await fetch('/api/health', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data || [];
        } else {
            console.log('No health data available');
            return [];
        }
    } catch (error) {
        console.error('Error loading health data:', error);
        return [];
    }
}

function updateHealthTable(data) {
    const tbody = document.querySelector('#health-table tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    data.forEach(record => {
        const row = document.createElement('tr');
        const bmi = (record.weight / Math.pow(record.height / 100, 2)).toFixed(1);
        row.innerHTML = `
            <td>${new Date(record.date).toLocaleDateString()}</td>
            <td>${record.weight} kg</td>
            <td>${record.height} cm</td>
            <td>${bmi}</td>
            <td>${record.heart_rate} bpm</td>
            <td>${record.sleep_hours} hours</td>
            <td>${record.stress_level}</td>
        `;
        tbody.appendChild(row);
    });
}

// Dashboard functions
async function loadDashboard() {
    try {
        // Load all data in parallel
        const [healthData, fitnessData, waterData, goalsData] = await Promise.all([
            loadHealthData(),
            loadFitnessData(),
            loadWaterData(),
            loadGoals()
        ]);

        // Update dashboard summary
        updateDashboardSummary(healthData, fitnessData, waterData, goalsData);
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        // Show empty dashboard with error message
        updateDashboardSummary([], [], { dailyGoal: 2000, currentAmount: 0, history: [] }, []);
    }
}

function updateDashboardSummary(healthData, fitnessData, waterData, goalsData) {
    // Update health summary
    const healthSummary = document.getElementById('health-summary');
    if (healthSummary) {
        if (healthData && healthData.length > 0) {
            const latestHealth = healthData[healthData.length - 1];
            healthSummary.innerHTML = `
                <div class="summary-card">
                    <h3>Health Summary</h3>
                    <p>Weight: ${latestHealth.weight || 'N/A'} kg</p>
                    <p>Height: ${latestHealth.height || 'N/A'} cm</p>
                    <p>Heart Rate: ${latestHealth.heart_rate || 'N/A'} bpm</p>
                    <p>Sleep: ${latestHealth.sleep_hours || 'N/A'} hours</p>
                    <p>Stress Level: ${latestHealth.stress_level || 'N/A'}</p>
                </div>
            `;
        } else {
            healthSummary.innerHTML = `
                <div class="summary-card">
                    <h3>Health Summary</h3>
                    <p>No health data available</p>
                </div>
            `;
        }
    }

    // Update fitness summary
    const fitnessSummary = document.getElementById('fitness-summary');
    if (fitnessSummary) {
        if (fitnessData && fitnessData.length > 0) {
            const latestFitness = fitnessData[fitnessData.length - 1];
            fitnessSummary.innerHTML = `
                <div class="summary-card">
                    <h3>Fitness Summary</h3>
                    <p>Last Workout: ${latestFitness.exercise_type || 'N/A'}</p>
                    <p>Duration: ${latestFitness.duration || 'N/A'} minutes</p>
                    <p>Calories: ${latestFitness.calories || 'N/A'} kcal</p>
                    <p>Intensity: ${latestFitness.intensity || 'N/A'}</p>
                </div>
            `;
        } else {
            fitnessSummary.innerHTML = `
                <div class="summary-card">
                    <h3>Fitness Summary</h3>
                    <p>No fitness data available</p>
                </div>
            `;
        }
    }

    // Update water summary
    const waterSummary = document.getElementById('water-summary');
    if (waterSummary) {
        if (waterData) {
            const progress = (waterData.currentAmount / waterData.dailyGoal) * 100;
            waterSummary.innerHTML = `
                <div class="summary-card">
                    <h3>Water Intake</h3>
                    <p>Today's Intake: ${waterData.currentAmount || 0}ml</p>
                    <p>Daily Goal: ${waterData.dailyGoal || 2000}ml</p>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${Math.min(progress, 100)}%"></div>
                    </div>
                </div>
            `;
        } else {
            waterSummary.innerHTML = `
                <div class="summary-card">
                    <h3>Water Intake</h3>
                    <p>No water data available</p>
                </div>
            `;
        }
    }

    // Update goals summary
    const goalsSummary = document.getElementById('goals-summary');
    if (goalsSummary) {
        if (goalsData && goalsData.length > 0) {
            const activeGoals = goalsData.filter(goal => goal.status === 'active');
            const completedGoals = goalsData.filter(goal => goal.status === 'completed');
            
            goalsSummary.innerHTML = `
                <div class="summary-card">
                    <h3>Goals Progress</h3>
                    <p>Active Goals: ${activeGoals.length}</p>
                    <p>Completed Goals: ${completedGoals.length}</p>
                    ${activeGoals.map(goal => `
                        <div class="goal-progress-item">
                            <p><strong>${formatGoalType(goal.type)}</strong></p>
                            <div class="progress-bar">
                                <div class="progress" style="width: ${(goal.current / goal.target) * 100}%"></div>
                            </div>
                            <p>${goal.current} / ${goal.target} ${getGoalUnit(goal.type)}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            goalsSummary.innerHTML = `
                <div class="summary-card">
                    <h3>Goals Progress</h3>
                    <p>No goals set</p>
                    <button onclick="showSection('goals')" class="btn-primary">Set New Goal</button>
                </div>
            `;
        }
    }
}

// Nutrition Module
function initNutritionModule() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('nutrition-search');
    const foodGrid = document.getElementById('food-grid');

    // Event Listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Filter food items
            filterFoodItems(button.dataset.category);
        });
    });

    searchInput.addEventListener('input', (e) => {
        filterFoodItems('all', e.target.value);
    });

    // Initial render
    renderFoodItems('all');
}

// Render Food Items
function renderFoodItems(category, searchTerm = '') {
    const foodGrid = document.getElementById('food-grid');
    foodGrid.innerHTML = '';

    let itemsToRender = [];
    
    if (category === 'all') {
        itemsToRender = [...nutritionData.fruits, ...nutritionData.vegetables, ...nutritionData.grains];
    } else {
        itemsToRender = nutritionData[category];
    }

    // Filter by search term if provided
    if (searchTerm) {
        itemsToRender = itemsToRender.filter(item => 
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    itemsToRender.forEach(item => {
        const card = createFoodCard(item);
        foodGrid.appendChild(card);
    });
}

// Create Food Card
function createFoodCard(item) {
    const card = document.createElement('div');
    card.className = 'food-card';
    
    card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="food-image">
        <div class="food-content">
            <h3 class="food-title">${item.name}</h3>
            <div class="nutrition-info">
                <div class="nutrition-item">
                    <span class="nutrition-label">Calories</span>
                    <span class="nutrition-value">${item.calories} kcal</span>
                </div>
                <div class="nutrition-item">
                    <span class="nutrition-label">Protein</span>
                    <span class="nutrition-value">${item.protein}g</span>
                </div>
                <div class="nutrition-item">
                    <span class="nutrition-label">Carbs</span>
                    <span class="nutrition-value">${item.carbs}g</span>
                </div>
                <div class="nutrition-item">
                    <span class="nutrition-label">Fat</span>
                    <span class="nutrition-value">${item.fat}g</span>
                </div>
            </div>
            <div class="nutrition-item" style="grid-column: 1 / -1; margin-top: 1rem;">
                <span class="nutrition-label">Vitamins</span>
                <span class="nutrition-value">${item.vitamins}</span>
            </div>
        </div>
    `;

    return card;
}

// Filter Food Items
function filterFoodItems(category, searchTerm = '') {
    renderFoodItems(category, searchTerm);
}

// Fitness Module
async function loadFitnessData() {
    try {
        const response = await fetch('/api/fitness', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            
            // Update fitness history if the container exists
            const historyContainer = document.getElementById('fitness-history');
            if (historyContainer) {
                historyContainer.innerHTML = ''; // Clear existing content
                data.forEach(workout => {
                    const workoutElement = document.createElement('div');
                    workoutElement.className = 'workout-item';
                    workoutElement.innerHTML = `
                        <h4>${workout.workoutType}</h4>
                        <p>Duration: ${workout.duration} minutes</p>
                        <p>Calories: ${workout.calories}</p>
                        <p>Intensity: ${workout.intensity}</p>
                        <p>Date: ${new Date(workout.date).toLocaleDateString()}</p>
                        ${workout.notes ? `<p>Notes: ${workout.notes}</p>` : ''}
                    `;
                    historyContainer.appendChild(workoutElement);
                });
            }
            
            return data || [];
        } else {
            console.log('No fitness data available');
            return [];
        }
    } catch (error) {
        console.error('Error loading fitness data:', error);
        return [];
    }
}

function updateFitnessTable(data) {
    const tbody = document.querySelector('#fitness-table tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    data.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(record.date).toLocaleDateString()}</td>
            <td>${record.exercise_type}</td>
            <td>${record.duration} minutes</td>
            <td>${record.calories} kcal</td>
            <td>${record.intensity}</td>
        `;
        tbody.appendChild(row);
    });
}

// Water Module
async function loadWaterData() {
    try {
        const response = await fetch('/api/water', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data || { dailyGoal: 2000, currentAmount: 0, history: [] };
        } else {
            console.log('No water data available');
            return { dailyGoal: 2000, currentAmount: 0, history: [] };
        }
    } catch (error) {
        console.error('Error loading water data:', error);
        return { dailyGoal: 2000, currentAmount: 0, history: [] };
    }
}

function updateWaterDisplay() {
    const waterTable = document.getElementById('water-table');
    if (!waterTable) return;

    const tbody = waterTable.querySelector('tbody');
    if (!tbody) return;

    // Clear existing content
    tbody.innerHTML = '';

    // Check if we have history data
    if (!waterData.history || waterData.history.length === 0) {
        tbody.innerHTML = '<tr><td colspan="2" class="text-center">No water intake records found</td></tr>';
        return;
    }

    // Sort data by date in descending order (newest first)
    const sortedData = [...waterData.history].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Create table rows for each water intake record
    sortedData.forEach(record => {
        const row = document.createElement('tr');
        const date = new Date(record.date);
        row.innerHTML = `
            <td>${date.toLocaleDateString()} ${date.toLocaleTimeString()}</td>
            <td>${record.amount} ml</td>
        `;
        tbody.appendChild(row);
    });
}

function updateWaterProgress() {
    const progressBar = document.getElementById('water-progress');
    const progressText = document.querySelector('.water-progress p');
    
    if (!progressBar || !progressText) return;

    const progress = (waterData.currentAmount / waterData.dailyGoal) * 100;
    
    // Update progress bar
    progressBar.style.width = `${Math.min(progress, 100)}%`;
    
    // Update progress text
    progressText.textContent = `Daily Goal: ${waterData.dailyGoal}ml (Current: ${waterData.currentAmount}ml)`;

    // Update progress bar color based on progress
    if (progress >= 100) {
        progressBar.style.background = 'linear-gradient(90deg, #2ecc71, #27ae60)';
    } else if (progress >= 75) {
        progressBar.style.background = 'linear-gradient(90deg, #3498db, #2980b9)';
    } else if (progress >= 50) {
        progressBar.style.background = 'linear-gradient(90deg, #f1c40f, #f39c12)';
    } else {
        progressBar.style.background = 'linear-gradient(90deg, #e74c3c, #c0392b)';
    }
}

// Add event listeners for water intake
document.addEventListener('DOMContentLoaded', function() {
    const waterForm = document.getElementById('water-form');
    if (waterForm) {
        waterForm.addEventListener('submit', handleWaterSubmit);
    }

    // Load water data when water section is shown
    const waterSection = document.getElementById('water-section');
    if (waterSection) {
        // Add a custom event listener for section visibility
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const style = window.getComputedStyle(waterSection);
                    if (style.display === 'block') {
                        loadWaterData();
                    }
                }
            });
        });

        observer.observe(waterSection, { attributes: true });
    }
});

// Goals Module
function formatGoalType(type) {
    return type.charAt(0).toUpperCase() + type.slice(1) + ' Goal';
}

function getGoalUnit(type) {
    switch (type) {
        case 'weight': return 'kg';
        case 'workout': return 'minutes';
        case 'water': return 'ml';
        case 'steps': return 'steps';
        case 'sleep': return 'hours';
        case 'meditation': return 'minutes';
        case 'calories': return 'kcal';
        case 'running':
        case 'cycling':
        case 'swimming': return 'km';
        case 'yoga': return 'sessions';
        case 'strength': return 'workouts';
        default: return '';
    }
}

async function loadUserData() {
    try {
        // Load all user data in parallel
        const [healthData, fitnessData, waterData, goalsData] = await Promise.all([
            loadHealthData(),
            loadFitnessData(),
            loadWaterData(),
            loadGoals()
        ]);

        // Update dashboard with all data
        updateDashboardSummary(healthData, fitnessData, waterData, goalsData);
        
        // Show dashboard section
        showSection('dashboard');
    } catch (error) {
        console.error('Error loading user data:', error);
        // Show empty dashboard
        updateDashboardSummary([], [], { dailyGoal: 2000, currentAmount: 0, history: [] }, []);
        showSection('dashboard');
    }
}

// Toggle between login and register forms
function toggleAuthTab(tab) {
    // Update tab styles
    document.querySelectorAll('.auth-tab').forEach(t => {
        t.classList.remove('active');
    });
    document.querySelector(`.auth-tab[data-tab="${tab}"]`).classList.add('active');
    
    // Update form visibility
    document.querySelectorAll('.auth-form').forEach(f => {
        f.classList.remove('active');
    });
    document.getElementById(`${tab}-form`).classList.add('active');
}

// Handle login form submission
const handleLogin = async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            checkAuth();
            showNotification('Login successful!', 'success');
        } else {
            showNotification(data.error || 'Login failed', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showNotification('An error occurred during login', 'error');
    }
};

// Show Notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Submit fitness data
const submitFitnessData = async (e) => {
    e.preventDefault();
    
    const formData = {
        workoutType: document.getElementById('workout-type').value,
        duration: parseInt(document.getElementById('workout-duration').value),
        calories: parseInt(document.getElementById('workout-calories').value),
        intensity: document.getElementById('workout-intensity').value,
        notes: document.getElementById('workout-notes').value
    };
    
    // Validate required fields
    if (!formData.workoutType || !formData.duration || !formData.calories || !formData.intensity) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    try {
        const response = await fetchWithAuth('/api/fitness', {
            method: 'POST',
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to save workout data');
        }
        
        const data = await response.json();
        showNotification('Workout data saved successfully!', 'success');
        
        // Reset form
        e.target.reset();
        
        // Reload fitness data
        await loadFitnessData();
        
    } catch (error) {
        console.error('Error saving workout:', error);
        showNotification(error.message || 'Failed to save workout data. Please try again.', 'error');
    }
};

// Water Intake Functions
function handleWaterSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const amount = parseFloat(formData.get('amount'));
    
    if (isNaN(amount) || amount <= 0) {
        showNotification('Please enter a valid amount', 'error');
        return;
    }

    fetch('/api/water', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ amount })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add water intake');
        }
        return response.json();
    })
    .then(data => {
        showNotification('Water intake added successfully!', 'success');
        e.target.reset();
        // Update the water data and display
        waterData = data;
        updateWaterDisplay();
        updateWaterProgress();
    })
    .catch(error => {
        console.error('Water data error:', error);
        showNotification('Failed to add water intake. Please try again.', 'error');
    });
}

function loadWaterData() {
    fetch('/api/water', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch water data');
        }
        return response.json();
    })
    .then(data => {
        waterData = data;
        updateWaterDisplay();
        updateWaterProgress();
    })
    .catch(error => {
        console.error('Error loading water data:', error);
        showNotification('Failed to load water data. Please try again.', 'error');
    });
}

function updateWaterDisplay() {
    const waterTable = document.getElementById('water-table');
    if (!waterTable) return;

    const tbody = waterTable.querySelector('tbody');
    if (!tbody) return;

    // Clear existing content
    tbody.innerHTML = '';

    // Check if we have history data
    if (!waterData.history || waterData.history.length === 0) {
        tbody.innerHTML = '<tr><td colspan="2" class="text-center">No water intake records found</td></tr>';
        return;
    }

    // Sort data by date in descending order (newest first)
    const sortedData = [...waterData.history].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Create table rows for each water intake record
    sortedData.forEach(record => {
        const row = document.createElement('tr');
        const date = new Date(record.date);
        row.innerHTML = `
            <td>${date.toLocaleDateString()} ${date.toLocaleTimeString()}</td>
            <td>${record.amount} ml</td>
        `;
        tbody.appendChild(row);
    });
}

function updateWaterProgress() {
    const progressBar = document.getElementById('water-progress');
    const progressText = document.querySelector('.water-progress p');
    
    if (!progressBar || !progressText) return;

    const progress = (waterData.currentAmount / waterData.dailyGoal) * 100;
    
    // Update progress bar
    progressBar.style.width = `${Math.min(progress, 100)}%`;
    
    // Update progress text
    progressText.textContent = `Daily Goal: ${waterData.dailyGoal}ml (Current: ${waterData.currentAmount}ml)`;

    // Update progress bar color based on progress
    if (progress >= 100) {
        progressBar.style.background = 'linear-gradient(90deg, #2ecc71, #27ae60)';
    } else if (progress >= 75) {
        progressBar.style.background = 'linear-gradient(90deg, #3498db, #2980b9)';
    } else if (progress >= 50) {
        progressBar.style.background = 'linear-gradient(90deg, #f1c40f, #f39c12)';
    } else {
        progressBar.style.background = 'linear-gradient(90deg, #e74c3c, #c0392b)';
    }
}