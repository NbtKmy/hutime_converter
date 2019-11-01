function ons() {
    var searchText = $('#search-text').val();
    const str =  document.getElementById("time_form").value;
    var juli_tru = document.getElementById("julian").checked;

     localStorage.setItem('searchTerm', JSON.stringify({t1:searchText, t2:str, t3:juli_tru}));
}

addEventListener('load', function() {
    var searchTerm = localStorage.getItem('searchTerm');
    if (searchTerm) {
       var obj = JSON.parse(searchTerm);
       var searchText = obj.t1;
       var str = obj.t2;
       var juliOr = obj.t3;
       var apiPart1,
       apiPart2;


   //Making URL for HuTime-API
      apiPart1 = "http://ap.hutime.org/cal/?method=conv&ical=1001.1&itype=date&ival=";


   if (str == "year") {
     apiYear = apiPart1.replace('date', 'year');
     apiPart1 = apiYear.slice(0, 38) + "ep=be&otype=date&" + apiYear.slice(38);
   }
  else if (str == "month") {
      apiYear = apiPart1.replace('date', 'month');
      apiPart1 = apiYear.slice(0, 38) + "ep=be&otype=date&" + apiYear.slice(38);
    }
  else if (str == "era") {
     apiYear = apiPart1.replace('date', 'era');
     apiPart1 = apiYear.slice(0, 38) + "ep=be&otype=date&" + apiYear.slice(38);
   }
  else {
     apiPart1 = "http://ap.hutime.org/cal/?method=conv&ical=1001.1&itype=date&ival=";
   }

   if (juliOr) {
      apiPart2 = "&ocal=102.1";
   }
   else{
      apiPart2 = "&ocal=2.1";
   }

   //Empty the result
   $('#search-result').empty();

   //Are there any text in the box? - if yes...
   if (searchText != '') {

    var apiFullLink = apiPart1 + searchText + apiPart2;
    console.log(apiFullLink);
    fetch(apiFullLink)
    .then(function(response) {
    return response.text();
    })
    .then(function(searchResult) {

    var nr = searchResult.lastIndexOf("C.E.");
    var yearBeginn = searchResult.slice(0,nr-1);
    var yearEnd = searchResult.slice(nr);

    if (nr > 4) {
    searchResult = "From　" + yearBeginn + "　to　" + yearEnd;
    }
    //Put the result in div
    if (juliOr) {
    $('<span>').html(searchText +" according to the Julian calendar:" + "<br>" + searchResult).appendTo('#search-result');
    }
   else {
     $('<span>').html(searchText +" according to the Gregorian calendar:" + "<br>" + searchResult).appendTo('#search-result');
    }
   });
    }
    else{
     alert('Please put a search word!');
    }

}
}, false);
