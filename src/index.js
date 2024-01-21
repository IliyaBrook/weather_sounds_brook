"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./styles.scss");
var loadSounds_1 = require("./functions/loadSounds");
var playSound_1 = require("./functions/playSound");
var volumeControl = document.getElementById('volume');
var soundsControlWrapper = document.querySelector('.soundsControlWrapper');
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
if (soundsControlWrapper) {
    soundsControlWrapper.addEventListener('click', function (e) {
        var target = e.target;
        if (target.nodeName === 'BUTTON') {
            var soundKey = target.dataset.soundKey;
            var bgImage = target.dataset.bgImage;
            if (soundKey && bgImage) {
                void (0, playSound_1.playSound)({ soundKey: soundKey, bgImage: bgImage, sounds: sounds, bg: background });
            }
        }
    });
}
