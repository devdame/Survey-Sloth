$(document).ready(function() {

  // $("#make_survey").on("submit", function(event) {
  //   event.preventDefault();

  //   $.ajax(url, ){
  //     type: "POST",
  //     url: '/',
  //     data: this.serialize(),
  //     dataType: "json"
  //     accept: "application/json"
  //     success: function(response){

  //     };
  //   };

  // });

  // $("#make_survey").on("submit", function(event) {
  //   function checkIfEnteredAll(){

  //   };

  // });

  function checkIfNull(field, errors){
    if(field === ""){
      errors.push("Whoah there, cowboy, gotta fill everything in!")
    };
  };

  function appendSurveyError(error){
      var ul = document.getElementById("survey_errors");
      var newLI = document.createElement("li");
      ul.appendChild(newLI);
      newLI.innerHTML = error
  };


  $("#enter_title").on("submit", function(event){
    event.preventDefault();
    var title = $("input[name='title']").val();
    var errors = [];
    checkIfNull(title, errors);
    if(errors.length != 0){
      errors.forEach(appendSurveyError);
    }
    else{
      $.ajax({
        type: "POST",
        url: "/create_survey",
        data: $(this).serialize(),
        dataType: "json",
        accepts: "application/json",
        success: function(response) {
          console.log(response);
          $("#survey_title").css("display", "block").text("Title: " + response.title);
          $("#title_options").css("display", "none");
          $("#survey_errors").text("");
          $("#question_options").css("display", "block");
          window.survey_id = response.id
        }
      });
    };
  });

  $("#enter_question").on("submit", function(event){
    console.log("yay I see a question being submitted");

    event.preventDefault;
    var text = $("input[name='text']").val();
    var errors = [];
    checkIfNull(text, errors);
    if(errors.length != 0){
      errors.forEach(appendSurveyError);
    }
    else{
      event.preventDefault;
      $(this).survey_id = 2;
      console.log(this);
      $.ajax({
        type: "POST",
        url: "/create_survey/question",
        data: $(this).serialize(),
        dataType: "json",
        accepts: "application/json",
        success: function(response) {
          console.log(response);
        }
      });
    };
  });



  // $("#add_response").on("click", function(event){

  // });
 
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

});
