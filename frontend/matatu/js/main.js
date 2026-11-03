import {createGameSession, getGameSesstion} from "./modules/network.js";
import {buildMatatuCard} from "./modules/builders/ui/buildMatatuCard.js";
import {buildTwoPlayerContainer} from "./modules/builders/ui/build-two-player-container.js";
import {buildTwoPlayerController} from "./modules/builders/ui/build-two-player-controller.js";

import {applyOverlap} from "./modules/handlers/overlapHandler.js";

const url = new URL(window.location.href);
let gameId = url.searchParams.get('id');

if (!gameId) {
    console.log('No game id found. creating one...');
    gameId = await createGameSession();
    console.log('...done')
}

const game = await getGameSesstion(gameId);
console.log(game)

const playerCount = game.players.length;
const gameContainer = document.querySelector('.game-container');

if (playerCount === 2) {
    const container = buildTwoPlayerContainer();
    gameContainer.appendChild(container);

    const hands = document.querySelectorAll('.hand');
    hands[0].id = game.players[0].id;
    hands[1].id = game.players[1].id;

    let card;

    hands.forEach((hand) => {
        const player = game.players.find(player => player.id === hand.id);
        player.hand.forEach((cardData) => {
            card = buildMatatuCard(cardData);
            hand.appendChild(card);
        });
    });

    const drawPileSection = document.querySelector('.draw-pile-section');
    
    const cutterCard = buildMatatuCard(game.cutter);
    cutterCard.classList.add('cutter');
    drawPileSection.appendChild(cutterCard);


    game.drawPile.forEach((card, index) => {
       const drawableCard = buildMatatuCard(game.drawPile[1]);
        drawableCard.classList.add('drawable-card');
        drawableCard.style.marginBottom = `-${index + 1}px`;
        drawPileSection.appendChild(drawableCard);
    });

    const controllerSection = document.querySelector('.controller-section');
    const controller = buildTwoPlayerController();
    controllerSection.appendChild(controller);
}

applyOverlap();