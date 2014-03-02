$(document).ready(function () {
  $( "a" ).click(function() {
    // var hide_href = $(this).attr('href');
    var active_ref = $(".active").children().attr("href")
    $( ".active" ).removeClass("active");
    $(this).parent().addClass("active");
    var show_href = $(this).attr("href");
 
    $(".tab").hide();
    $(show_href).show();
    console.log('here');
  });
});