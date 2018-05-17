$(document).ready(function() {
    $('.navbar a').on('click', function() { // Au clic sur un élément
        var page = $(this).attr('href'); // Page cible
        $('html, body').animate({ 
            scrollTop: $(page).offset().top 
        }, 900);
        return false;
    });

    $("#1").hover(function(){
        change(1);
    });
    $("#2").hover(function(){
        change(2); 
    });
    $("#3").hover(function(){
        change(3); 
    });
    $("#4").hover(function(){
        change(4); 
    });
    $("#5").hover(function(){
        change(5); 
    });
    $("#6").hover(function(){
        change(6);
    });

    $("#1o").hover(function(){
        changeOth(1);
    });
    $("#2o").hover(function(){
        changeOth(2); 
    });
    $("#3o").hover(function(){
        changeOth(3); 
    });
    $("#4o").hover(function(){
        changeOth(4); 
    });
    $("#5o").hover(function(){
        changeOth(5); 
    });
    $("#6o").hover(function(){
        changeOth(6);
    });
});

function change(number){
    if($('#' + number).attr('src') == "images/bw/me" + number + ".png"){
        $("#" + number).attr("src","images/color/me" + number + ".png");
    } else {
        $("#" + number).attr("src","images/bw/me" + number + ".png");
    }
}

function changeOth(number){
    if($('#' + number + "o").attr('src') == "images/bw/oth" + number + ".png"){
        $("#" + number + "o").attr("src","images/color/oth" + number + ".png");
    } else {
        $("#" + number + "o").attr("src","images/bw/oth" + number + ".png");
    }
}

function visibilite(id) {
    //Méthode pour afficher ou cacher l'élément avec l'id passé en paramètre
    var elem = document.getElementById(id);

    if(elem.style.display == 'block'){
        elem.style.display = 'none';
    } else{
        elem.style.display = 'block';
    }
}

function ajout(){
    var url = document.getElementById("url").value;
    
    var divCol = $("<div></div", {"class": "col-md-4"});
    var divThumb = $("<div></div>", {"class": "thumbnail"});

    if(url != ""){
        var img = $("<img></img>", {"src": url});
        $("#myPhotos").append(divCol);
        $(divCol).append(divThumb);
        $(divThumb).append(img);
    }

    visibilite('add');
}