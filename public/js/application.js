$(document).ready(function() {
 
  $("#sign_up").on("submit", function(event) {
 
    function checkLength(password) {
      if(password.length < 6) {
        errors.push("Your password must be at least 6 characters long.");
      };
    };

    function passwordMatch(password, password_confirmation) {
      if(password != password_confirmation) {
        errors.push("Your password must match the password confirmation");
      };
    };
 
    function appendError(error, index, array) {
      var ul = document.getElementById("error_time");
      var newLI = document.createElement("li");
      ul.appendChild(newLI);
      newLI.innerHTML = error
    }
 
 		var password = $("input[name='password']").val();
    var password_confirmation = $("input[name='password_confirmation']").val();
    var errors = [];
    checkLength(password);
    passwordMatch(password, password_confirmation);
    if(errors != []) {
    	event.preventDefault();
      errors.forEach(appendError);
    };
  });
});
