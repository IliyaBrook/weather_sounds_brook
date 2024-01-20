import './styles.scss';

type SoundKey = keyof typeof sounds;

const volumeControl = document.getElementById('volume') as HTMLInputElement;
const background = document.getElementById('background') as HTMLDivElement;

const sounds: { [key: string]: HTMLAudioElement } = {};

let currentSound: HTMLAudioElement | null;
let currentSoundKey: keyof typeof sounds | null;
let isPaused = false;

async function loadSound(soundFile: string) {
    const module = await import(`./assets/sounds/${soundFile}`);
    return new Audio(module.default);
}

async function loadSounds() {
    sounds.summer = await loadSound('summer.mp3');
    sounds.winter = await loadSound('winter.mp3');
    sounds.rain = await loadSound('rain.mp3');
}

window.addEventListener('load', () => {
    loadSounds().catch(e => console.error('Failed to load sounds:', e));
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
