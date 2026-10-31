import {createGameSession} from "./modules/network.js";
import {buildMatatuCard} from "./modules/builders/ui/buildMatatuCard.js";
import {applyOverlap} from "./modules/handlers/overlapHandler.js";

const gameSession = await createGameSession();
console.log(gameSession)


document.querySelectorAll('.hand').forEach((hand) => {
    for (let index = 0; index < 7; index++) {
        const cardInfo = gameSession.drawPile.pop();
        const card = buildMatatuCard(cardInfo);
        hand.appendChild(card);
    }
});

applyOverlap();

