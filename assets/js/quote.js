//quote script
// ajax get
$(document).ready(async function(){
    url = "https://site.vitoscaraggi.com/quote"
    await $.ajax({
    url: url,
    type: "GET",
    dataType: "json",
    success:  async (data) => {
        $("#q_text").text("“" + data.quote + "”");
        $("#q_author").text("~ " + data.author);
        // remove parenthesis and their content from author string
        author = data.author.replace(/\s*\(.*?\)\s*/g, "");
        img_api_url = "https://openlibrary.org/search/authors.json?q=" + author
        await $.ajax({
            url: img_api_url,
            type: "GET",
            dataType: "json",
            success:  (data) => {
                if (data.docs[0] && data.docs[0].key){
                    olid = data.docs[0].key;
                    img_url = "https://covers.openlibrary.org/a/olid/" + olid + "-M.jpg";
                    $("#q_author_img").attr("src", img_url);
                } else {
                    $("#q_author_img").attr("src", "https://site.vitoscaraggi.com/images/author_not_found.jpg");
                }
            },
            error: function(e){
                $("#q_author_img").attr("src", "https://site.vitoscaraggi.com/images/author_not_found.jpg");
            }, 
        });
    },
    error: function(e){
        $("#q_author_img").attr("src", "https://site.vitoscaraggi.com/images/profile.jpg");
        $("#q_text").text("“Error in loading daily quote”");
        $("#q_author").text("~ Vito Scaraggi");
    }, 
    });
});