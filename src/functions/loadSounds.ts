import {TSounds} from "../types/types";

async function loadSound(soundFile: string) {
    const module = await import(`../assets/sounds/${soundFile}`);
    return new Audio(module.default);
}

export async function loadSounds(sounds: TSounds) {
    sounds.summer = await loadSound('summer.mp3');
    sounds.winter = await loadSound('winter.mp3');
    sounds.rain = await loadSound('rain.mp3');
}
