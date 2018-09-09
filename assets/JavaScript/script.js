$(document).ready(function(){

var q = "cheese";
var recordNum = 5;
var startYear = 2012;
var endYear = 2018;

var pageNum= Math.ceil(recordNum/10);


var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "ba94153be5714a3fbd0b2d81410657ba",
  'q':  q,
  'begin_date': startYear + "0101",
  'end_date': endYear + "1231",
  'page': 1
});



$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  console.log(result);

  var res = result.response.docs

  for(var i = 0; i < recordNum; i++){

  $("#searchResults").append(
  
    "<br> <div> Headline: " + res[i].headline.main +

    "<br> Snippit: " + res[i].snippet +

    "<br> Link: <a target='_blank' href=" + res[i].web_url + ">" + res[i].web_url + "</a> </div>" 

    // "<br><img src=" + res[i].multimedia.url + ">"

)

  };


}).fail(function(err) {
  throw err;
});

});