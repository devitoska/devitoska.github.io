//quote script
// ajax get
$(document).ready(function(){
    url = "https://vitoscaraggi.it/quote\/"
    $.ajax({
    url: url,
    type: "GET",
    dataType: "json",
    success:  (data) => {
        $("#q_text").text("“" + data.quote + "”");
        $("#q_author").text("~ " + data.author);
    },
    error: function(e){
        $("#q_text").text("“Error in loading daily quote”");
        $("#q_author").text("~ Vito Scaraggi");
    }, 
    });
});