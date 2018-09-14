$(document).ready(function () {

  $("#search-button").on("click", function () {

    $("#searchResults").empty();

    var searchTerm = $("#searchText").val();
    var recordNum = $("#numRecords").val();
    var startYear = $("#startYear").val();
    var endYear = $("#endYear").val();

    var pageNum = Math.ceil(recordNum / 10);
    var count = 0;


    console.log($("#searchText").val());
    console.log($("#startYear").val());
    console.log($("#endYear").val());
    console.log($("#numRecords").val());
    console.log(pageNum);

    function sYear() {
      if ($("#startYear").val() === "") {
        startYear = "1991";
      }
    }

    sYear();

    function eYear() {
      if ($("#endYear").val() === "") {
        endYear = "2018";
      }
    }

    eYear();

    console.log(startYear);
    console.log(endYear);

    $("#searchText").val("");
    $("#startYear").val("");
    $("#endYear").val("");

    for (var i = 0; i < pageNum; i++) {
      var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
      url += '?' + $.param({
        'api-key': "29d76fe43ea8461e9ce391c77e04cfc4",
        'q': searchTerm,
        'begin_date': startYear + "0101",
        'end_date': endYear + "1231",
        'page': i
      });

      $.ajax({
        url: url,
        method: 'GET',
      }).done(function (result) {
        console.log(result);

        var res = result.response.docs

        for (var j = 0; j <= 10; j++) {

          count++

          $("#searchResults").append(

            "<br> <a id='entryBlock' target='_blank'href=" + res[j].web_url + "><div id='entry' class='p-2 rounded' href=" + res[j].web_url + ">" +

            "<br> <h2 id='entryHead'>" + res[j].headline.main + "</h2>" +

            "<br> <p class='entryBody'> Date: " + res[j].pub_date.substring(0, res[j].pub_date.indexOf('T')) + "</p>" +

            "<br> <p class='entryBody'>" + res[j].snippet + "</p></div></a>" +

            "<hr>"
          )

        };


      }).fail(function (err) {
        throw err;
      });
    };

    //Put into an anchor tag
    $("#entryBlock").on("click", function () {
      console.log("got clicked");
      // window.location = $(this).find("a").attr("href"); 
      window.open("https://www.google.com/");
      // window.open($(this).attr("href"), '_blank');
    });



  });

  $("#clear-button").on("click", function () {
    $("#searchResults").empty();
  })


  $(".clicked").on("click", function () {
    console.log("clicked");
    var newClick = $(".main").attr("data-status");
    console.log(newClick);

    if (newClick === "open") {
      $(".main").css("width", "100%");
      $(".main").attr("data-status", "closed");
      console.log( $(".main").attr("data-status"));
    }
    else {
      $(".main").css("width", "85%");
      $(".main").css("float", "right");

      $(".main").attr("data-status", "open");
      console.log( $(".main").attr("data-status"));
    }
  })
});