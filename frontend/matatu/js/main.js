import {createGameSession, getGameSesstion} from "./modules/network.js";
import {buildMatatuCard} from "./modules/builders/ui/buildMatatuCard.js";
import {buildTwoPlayerContainer} from "./modules/builders/ui/build-two-player-container.js";
import {buildTwoPlayerController} from "./modules/builders/ui/build-two-player-controller.js";
import {buildDiscardPile} from "./modules/builders/ui/build-discard-pile.js";


import {applyOverlap} from "./modules/handlers/overlapHandler.js";

const url = new URL(window.location.href);
let gameId = url.searchParams.get('id');

if (!gameId) {
    console.log('No game id found. creating one...');
    gameId = await createGameSession();
    console.log('...done')
}

const game = await getGameSesstion(gameId);
console.log(game);
if (!game) {
    console.log('game nooooope')
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

    const cards = document.querySelectorAll('.hand .card');
    cards.forEach((card) => {
        card.addEventListener('click', (event) => {
            const hand = event.target.closest('.hand');
            const handId = hand.id;

            
            
            const angle = `${Math.floor(Math.random() * 61) - 30}`;
            
            
            card.style.transform = `rotate(${angle}deg)`;
            const oldPosition = card.getBoundingClientRect();
        
            console.log(card);
            discardPile.appendChild(card);

            const newPosition = card.getBoundingClientRect();

            const x = oldPosition.left - newPosition.left;
            const y = oldPosition.top - newPosition.top;

            card.animate(
                [
                    {transform: `translate(${x}px, ${y}px)`},
                    {transform: 'translate(0,0)'}
                ],
                {
                    duration: 250,
                    easing: 'ease-out'
                }
            );
            
        });
    });

    const drawableCards = document.querySelectorAll('.drawable-card');
    const hands = document.querySelectorAll('.hand');

    drawableCards.forEach((card) => {
        card.addEventListener('click', () => {
            const hand = hands[Math.floor(Math.random() * 2)];
            hand.appendChild(card);
        });
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
                console.log('change detected');
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
            const drawableCard = buildMatatuCard(game.drawPile[1]);
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


