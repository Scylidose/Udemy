var i = 0;
// Tableau contenant les chemins vers les différentes pistes audio
var playlist = ["musique/Dragonball Super - Clash of Gods.mp3", "musique/Dragonball Super - Ultimate Battle Mash-up.mp3"];

/* CONTROLE */

/**
 * Fonction permettant de jouer la piste audio avant la piste actuelle par rapport à la playliste
 */
function back() {
    if (i === 0) {
        $("#player").attr("src", playlist[playlist.length - 1]);
        i = playlist.length - 1;
    } else {
        $("#player").attr("src", playlist[i - 1]);
        i = i - 1;
    }
    $("progress").attr("value", "0");
    $("audio")[0].play();
    jouer();
}


/** 
 * Fonction qui permet de remplacer le bouton 'play' par le bouton 'pause'
 */
function jouer() {
    $("#changement").replaceWith("<svg  xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='9px' height='10px' class=«pause» id='changement'><path fill-rule='evenodd'  fill='#CBCDCF' d='M4.000,10.000 L4.000,-0.000 L6.000,-0.000 L6.000,10.000 L4.000,10.000 ZM-0.000,-0.000 L2.000,-0.000 L2.000,10.000 L-0.000,10.000 L-0.000,-0.000 Z'/></svg>");
    $("#changement").attr("onclick", "document.getElementById('player').pause(); stop();");
}

/** 
 * Fonction qui permet de remplacer le bouton 'pause' par le bouton 'play'
 */
function stop() {
    $("#changement").replaceWith("<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='9px' height='10px' class=«play» id='changement' onclick='document.getElementById('player').play(); jouer();'> <path fill-rule='evenodd' fill='#CBCDCF' d='M-0.000,10.000 L9.004,4.998 L-0.000,-0.004 L-0.000,10.000 Z' /> </svg>");
    $("#changement").attr("onclick", "document.getElementById('player').play(); jouer();");
}

/**
 * Fonction permettant de jouer la prochaine piste audio par rapport à la playliste
 */
function forw() {
    if (i == playlist.length - 1) {
        $("#player").attr("src", playlist[0]);
        i = 0;
    } else {
        $("#player").attr("src", playlist[i + 1]);
        i = i + 1;
    }
    $("progress").attr("value", "0");
    $("audio")[0].play();
    jouer();
}

/* PROGRESSION */

//Permet de désigner la nouvelle valeur de la barre de progression lorsque l'on clique sur cette dernière
$("#seekbar").change(function (e) {
    var value = e.target.value;
    $("progress").val(value);
});


// Permet d'animer la barre de progression de la piste audio
setInterval(function () {
    $("progress").attr("value", ($("audio")[0].currentTime) * 100 / $("audio")[0].duration);
    $("#seekbar").click(function () {
        $("#player")[0].currentTime = $("progress").attr("value") * $("audio")[0].duration / 100;
    });
}, 10);

/* CONTROL-VOLUME */

/**
 * Fonction qui permet d'afficher ou de cacher le curseur modifiant le son de l'audio
 */
function afficher() {
    if ($("#vol-control").css("display") == "none") {
        $("#vol-control").css("display", "initial");
    } else {
        $("#vol-control").css("display", "none");
    }

}

/**
 * Fonction permettant de régler le volume de la piste audio et change
 * le logo du speaker par rapport à la valeur du volume
 * 
 * @param val valeur de la position du curseur qui déterminera la valeur du volume
 */
function SetVolume(val) {
    var player = document.getElementById("player");
    console.log("Before: " + player.volume);
    player.volume = val / 100;
    console.log("After: " + player.volume);

    if (player.volume <= 0.1) {
        $(".speaker-on").replaceWith("<svg xmlns = 'http://www.w3.org/2000/svg' xmlns: xlink = 'http://www.w3.org/1999/xlink' width = '16px' height = '12px' class='speaker-off' onclick='afficher();'> <path fill-rule='evenodd' fill='#CBCDCF' d='M16.000,8.105 L15.555,8.538 L13.603,6.641 L11.660,8.538 L11.215,8.105 L13.166,6.209 L11.215,4.320 L11.660,3.887 L13.603,5.784 L15.555,3.887 L16.000,4.320 L14.049,6.209 L16.000,8.105 ZM4.283,8.168 C4.194,8.081 4.032,8.018 3.911,8.018 C2.704,8.003 1.490,8.010 0.283,8.010 C0.194,8.010 0.105,8.010 -0.000,8.010 C-0.000,6.665 -0.000,5.343 -0.000,3.997 C0.097,3.997 0.178,3.997 0.267,3.997 C1.466,3.997 2.672,3.997 3.870,4.005 C4.057,4.005 4.178,3.950 4.308,3.824 C5.547,2.612 6.785,1.409 8.024,0.205 C8.081,0.149 8.130,0.071 8.194,-0.000 C8.211,0.008 8.227,0.024 8.243,0.031 C8.243,4.013 8.243,7.995 8.243,12.000 C8.162,11.921 8.097,11.866 8.040,11.811 C6.785,10.599 5.538,9.380 4.283,8.168 Z' /></svg >")
    } else {
        $(".speaker-off").replaceWith("<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='15px' height='12px' class='speaker-on' onclick='afficher();'> <path fill-rule='evenodd'  fill='#CBCDCF' d='M12.871,12.000 C12.695,11.878 12.511,11.749 12.350,11.635 C14.871,7.866 14.856,4.127 12.357,0.357 C12.519,0.251 12.695,0.122 12.871,0.000 C15.665,3.298 15.753,8.588 12.871,12.000 ZM10.931,10.381 C10.754,10.260 10.571,10.138 10.402,10.024 C12.195,7.341 12.188,4.674 10.409,1.968 C10.571,1.862 10.754,1.733 10.938,1.611 C13.041,4.043 13.085,7.911 10.931,10.381 ZM8.454,8.421 C9.519,6.809 9.527,5.206 8.454,3.579 C8.534,3.519 8.623,3.458 8.711,3.397 C8.799,3.336 8.895,3.276 8.990,3.215 C10.240,4.491 10.512,7.098 8.998,8.785 C8.821,8.664 8.637,8.542 8.454,8.421 ZM3.881,8.094 C3.800,8.010 3.661,7.949 3.543,7.949 C2.448,7.942 1.345,7.942 0.250,7.942 C0.176,7.942 0.096,7.942 0.000,7.942 C0.000,6.635 0.000,5.365 0.000,4.066 C0.088,4.066 0.162,4.066 0.243,4.066 C1.331,4.066 2.426,4.058 3.514,4.073 C3.683,4.073 3.793,4.020 3.911,3.899 C5.035,2.728 6.160,1.573 7.285,0.403 C7.344,0.342 7.380,0.274 7.432,0.205 C7.446,0.213 7.461,0.228 7.476,0.236 C7.476,4.081 7.476,7.927 7.476,11.795 C7.402,11.726 7.344,11.673 7.292,11.612 C6.160,10.434 5.021,9.264 3.881,8.094 Z'/></svg>")
    }
}
