import {playableCardClickHandler} from "../handlers/playable-card-click-handler.js";

export function moveCardToDiscardPile(cardId) {
    const discardPile = document.querySelector('.discard-pile');
    const card = document.getElementById(cardId);
    
    card.removeEventListener('click', playableCardClickHandler);
    
    const angle = `${Math.floor(Math.random() * 61) - 30}`;

   // card.style.transform = `rotate(${angle}deg)`;
    const oldPosition = card.getBoundingClientRect();

   // console.log(card);
    discardPile.appendChild(card);

    const newPosition = card.getBoundingClientRect();

    const x = oldPosition.left - newPosition.left;
    const y = oldPosition.top - newPosition.top;

    card.animate([{
        transform: `translate(${x}px, ${y}px)`
    }, {
        transform: `rotate(${angle}deg) translate(0, 0)`
    }], {
        duration: 500,
        easing: 'ease-out',
        fill: 'forwards'
    });
}
