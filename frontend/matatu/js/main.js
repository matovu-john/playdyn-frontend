import {createGameSession, getGameSesstion} from "./modules/network.js";
import {buildMatatuCard} from "./modules/builders/ui/buildMatatuCard.js";
import {buildTwoPlayerContainer} from "./modules/builders/ui/build-two-player-container.js";
import {buildTwoPlayerController} from "./modules/builders/ui/build-two-player-controller.js";
import {buildDiscardPile} from "./modules/builders/ui/build-discard-pile.js";
import {applyOverlap} from "./modules/handlers/overlapHandler.js";
import {drawableClickCardHander} from "./modules/handlers/drawable-click-card-hander.js";
import {playableCardClickHandler} from "./modules/handlers/playable-card-click-handler.js";

export const socket = new WebSocket(`ws://${location.hostname}:5000`);

socket.onopen = () => {
    console.log('Successfully connected')
}

let url = new URL(window.location.href);
let gameId = url.searchParams.get('id');

if (!gameId) {
    gameId = await createGameSession();
}

const game = await getGameSesstion(gameId);
console.log(game);
if (!game) {
    gameId = await createGameSession();
    url = new URL(window.location.href);
    url.searchParams.set('id' ,gameId);
    window.location.href = url;
    
} else {
    prepareGame();
    const loader = document.querySelector('.loader-wrapper');
    const loadindText = document.querySelector('.loading-text');
    loadindText.textContent = 'Loaded';
    loadindText.style.color = 'green';

    loader.style.opacity = '0';

    setTimeout(function() {
        loader.style.display = 'none';
    }, 2100);

    const discardPileArea = document.querySelector('.discard-pile-area');
    const discardPile = buildDiscardPile();
    discardPileArea.appendChild(discardPile);

    const handCards = document.querySelectorAll('.hand .card');
    handCards.forEach((card) => {
        card.addEventListener('click', playableCardClickHandler);
    });

    const drawableCards = document.querySelectorAll('.drawable-card');
    const hands = document.querySelectorAll('.hand');

    drawableCards.forEach((card) => {
        card.addEventListener('click', drawableClickCardHander);
    });
}

function prepareGame() {
    const playerCount = game.players.length;
    const gameContainer = document.querySelector('.game-container');

    if (playerCount === 2) {
        const container = buildTwoPlayerContainer();
        gameContainer.appendChild(container);

        const hands = document.querySelectorAll('.hand');
        hands[0].id = game.players[0].id;
        hands[1].id = game.players[1].id;

        let card;

        hands.forEach( (hand) => {
            const player = game.players.find(player => player.id === hand.id);
            
            const observer = new MutationObserver((mutations) => {
                applyOverlap(hand.id);
            });
            
            observer.observe(hand, {
                childList: true
            });
            
            player.hand.forEach( (cardData) => {
                card = buildMatatuCard(cardData);               
                hand.appendChild(card);
            }
            );
        }
        );

        const drawPileSection = document.querySelector('.draw-pile-section');

        const cutterCard = buildMatatuCard(game.cutter);
        cutterCard.classList.add('cutter');
        drawPileSection.appendChild(cutterCard);

        game.drawPile.forEach( (card, index) => {
            const drawableCard = buildMatatuCard(card);
            drawableCard.classList.add('drawable-card');
    
            drawableCard.style.transform = `translate(-${index * 0.1}px)`;
            drawPileSection.appendChild(drawableCard);
        }
        );

        const controllerSection = document.querySelector('.controller-section');
        const controller = buildTwoPlayerController();
        controllerSection.appendChild(controller);
    }
}


