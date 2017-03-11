firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $('.user').html(user.displayName + ', ' + user.email);
  } else {
    $('user').html('Log in');
  }
});