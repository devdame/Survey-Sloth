$(document).ready(function() {
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
});
