import './styles.scss';
import {TSound, TSounds} from "./types/types";
import { loadSounds } from "./functions/loadSounds";
import { playSound } from "./functions/playSound";

const volumeControl = document.getElementById('volume') as HTMLInputElement;
const soundsControlWrapper = document.querySelector('.soundsControlWrapper');
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

if (soundsControlWrapper) {
    soundsControlWrapper.addEventListener('click', (e) => {
        const target = e.target as HTMLButtonElement;

        if (target.nodeName === 'BUTTON') {
            const soundKey = target.dataset.soundKey;
            const bgImage = target.dataset.bgImage;

            if (soundKey && bgImage) {
                void playSound({soundKey: soundKey as TSound, bgImage, sounds: sounds, bg: background});
            }
        }
    });
}
