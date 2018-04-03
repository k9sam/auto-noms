$(document).ready(function() {
    var appID = "9e9091d6";
    var appKey = "8b537d394573e519094a3e3565ef8867";
    var keyword = "" ;
    var diet = "";             
    var health = "";
    var minTime = "";              
    var maxTime = "";
    var cookTime = "";            // cooking time
    var excluded = "";          // excluded            
    //var from = "" ;           // first result index
    //var to = "";              // last reuslt index, default = 10
    //var calories = "" ;       // 000-000 integer form



    $("#submit").click(function() {

        $("#results").empty();

        keyword = $("#keyword").val().trim();
        health = $("#health").val();
        diet = $("#diet").val();
        excluded = $("#excluded").val().trim();
        minTime = $("#minTime").val();
        maxTime = $("#maxTime").val();

        if ( (minTime == "") && (maxTime == "")) {
            cookTime = "" 
            console.log(cookTime);
        } else if (maxTime && (minTime == "") ) {
            cookTime = maxTime;
            console.log(cookTime);
        } else if ( minTime && (maxTime == "") ) {
            cookTime = minTime + "+" ;
            console.log(cookTime);
        } else {
            cookTime = minTime + "-" + maxTime ;
            console.log(cookTime);
        }



        var queryURL = "https://api.edamam.com/search?q=" + keyword 
                    + "&app_id=" + appID
                    + "&app_key=" + appKey;

        if (health) {
            queryURL = queryURL + "&health=" + health;
        }

        if (diet) {
            queryURL = queryURL + "&diet=" + diet;
        }

        if (excluded) {
            queryURL = queryURL + "&excluded=" + excluded;
        }

        if (cookTime) {
            queryURL = queryURL + "&time=" + cookTime;
        }

        // displays the constructed url
        console.log(queryURL); 
        // If you are using Chrome, you have to disable 'access-control-allow-origin' 
        // or install (https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en-US)

        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(result) {
            console.log(result);
            var recipe = "";
            var recipe_container = "";
            
            for (var i=0; i < 10; i++) {
                
                recipe = $("<a>");
                recipe.attr("href",result.hits[i].recipe.url);
                
                //image
                var image = $("<img>");
                image.attr("align","left");
                image.attr("style","width:200px; height:200px; margin-right:30px;");
                image.attr("src", result.hits[i].recipe.image);
                recipe.append(image);

                //text
                //title
                recipe.append("<b>" + result.hits[i].recipe.label + "</b><br>");
                //ingredient
                var ingre = result.hits[i].recipe.ingredientLines;
                var ingre_text = $("<ul>");
                for (var j=0; j<ingre.length; j++){
                    ingre_text.append("<li>" + ingre[j] + "</li>");
                }

                recipe.append(ingre_text);

                recipe_container = $("<div>");
                recipe_container.addClass("container m-1");
                recipe_container.append(recipe);

                $("#results").append(recipe_container);  
                recipe = "";
                recipe_container = "";
                   
            }
            

        });


        //initialize
        $("#keyword").val() = "";
        $("#excluded").val() = "";
        $("#timeMin").val()  = "";
        $("#timeMax").val()  = "";

    });

})