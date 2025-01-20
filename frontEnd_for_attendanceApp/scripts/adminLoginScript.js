function togglePassword(){
   const passwordInputField=document.getElementById('password-group');
   const togglePasswordField=document.getElementById('togglePassword');

   if(passwordInputField.type === 'password'){
    passwordInputField.type = 'text',
    togglePasswordField.classList.remove('fa-eye'),
    togglePasswordField.classList.add('fa-eye-slash')
   } else{
    passwordInputField.type = 'password',
    togglePasswordField.classList.remove('fa-eye-slash'),
    togglePasswordField.classList.add('fa-eye')
   }

}


document.getElementById('loginForm').addEventListener('submit',function(e){
   e.preventDefault();


   const email=document.getElementById('text-group').value;
   const password=document.getElementById('password-group').value;

   const logIndata={
      email:email,
      password:password
   }

   fetch('http://localhost:8000/admin/login', {
      method:'POST',
      headers:{
         "Content-Type":"application/json"
      },
      body:JSON.stringify(logIndata)
   })
   .then(response=>{
      if(!response.ok){
         throw new Error('Login failed: ' + response.statusText);

      }
      return response.json()
   })
   .then(data=>{
      if(data.success){
         alert('are you sure you want to log in?');
         window.location.href='http://localhost:8000/admin/adminhomePage';

      } else {
            // Display an error message
            showError('Login failed: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showError('An error occurred during login.');
    });
});

// Function to display an error message in red
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message; // Set the error message text
}



