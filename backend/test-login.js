const axios = require('axios');

const API_URL = 'http://localhost:5001/api/auth';

const testLogin = async () => {
    try {
        // 1. Register a new user
        const username = `testuser_${Date.now()}`;
        const email = `${username}@example.com`;
        const password = 'password123';

        console.log(`Attempting to register user: ${username}`);
        const registerResponse = await axios.post(`${API_URL}/register`, {
            username,
            email,
            password
        });
        console.log('Registration successful:', registerResponse.data);

        // 2. Login with the new user
        console.log('Attempting to login...');
        const loginResponse = await axios.post(`${API_URL}/login`, {
            email,
            password
        });
        console.log('Login successful:', loginResponse.data);

        const token = loginResponse.data.token;

        // 3. Get Profile
        console.log('Attempting to get profile...');
        const profileResponse = await axios.get(`${API_URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Get Profile successful:', profileResponse.data);


    } catch (error) {
        console.error('Test failed:', error.response ? error.response.data : error.message);
    }
};

testLogin();
