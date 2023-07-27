export const drawerWidth = 150;
export const minWindowWidth = 730;

export const thumbWidth = 400;
export const thumbHeight = 400;

export function getSize(part: string) {
    switch (part) {
        case "color": return { w: 400, h: 400 };

        case "skin": return { w: 650, h: 650 };
        case "eye": return { w: 360, h: 360 };
        case "nose": return { w: 234, h: 234 };
        case "mouth": return { w: 234, h: 234 };
        case "hair": return { w: 1240, h: 1240 };
        case "cheek": return { w: 480, h: 480 };

        case "shirt": return { w: 1450, h: 1450 };
        case "overcoat": return { w: 1450, h: 1450 };
        case "trousers": return { w: 1450, h: 1450 };
        case "dress": return { w: 1946, h: 1946 };
        case "sock": return { w: 1000, h: 1000 };
        case "shoe": return { w: 1000, h: 1000 };
        case "bag": return { w: 500, h: 500 };

        case "headband": return { w: 970, h: 970 };
        case "earring": return { w: 700, h: 345 };      //-->thumb
        case "bracelet": return { w: 896, h: 410 };
        case "prop": return { w: 820, h: 820 };

        case "background": return { w: 1450, h: 1450 };

        case "thumb": default: return { w: 400, h: 400 };
    }
}