function userStatus(user) {
  if (user) {
    $('.user a').hide;
    $('.user span').html(user.displayName + ', ' + user.email);
  } else {
    $('.user a').show;
    $('.user span').html('');
  }
}

userStatus(firebase.auth().currentUser);
firebase.auth().onAuthStateChanged(function(user) {
  userStatus(user);
});
