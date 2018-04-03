$(document).ready(function() {
    var appKey = "AIzaSyBTaTIP0pf27QBpsg3ofYZcc3ZLhv1RMeU";
    var queryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";

    var keyword = "";
    var zipcode = "";
    var zipDB = "";
    var location = "";      //latitude,longitude
    var radius = "";
    var minprice = "";
    var maxprice = "";

    $("#submit").click(function(event) {

        event.preventDefault();
        $("#query-result").empty();

        //location (required)
        zipcode = $("#zipcode").val().trim();

        function getZipDB() {
            var value = $.ajax({
                url: 'assets/db/codes.json',
                async: false,
            }).responseText;
            return value;
        }

        if (zipcode.length == 5 && Number.isInteger(parseInt(zipcode))){
            zipDB = JSON.parse(getZipDB());
            location = zipDB[zipcode].latitude + ',' + zipDB[zipcode].longitude;
            //queryURL = queryURL + "location=" + location;
            queryURL += "location=" + location;
        } else {
            alert("Please only input a valid zipcode.");
        }
        

        // radius (required)
        radius = parseInt($("#radius").val().trim()) * 1609.344; //convert miles into meters

        var radius_string = radius.toString();
        queryURL += "&radius=" + radius_string; 
        
        // type = restaurant
        queryURL += "&type=restaurant"; 

        // keyword (optional)
        keyword = $("#keyword").val().trim();
        if (keyword) {
            queryURL += "&keyword=" + keyword;
        }

        //min price and max price
        minprice = $("#minPrice").val();
        maxprice = $("#maxPrice").val();
        if (minprice) {
            queryURL += "&minprice=" + minprice; 
        }
        
        if (maxprice) {
            queryURL += "&maxprice=" + maxprice;
        }

        //open now
        var n = $("input:checked").length;
        if(n==1) {
            queryURL += "&opennow"
        }

        //api key
        queryURL += "&key=" + appKey;
        console.log(queryURL);

        //test url
        //queryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.7718,-84.3757&radius=8046.72&type=restaurant&keyword=hamburger&minprice=2&maxprice=4&opennow&key=AIzaSyBTaTIP0pf27QBpsg3ofYZcc3ZLhv1RMeU";

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(result){
            console.log(result);
            //todo
        })
         
    });

             // DOM modifiers
             print(result);

        
        
        function print(result){
        // console.log(docsdisplayed);
        var searchResult = "";
        for (var i=0; i< 10; i++){
            results += "<a class='m-1 p-1 text-primary' href=" + result.response.docs[i].web_url + ">" +
                        "<p><b>" + result.response.docs[i].name + "</b> <br>" +
                         result.response.docs[i].vicinity + "<br>" +
                        "rating: " + result.response.docs[i].rating + "</p></a><br>" ;      
        }
    
        $("#results").html(searchResult);
        }
    
    
    
})