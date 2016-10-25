module.exports = (event, dispatch) => {
  let username = document.getElementById('username');
  let password = document.getElementById('password');
  let error = false;

  if(username.value === '') {
    username.parentNode.classList.add('has-error');
    console.error("Invalid Username");
    password.value = '';
    error = true;
  } else {
    username.parentNode.classList.add('has-success');
    username.parentNode.classList.remove('has-error');
  }
  if(password.value === '') {
    password.parentNode.classList.add('has-error');
    console.error('Invalid Password');
    error = true;
  } else {
    password.parentNode.classList.add('has-success');
    password.parentNode.classList.remove('has-error');
  }
  if(!error) {
    console.log(username.value+': '+password.value);
  }
}
