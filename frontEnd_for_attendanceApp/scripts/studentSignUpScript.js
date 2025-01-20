function togglePassword(){
    const passwordInputField=document.getElementById('password');
    const togglePasswordPasswordField=document.getElementById('togglePassword');


    if(passwordInputField.type === 'password'){
        passwordInputField.type = 'text';
        togglePasswordPasswordField.classList.remove('fa-eye');
        togglePasswordPasswordField.classList.add('fa-eye-slash');
    } else {
        passwordInputField.type = 'password';
        togglePasswordPasswordField.classList.remove('fa-eye-slash');
        togglePasswordPasswordField.classList.add('fa-eye');
    }
}

function toggleConfirmPassword(){
    const confirmpasswordInputField=document.getElementById('confirmpassword');
    const confirmtogglePasswordPasswordField=document.getElementById('toggleConfirmPassword')


    if(confirmpasswordInputField.type === 'password'){
        confirmpasswordInputField.type = 'text';
        confirmtogglePasswordPasswordField.classList.remove('fa-eye');
        confirmtogglePasswordPasswordField.classList.add('fa-eye-slash');
    } else {
        confirmpasswordInputField.type = 'password';
        confirmtogglePasswordPasswordField.classList.remove('fa-eye-slash');
        confirmtogglePasswordPasswordField.classList.add('fa-eye');
    }
}


document.getElementById('signupForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get form input values
    const firstname = document.getElementById('firstname').value.trim();
    const secondname = document.getElementById('secondname').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmpassword = document.getElementById('confirmpassword').value.trim();

    // Validate passwords match
    if (password !== confirmpassword) {
        showError('Passwords do not match.');
        return;
    }

    // Prepare signup data
    const signUpData = {
        firstName: firstname,
        secondName: secondname,
        contact: contact,
        email: email,
        password: password,
    };

    try {
        // Make API call
        const response = await fetch('http://localhost:8000/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signUpData),
        });

        if (!response.ok) throw new Error('Signup failed: ' + response.status);

        const data = await response.json();

        if (data.token) {
            // Store token securely (use sessionStorage or localStorage)
            localStorage.setItem('authToken', data.token);

            // Redirect to home page
            alert(data.data.message + ' Redirecting to homepage...');
            window.location.href = 'http://localhost:8000/user/studentHomePage';
        } else {
            showError('Signup failed: Token not received.');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('An error occurred during signup. Please try again later.');
    }
});

// Function to display an error message
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.textContent = message;
    }
}


