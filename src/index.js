"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./styles.scss");
var loadSounds_1 = require("./functions/loadSounds");
var playSound_1 = require("./functions/playSound");
var volumeControl = document.getElementById('volume');
var sounds = {};
var background = document.getElementById('background');
background.style.backgroundImage = "url(".concat(require("./assets/images/summer-bg.jpg"), ")");
window.addEventListener('load', function () {
    (0, loadSounds_1.loadSounds)(sounds).catch(function (e) { return console.error('Failed to load sounds:', e); });
});
volumeControl.addEventListener('input', function (e) {
    var volume = e.target.value;
    Object.values(sounds).forEach(function (audio) {
        audio.volume = parseFloat(volume);
    });
});
document.getElementById('playSummer').addEventListener('click', function () { return (0, playSound_1.playSound)({ soundKey: 'summer', bgImage: 'summer-bg.jpg', sounds: sounds, bg: background }); });
document.getElementById('playWinter').addEventListener('click', function () { return (0, playSound_1.playSound)({ soundKey: 'winter', bgImage: 'winter-bg.jpg', sounds: sounds, bg: background }); });
document.getElementById('playRain').addEventListener('click', function () { return (0, playSound_1.playSound)({ soundKey: 'rain', bgImage: 'rainy-bg.jpg', sounds: sounds, bg: background }); });
