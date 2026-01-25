let comicData = undefined;
let slideIndex = 0;

// check if current page is webcomic.html
$(document).ready(async function(){
  await $.ajax({
    url: "https://vitoscaraggi.it/webcomic/all",
    method: "GET",
    dataType: "json",
    success: function(data) {
      comicData = data;
      // Show the last comic by default
      slideIndex = comicData.length - 1;
      showSlides(slideIndex);
    },
    error: function() {
      console.error("Failed to fetch comic title and caption.");
    }
  });
});

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  
  // Wrap around logic
  if (n == comicData.length) {
    slideIndex = 0;
  }
  if (n < 0) {
    slideIndex = comicData.length - 1;
  }
  
  // Update title and caption
  $(".comic_title").text("#" + comicData[slideIndex].id + " " + comicData[slideIndex].title);
  $(".comic_caption").text(comicData[slideIndex].caption);
  // Update date and convert to format "DD Month YYYY"
  let dateObj = new Date(comicData[slideIndex].date);
  // Month should be in short text format
  let options = {year: 'numeric', month: 'short', day: 'numeric' };
  $(".comic_date").text(dateObj.toLocaleDateString(undefined, options));
  // Update references
  
  let referencesHtml = "";
  // check if refs is a property of the comicData object
  if (comicData[slideIndex].hasOwnProperty("refs")) {
    let refs = comicData[slideIndex].refs;
    for (let i = 0; i < refs.length; i++) {
      let ref = refs[i].trim();
      if (ref.length > 0) {
        // check if ref is a valid URL
        try {
          new URL(ref);
          // If valid URL, make it a clickable link
          referencesHtml += '<br>[' + (i+1) + '] <a href="' + ref + '" target="_blank">' + ref + '</a>';
        } catch (_) {
          // If not a valid URL, just display the text
          referencesHtml += '<br>[' + (i+1) + '] ' + ref;
        }  
      }
    }
  }

  if (referencesHtml.length > 0) {
    referencesHtml = "References: " + referencesHtml;
  }
  $(".comic_refs").html(referencesHtml);

  // Update image source
  $("#current_comic img").attr("src", comicData[slideIndex].image_url);
}
