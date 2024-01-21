import {TSound, TSounds} from "./types";


export interface IPlaySoundArgs {
    soundKey: TSound;
    bgImage: string;
    sounds: TSounds;
    bg: HTMLDivElement
}
