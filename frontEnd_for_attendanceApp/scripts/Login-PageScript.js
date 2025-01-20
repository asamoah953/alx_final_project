function togglePassword(){
    const passwordField=document.getElementById('password');
    const toggleField = document.getElementById('togglePassword');

    if(passwordField.type === 'password'){
        passwordField.type = 'text';
        toggleField.classList.remove('fa-eye');
        toggleField.classList.add('fa-eye-slash')
    } else {
        passwordField.type = 'password';
        toggleField.classList.remove('fa-eye-slash');
        toggleField.classList.add('fa-eye')
    }
}



document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form input values
    const email = document.getElementById('email-contact').value.trim();
    const password = document.getElementById('password').value.trim()
    

   

    // Prepare signup data
    const loginData = {
        email: email,
        password: password,
    };

    // Make API call
    fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    })
        .then((response) => {
            if (response.ok) {
                alert(' Redirecting to homepage...');
                window.location.href = 'http://localhost:8000/user/studentHomePage';
                //throw new Error('login failed with status: ' + response.status);
            }
            return response.json();
        })
        .then((response) => {
            if(!response.ok){
                throw Error("opss!! something went wrong, retry")
            }
        }).then((data => {
            if(data.data.success){
                alert("redirecting to the homepage.....")
                window.location.href= 'http://localhost/user/studentHomePage'
            }
        }))
        .catch((error) => {
            if(!data.data.success){
                showError('An error occurred during signup. Please try again later.');
            }
        });
});

// Function to display an error message
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.textContent = message;
    }
}

