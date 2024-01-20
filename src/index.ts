import './styles.scss';
import {Tsounds} from "types";
import {loadSounds} from "./functions/loadSounds";

const volumeControl = document.getElementById('volume') as HTMLInputElement;
const background = document.getElementById('background') as HTMLDivElement;

const sounds: Tsounds = {};

let currentSound: HTMLAudioElement | null;
let currentSoundKey: keyof typeof sounds | null;
let isPaused = false;


window.addEventListener('load', () => {
    loadSounds(sounds).catch(e => console.error('Failed to load sounds:', e));
});

async function playSound(soundKey: keyof typeof sounds, bgImage: string) {
    if (currentSound && currentSoundKey === soundKey && !isPaused) {
        currentSound.pause();
        isPaused = true;
        return;
    }

    if (currentSound && currentSoundKey !== soundKey) {
        currentSound.pause();
    }

    currentSound = sounds[soundKey];
    currentSoundKey = soundKey;

    if (isPaused && currentSoundKey === soundKey) {
        isPaused = false;
    } else {
        currentSound.currentTime = 0;
        isPaused = false;
    }

    try {
        await currentSound.play();
    } catch (error) {
        console.error('Error playing sound:', error);
    }

    background.style.backgroundImage = `url(${require(`./assets/images/${bgImage}`)})`;
}

volumeControl.addEventListener('input', (e) => {
    const volume = (e.target as HTMLInputElement).value;
    Object.values(sounds).forEach((audio) => {
        audio.volume = parseFloat(volume);
    });
});

document.getElementById('playSummer')!.addEventListener('click', () => playSound('summer', 'summer-bg.jpg'));
document.getElementById('playWinter')!.addEventListener('click', () => playSound('winter', 'winter-bg.jpg'));
document.getElementById('playRain')!.addEventListener('click', () => playSound('rain', 'rainy-bg.jpg'));
