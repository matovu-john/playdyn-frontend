import { getGameSesstion } from "./modules/network.js";
import { createGameSession } from "../../shared/network/create-matatu-game-session.js";
import { buildMatatuCard } from "./modules/builders/ui/buildMatatuCard.js";
import { buildTwoPlayerContainer } from "./modules/builders/ui/build-two-player-container.js";
import { buildTwoPlayerController } from "./modules/builders/ui/build-two-player-controller.js";
import { renderCutterCard, renderDrawableCards } from "./modules/handlers/draw-pile-section-handler.js";
import { buildDiscardPile } from "./modules/builders/ui/build-discard-pile.js";
import { applyOverlap } from "./modules/handlers/overlapHandler.js";
import { drawableClickCardHander } from "./modules/handlers/drawable-click-card-hander.js";
import { playableCardClickHandler } from "./modules/handlers/playable-card-click-handler.js";
import { guestId } from "../../shared/guest-manager.js";
import {onMessageHandler} from "./modules/handlers/on-message-handler.js";

let url = new URL(window.location.href);
export let gameId = url.searchParams.get('id');

if (!gameId) {
    gameId = await createGameSession();
}

const game = await getGameSesstion(gameId);
console.log(game);
if (!game) {
    gameId = await createGameSession();
    
    url = new URL(window.location.href);
    url.searchParams.set('id' ,gameId.gameId);
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

    onMessageHandler();
}

function prepareGame() {
    const playerCount = game.players.length;
    const gameContainer = document.querySelector('.game-container');

    if (playerCount === 2) {
        const container = buildTwoPlayerContainer();
        gameContainer.appendChild(container);

        const hands = document.querySelectorAll('.hand');
        const myHandId = game.players.find(player => player.id === guestId).id;
        
        for (let i = 0; i < hands.length; i++) {
            if (hands[i].classList.contains('human-hand')) {
                hands[i].id = myHandId;
            } else {
                hands[i].id = game.players[1].id;
            }
        }

        hands.forEach( (hand) => {
          
            const player = game.players.find(player => player.id === hand.id);
            
            const observer = new MutationObserver((mutations) => {
                applyOverlap(hand.id);
            });
            
            observer.observe(hand, {
                childList: true
            });

            let card;
            
            player.hand.forEach( (cardData) => {
                card = buildMatatuCard(cardData);               
                hand.appendChild(card);
            }
            );
        }
        );

        renderCutterCard(game.cutter);
        renderDrawableCards(game.drawPile);

        const controllerSection = document.querySelector('.controller-section');
        const controller = buildTwoPlayerController();
        controllerSection.appendChild(controller);
    }
}


