const form = document.getElementById('form')
const firstname_input = document.getElementById('firstname-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const repeat_password_input = document.getElementById('repeat-password-input')
const error_message = document.getElementById('error-message')

form.addEventListener('submit', (e) => {
  let errors = []
  if (firstname_input) {
    // If we have a firstname input, we are in the signup process
    errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, repeat_password_input.value);
    if (errors.length === 0) {
        // Retrieve existing users from localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if the user already exists
        let userExists = users.find(user => user.email === email_input.value);
        if (!userExists) {
            // If no errors and user doesn't exist, store user data in localStorage
            users.push({
                firstname: firstname_input.value,
                email: email_input.value,
                password: password_input.value // In a real application, never store plaintext passwords
            });
            localStorage.setItem('users', JSON.stringify(users));
            window.location.href='login.html'
            alert('User signed up successfully!');
           
        } else {
            alert('User already exists. Please log in.');
        }
    } else {
        alert(errors.join("\n"));
    }
} 

else {
    // If we don't have a firstname input, then we are in the login
    errors = getLoginFormErrors(email_input.value, password_input.value);
    
    if (errors.length === 0) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let user = users.find(user => user.email === email_input.value && user.password === password_input.value);
        
        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            window.location.href = 'music.html';
          
            alert('Login successful!');
            // Redirect to the music page
        } 
        
        else {
            alert('Invalid email or password.');
        }
    } else {
        // Show errors to the user
        errors.forEach(error => alert(error));
    }
    
}


  if(errors.length > 0){
    // If there are any errors
    e.preventDefault()
    error_message.innerText  = errors.join(". ")
  }
  
})


function getSignupFormErrors(firstname, email, password, repeatPassword){
  let errors = []
  const emailRegex = /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(firstname === '' || firstname == null){
    errors.push('Firstname is required')
    firstname_input.parentElement.classList.add('incorrect')
  }
  if(!emailRegex.test(email) || email===''){
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if(password === '' || password == null){
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }
  if(password.length < 8){
    errors.push('Password must have at least 8 characters')
    password_input.parentElement.classList.add('incorrect')
  }
  if(password !== repeatPassword){
    errors.push('Password does not match repeated password')
    password_input.parentElement.classList.add('incorrect')
    repeat_password_input.parentElement.classList.add('incorrect')
 
}


  return errors;
}
function getLoginFormErrors(email, password) {
    let errors = [];
    
    // Retrieve stored user data
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let storedUser = users.find(user => user.email === email);
    let storedPassword=users.find(user => user.password === password);
    
    // Check if email and password are valid
  
    if (!storedUser) {
        errors.push('Email is not registered.');
        email_input.parentElement.classList.add('incorrect');
    } else {
        if (!storedPassword) {
            errors.push('Password does not match');
            password_input.parentElement.classList.add('incorrect');
        }
    }

    return errors;
}
const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null)

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if(input.parentElement.classList.contains('incorrect')){
      input.parentElement.classList.remove('incorrect')
      error_message.innerText = ''
    }
  })
})
