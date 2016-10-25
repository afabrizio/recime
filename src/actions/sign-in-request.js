module.exports = (event, dispatch) => {
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let error = false;

  if(username === '') {
    console.error("Invalid Username");
    password = '';
    error = true;
  }
  if(password === '') {
    console.error('Invalid Password');
    username = '';
    error = true;
  }
  if(!error) {
    console.log(username+': '+password);
  }
}
