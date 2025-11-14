let comicData = undefined;
let slideIndex = 0;

// check if current page is webcomic.html
$(document).ready(async function(){
  await $.ajax({
    url: "https://webcomic.scaraggiv.workers.dev/",
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
  // Update image source
  $("#current_comic img").attr("src", comicData[slideIndex].image_url);
}