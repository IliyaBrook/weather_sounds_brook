import './styles.scss';
import {TSounds} from "./types/types";
import {loadSounds} from "./functions/loadSounds";
import {playSound} from "./functions/playSound";


const volumeControl = document.getElementById('volume') as HTMLInputElement;


const sounds: TSounds = {};
const background = document.getElementById('background') as HTMLDivElement;
background.style.backgroundImage = `url(${require(`./assets/images/summer-bg.jpg`)})`;

window.addEventListener('load', () => {
    loadSounds(sounds).catch(e => console.error('Failed to load sounds:', e));
});


volumeControl.addEventListener('input', (e) => {
    const volume = (e.target as HTMLInputElement).value;
    Object.values(sounds).forEach((audio) => {
        audio.volume = parseFloat(volume);
    });
});

document.getElementById('playSummer')!.addEventListener('click', () => playSound({soundKey: 'summer', bgImage:'summer-bg.jpg', sounds: sounds, bg: background }));
document.getElementById('playWinter')!.addEventListener('click', () => playSound({soundKey: 'winter', bgImage:'winter-bg.jpg', sounds: sounds, bg: background }));
document.getElementById('playRain')!.addEventListener('click', () => playSound({soundKey: 'rain', bgImage:'rainy-bg.jpg', sounds: sounds, bg: background }));
