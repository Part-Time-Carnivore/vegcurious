function userState(user) {
    if (user) {
        $(".user a").hide();
        $(".user span").html(user.displayName);
    } else {
        $(".user a").show();
        $(".user span").html("");
    }
}

userState(firebase.auth().currentUser);
firebase.auth().onAuthStateChanged(function(user) {
    userState(user);
});
