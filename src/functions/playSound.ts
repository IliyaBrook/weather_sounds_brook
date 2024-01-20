import {TSound, TSounds} from "types";
import {IPlaySoundArgs} from "interfaces";

let currenTSound: HTMLAudioElement | null;
let currenTSoundKey: TSound | null;
let isPaused = false;

const background = document.getElementById('background') as HTMLDivElement;
export async function playSound({soundKey, bgImage, sounds}: IPlaySoundArgs) {

    if (currenTSound && currenTSoundKey === soundKey && !isPaused) {
        currenTSound.pause();
        isPaused = true;
        return;
    }

    if (currenTSound && currenTSoundKey !== soundKey) {
        currenTSound.pause();
    }

    currenTSound = sounds[soundKey];
    currenTSoundKey = soundKey;

    if (isPaused && currenTSoundKey === soundKey) {
        isPaused = false;
    } else {
        currenTSound.currentTime = 0;
        isPaused = false;
    }

    try {
        await currenTSound.play();
    } catch (error) {
        console.error('Error playing sound:', error);
    }

    background.style.backgroundImage = `url(${require(`../assets/images/${bgImage}`)})`;
}
