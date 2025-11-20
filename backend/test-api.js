// Simple test script to verify backend API endpoints
console.log('Testing Email Builder Backend API');

// Test health endpoint
fetch('http://localhost:5001/api/health')
  .then(response => response.json())
  .then(data => console.log('Health check:', data))
  .catch(err => console.error('Health check failed:', err));

// Test registration endpoint
const testUser = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'password123'
};

fetch('http://localhost:5001/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(testUser)
})
  .then(response => response.json())
  .then(data => console.log('Registration response:', data))
  .catch(err => console.error('Registration failed:', err));