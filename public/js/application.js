$(document).ready(function() {
  window.survey_id = 0;
  window.question_id = 0;
  window.response_count = 3;
  window.button_pressed = "";

  function checkIfNull(field, errors){ // records an error if they didn't fill in the field
    if(field === ""){
      errors.push("Whoah there, cowboy, gotta fill everything in!")
    };
  };

  function appendSurveyError(error){ // shows any errors on the survey creation page to the user
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
          $("#survey_title").css("display", "block").text("Title: " + response.title);
          $("#title_options").css("display", "none");
          $("#survey_errors").text("");
          $("#question_options").css("display", "block");
          window.survey_id = response.id;
        }
      });
    };
  });

  $("#enter_question").on("submit", function(event){
    console.log("yay I see a question being submitted");

    event.preventDefault();
    var text = $("input[name='text']").val();
    var errors = [];
    checkIfNull(text, errors);
    if(errors.length != 0){
      errors.forEach(appendSurveyError);
    }
    else{
      $("input[name='survey_id']").val(window.survey_id)
      $.ajax({
        type: "POST",
        url: "/create_survey/question",
        data: $(this).serialize(),
        dataType: "json",
        accepts: "application/json",
        success: function(response) {
          $("#finished_questions").append("<h3>" + response.text + "</h3><ul id='" + response.id + "'></ul>")
          $("#question_options").css("display", "none");
          $("#response_options").css("display", "block");
          document.getElementById("enter_question").reset();
          window.question_id = response.id;
        }
      });
    };
  });

  $("#submit_survey").on("click", function(event){
    window.button_pressed = "submit survey"
  });

  $("#add_another_response").on("click", function(event){
    event.preventDefault();
    $("#extra_responses").append("<input type='text' class='response_field' name='response" + window.response_count++ + "'>");
  });

  $("#enter_responses").on("submit", function(event){
    event.preventDefault();
    $("input[name='question_id']").val(window.question_id)
      $.ajax({
        type: "POST",
        url: "/create_survey/response",
        data: $(this).serialize(),
        dataType: "json",
        accepts: "application/json",
        success: function(response) {
          $("#question_options").css("display", "block");
          $("#response_options").css("display", "none");
          response.forEach(function(object){
          $("#" + window.question_id).append("<li>" + object.text +"</li>");
          document.getElementById("enter_responses").reset();
          $("#extra_responses").empty();
          });
        }
      });
    if(window.button_pressed == "submit survey"){
      window.location.href = "/homepage";
    }
  });





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

// --------- Survey Edit -------------
var successColor = "#99FF99"
var transitionSpeed = "slow"

$(".update-name-button").click(function(event){
  var buttonElementId = $(this).attr('value');
  var surveyTitle = $( "#survey-name" ).val();
    $.ajax({
      type: "POST",
      url: "/update_survey_title/" + buttonElementId,
      data: {title: surveyTitle},
    }).done(function() {
      $( "#survey-name" ).animate({backgroundColor: successColor }, transitionSpeed);
    });
});

$(".update-response-button").click(function(event){
  var buttonElementId = $(this).attr('value');
  console.log(buttonElementId);
  var fieldSelector = "#response-text-" + buttonElementId
  var responseText = $( fieldSelector ).val();
  $.ajax({
      type: "POST",
      url: "/update_response_text/" + buttonElementId,
      data: {text: responseText},
    }).done(function() {
      $( "#response-text-" + buttonElementId ).animate({backgroundColor: successColor }, transitionSpeed);
    });
});

$(".delete-response-button").click(function(event){
  var buttonElementId = $(this).attr('value');
  console.log(buttonElementId);
  $.ajax({
    type: "POST",
    url: "/delete_response/" + buttonElementId,
    data: {id: buttonElementId},
  }).done(function() {
    $( event.target ).closest( "li" ).slideUp(transitionSpeed);
  });

});

$(".update-question-button").click(function(event){
  var buttonElementId = $(this).attr('value');
  var fieldSelector = "#question-text-" + buttonElementId
  var questionText = $( fieldSelector ).val();
    $.ajax({
      type: "POST",
      url: "/update_question_text/" + buttonElementId,
      data: {text: questionText},
    }).done(function() {
      $( "#question-text-" + buttonElementId ).animate({backgroundColor: successColor }, transitionSpeed);
    });
});

$(".delete-question-button").click(function(event){
  var buttonElementId = $(this).attr('value');
  console.log(buttonElementId);
    $.ajax({
    type: "POST",
    url: "/delete_question/" + buttonElementId,
    data: {id: buttonElementId},
  }).done(function() {
    $( event.target ).closest( "#question-group" ).slideUp(transitionSpeed);
  });
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
