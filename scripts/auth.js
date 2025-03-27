document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const instructorBtn = document.getElementById('instructor-btn');
    const studentBtn = document.getElementById('student-btn');
    const appContent = document.getElementById('app-content');

    // Temporary user data (will be replaced with backend)
    const users = {
        instructor: { username: 'instructor@flightschool.com', password: 'instructor123', role: 'instructor' },
        student: { username: 'student@flightschool.com', password: 'student123', role: 'student' }
    };

    // Event Listeners
    instructorBtn.addEventListener('click', () => showLoginForm('instructor'));
    studentBtn.addEventListener('click', () => showLoginForm('student'));

    function showLoginForm(role) {
        appContent.innerHTML = `
            <div class="login-container mx-auto" style="max-width: 400px;">
                <h2 class="text-center mb-4">${role.charAt(0).toUpperCase() + role.slice(1)} Login</h2>
                <form id="login-form">
                    <div class="mb-3">
                        <label for="username" class="form-label">Email</label>
                        <input type="email" class="form-control" id="username" required>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Login</button>
                    <button type="button" class="btn btn-link w-100 mt-2" id="back-btn">Back</button>
                </form>
            </div>
        `;

        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            handleLogin(role);
        });

        document.getElementById('back-btn').addEventListener('click', () => {
            location.reload();
        });
    }

    function handleLogin(role) {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Basic validation (will be replaced with backend)
        if (username === users[role].username && password === users[role].password) {
            localStorage.setItem('currentUser', JSON.stringify(users[role]));
            redirectToDashboard(role);
        } else {
            alert('Invalid credentials. Please try again.');
        }
    }

    function redirectToDashboard(role) {
        switch(role) {
            case 'instructor':
                window.location.href = 'views/instructor/dashboard.html';
                break;
            case 'student':
                window.location.href = 'views/student/dashboard.html';
                break;
            default:
                appContent.innerHTML = `
                    <div class="alert alert-danger">
                        Error: Unknown user role
                    </div>
                    <button class="btn btn-secondary mt-3" onclick="location.reload();">
                        Back to Login
                    </button>
                `;
        }
    }

    // Check if already logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        redirectToDashboard(currentUser.role);
    }
});