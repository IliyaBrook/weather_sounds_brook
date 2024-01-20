import './styles.scss';

const volumeControl = document.getElementById('volume') as HTMLInputElement;
const background = document.getElementById('background') as HTMLDivElement;

const sounds = {
    summer: new Audio(require('./assets/sounds/summer.mp3')),
    winter: new Audio(require('./assets/sounds/winter.mp3')),
    rain: new Audio(require('./assets/sounds/rain.mp3')),
};

let currentSound: HTMLAudioElement | null = null;

function playSound(soundKey: keyof typeof sounds, bgImage: string) {
    if (currentSound) {
        currentSound.pause();
    }

    if (currentSound !== sounds[soundKey]) {
        currentSound = sounds[soundKey];
        currentSound.currentTime = 0;
        currentSound.play();
    } else {
        currentSound = null;
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
