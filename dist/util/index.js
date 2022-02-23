"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveColor = exports.Colors = void 0;
exports.Colors = {
    DEFAULT: 0x000000,
    WHITE: 0xffffff,
    AQUA: 0x1abc9c,
    GREEN: 0x57f287,
    BLUE: 0x3498db,
    YELLOW: 0xfee75c,
    PURPLE: 0x9b59b6,
    LUMINOUS_VIVID_PINK: 0xe91e63,
    FUCHSIA: 0xeb459e,
    GOLD: 0xf1c40f,
    ORANGE: 0xe67e22,
    RED: 0xed4245,
    GREY: 0x95a5a6,
    NAVY: 0x34495e,
    DARK_AQUA: 0x11806a,
    DARK_GREEN: 0x1f8b4c,
    DARK_BLUE: 0x206694,
    DARK_PURPLE: 0x71368a,
    DARK_VIVID_PINK: 0xad1457,
    DARK_GOLD: 0xc27c0e,
    DARK_ORANGE: 0xa84300,
    DARK_RED: 0x992d22,
    DARK_GREY: 0x979c9f,
    DARKER_GREY: 0x7f8c8d,
    LIGHT_GREY: 0xbcc0c0,
    DARK_NAVY: 0x2c3e50,
    BLURPLE: 0x5865f2,
    GREYPLE: 0x99aab5,
    DARK_BUT_NOT_BLACK: 0x2c2f33,
    NOT_QUITE_BLACK: 0x23272a,
};
function resolveColor(color) {
    var _a;
    if (typeof color === "string") {
        if (color === "RANDOM")
            color = Math.floor(Math.random() * (0xffffff + 1));
        else if (color === "DEFAULT")
            color = 0;
        else
            color =
                (_a = exports.Colors[color]) !== null && _a !== void 0 ? _a : parseInt(color.replace("#", ""), 16);
    }
    if (Array.isArray(color)) {
        const [r, g, b] = color;
        color = (r << 16) + (g << 8) + b;
    }
    if (color < 0 || color > 0xffffff)
        throw new RangeError("COLOR_RANGE");
    else if (Number.isNaN(color))
        throw new TypeError("COLOR_CONVERT");
    return color;
}
exports.resolveColor = resolveColor;
