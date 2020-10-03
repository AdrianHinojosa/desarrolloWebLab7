// <!-- ADRIÁN HINOJOSA -->

$(document).ready(function() {

    // Start your code from here
    let myAnimals = ['Lion', 'Tiger', 'Penguin', 'Crocodile', 'Giraffe', 'Snake', 'Cow', 'Hippo'];
    // Cargar
    loadAnimals();
    // Cargar botones de la lista
    function loadAnimals(){
        for(var i = 0; i < myAnimals.length; i++){
            $("#animals").append(`<button id="animal-filter" 
            value="${myAnimals[i]}">${myAnimals[i]} </button>`);
        }
    }
    
    // Al hacer clic agregar el animal o lo que se desee
    $("#animal-form").on("click", "#add-animal", function(e){
        e.preventDefault();
        $("#animals").html("");
        myAnimals.push($("#animal-input").val());
        loadAnimals();
    })
    
    $("#animals").on("click", "#animal-filter", function(ev) {
        ev.preventDefault();
        $("#animals").html("");
    
        $.ajax({
            url: `https://api.giphy.com/v1/gifs/search?q=${this.value}&api_key=qt0L6L2vHncZzpvxQW8WZllNsrKzqvnD&limit=10`,
            success: function(myData) {
                myData.data.forEach(myData => {
                    // ADD the container and add the class
                    var animalContainer = $(`<div id = "animal-container"></div>`);
                    // get the image
                    var myImg = $("<img>");
                myImg.attr("src", myData.images.fixed_height_still.url);
                myImg.attr("moves", myData.images.fixed_height.url);
                myImg.attr("still",myData.images.fixed_height_still.url);
                // ADD ATRRIBUTE  to know if moving
                myImg.attr("moves", "no");
                myImg.addClass("gif-item");
                //  Add the rating (PG G, R etc)
                    animalContainer.append(`<p> Rating: ${myData.rating}</p>`);
                animalContainer.append(myImg);
                  
                $("#animals").append(animalContainer);
                });
            },
            //  check errors
        error: function() {
                console.log("Hubo un error.");
            }
        });
    })
    //  Si le pican traer los elementos y mover el acomodo
    $("body").on("click",".animal-item", function(event){
    
        var enMovimiento = $(this).attr("moves");
    
        if( enMovimiento === "no") {
            //  set to yes
            $(this).attr("src", $(this).attr("moves"));
            $(this).attr("moves", "si");
        } else {
            // set to NO
            $(this).attr("src", $(this).attr("still"));
            $(this).attr("moves", "no");
        }
    })
    
});
    