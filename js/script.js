

//get query string parameter
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}


Handlebars.registerHelper("formatName", function(property1){
  return new Handlebars.SafeString(
    "<strong>" + property1 + "</strong>"
  );
});

Handlebars.registerHelper("makeBold", function(options) {
  return new Handlebars.SafeString("<strong>" + options.fn(this) + "</strong>");
});

$(document).ready(function(){
  var characterTemplate = $("#character-template").html();
  var compiledCharacterTemplate = Handlebars.compile(characterTemplate);
  var characterList = $(".character-list-container");
  var characterId = getParameterByName("id");

  $.ajax("./character-details-partial.html").done(function(charDetailsPartial) {
    console.log(charDetailsPartial);
    $("body").append(charDetailsPartial);
    Handlebars.registerPartial("characterDetailsPartial", $("#character-details-partial").html());
  });
  
  $.ajax("./data/cast.json").done(function(cast) {
    console.log(cast);
    if ($("body").hasClass("page-cast-details")) {
      characterList.html(compiledCharacterTemplate(cast.characters[characterId]));
    } else {
      characterList.html(compiledCharacterTemplate(cast));
    }	
  });

});

