function init_sound() {
    // if initializeDefaultPlugins returns false, we cannot play sound
    if (!createjs.Sound.initializeDefaultPlugins()) { alert("Error with sounds module loading..."); return;}

    var audioPath = "sounds/";
    var manifest = [
    {id:"bad", src:"213.mp3"},
    {id:"good", src:"8459.mp3"}
    ];

    createjs.Sound.registerManifest(manifest, audioPath);
}

init_sound();
