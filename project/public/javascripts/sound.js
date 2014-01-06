function init_sound() {
    // if initializeDefaultPlugins returns false, we cannot play sound
    if (!createjs.Sound.initializeDefaultPlugins()) { alert("Error with sounds module loading..."); return;}

    var audioPath = "sounds/";
    var manifest = [
    // Circle
    {id:"bad_c", src:"213.mp3"},
    {id:"good_c", src:"8459.mp3"},
    // Triangle
    {id:"bad_t", src:"Bad_banjo.mp3"},
    {id:"good_t", src:"Good_banjo.mp3"},
    //Square
    {id:"bad_s", src:"Bad_bass.mp3"},
    {id:"good_s", src:"Good_bass.mp3"},
    // Polygon
    {id:"bad_p", src:"Bad_drum.mp3"},
    {id:"good_p", src:"Good_drum.mp3"}
    ];

    createjs.Sound.registerManifest(manifest, audioPath);
}

init_sound();
