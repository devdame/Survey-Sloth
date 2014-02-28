$(document).ready(function() {
<<<<<<< HEAD
  console.log("JS ready!");

	$(element).thing(function(){
		$(this).anotherthing();
	}

	$(another_element).on('click', function(event){
		event.preventDefault();

		var url = ???

		$.post(url, function(response){
			data = JSON.parse(response);
			$(thing_to_replace).function(response)
			});
	}
=======
 
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
    if(errors.length != 0) {
    	event.preventDefault();
      errors.forEach(appendError);
    };
  });

 //  +	$(element).thing(function(){
 // +		$(this).anotherthing();
 // +	}
 // +
 // +	$(another_element).on('click', function(event){
 // +		event.preventDefault();
 // +
 // +		var url = ???
 // +
 // +		$.post(url, function(response){
 // +			data = JSON.parse(response);
 // +			$(thing_to_replace).function(response)
 // +			});
 // +	}

>>>>>>> c3c249b80fb8c8869921300decc61848099335a1
});
