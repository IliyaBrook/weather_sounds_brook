"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./styles.scss");
var volumeControl = document.getElementById('volume');
var background = document.getElementById('background');
var sounds = {};
function loadSound(soundFile) {
    return __awaiter(this, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve("".concat("./assets/sounds/".concat(soundFile))).then(function (s) { return require(s); })];
                case 1:
                    module = _a.sent();
                    return [2 /*return*/, new Audio(module.default)];
            }
        });
    });
}
function loadSounds() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = sounds;
                    return [4 /*yield*/, loadSound('summer.mp3')];
                case 1:
                    _a.summer = _d.sent();
                    _b = sounds;
                    return [4 /*yield*/, loadSound('winter.mp3')];
                case 2:
                    _b.winter = _d.sent();
                    _c = sounds;
                    return [4 /*yield*/, loadSound('rain.mp3')];
                case 3:
                    _c.rain = _d.sent();
                    return [2 /*return*/];
            }
        });
    });
}
window.addEventListener('load', function () {
    loadSounds().catch(function (e) { return console.error('Failed to load sounds:', e); });
});
var currentSound;
var currentSoundKey;
var isPaused = false;
function playSound(soundKey, bgImage) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (currentSound && currentSoundKey === soundKey && !isPaused) {
                        currentSound.pause();
                        isPaused = true;
                        return [2 /*return*/];
                    }
                    currentSound = sounds[soundKey];
                    currentSoundKey = soundKey;
                    if (!(currentSound !== sounds[soundKey])) return [3 /*break*/, 5];
                    currentSound = sounds[soundKey];
                    currentSound.currentTime = 0;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, currentSound.play()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error playing sound:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    currentSound = null;
                    _a.label = 6;
                case 6:
                    background.style.backgroundImage = "url(".concat(require("./assets/images/".concat(bgImage)), ")");
                    return [2 /*return*/];
            }
        });
    });
}
volumeControl.addEventListener('input', function (e) {
    var volume = parseFloat(e.target.value);
    Object.values(sounds).forEach(function (audio) {
        audio.volume = volume;
    });
});
document.getElementById('playSummer').addEventListener('click', function () { return playSound('summer', 'summer-bg.jpg'); });
document.getElementById('playWinter').addEventListener('click', function () { return playSound('winter', 'winter-bg.jpg'); });
document.getElementById('playRain').addEventListener('click', function () { return playSound('rain', 'rainy-bg.jpg'); });
