import {drawableClickCardHander} from "../handlers/drawable-click-card-hander.js";
import {playableCardClickHandler} from "../handlers/playable-card-click-handler.js";

export function moveCardToHand(cardId, handId) {
    const originalCard = document.getElementById(cardId);
    const hand = document.getElementById(handId);

    originalCard.removeEventListener('click', drawableClickCardHander);
    originalCard.addEventListener('click', playableCardClickHandler);

   // card.style.tranform = 'translate(0,0)';

    const oldPosition = originalCard.getBoundingClientRect();

    const animatedCard = originalCard.cloneNode(true);
    animatedCard.id = `animated${cardId}`;
    animatedCard.style.position = 'fixed';
    animatedCard.style.left = `${oldPosition.left}px`;
    animatedCard.style.top = `${oldPosition.top}px`;

    animatedCard.style.width = `${oldPosition.width}px`;
    animatedCard.style.height = `${oldPosition.height}px`;

    animatedCard.style.margin = '0';
    animatedCard.style.zIndex = '9999';

    animatedCard.style.pointerEvents = 'none';

    document.body.appendChild(animatedCard);
    
    hand.appendChild(originalCard);
    originalCard.style.visibility = 'hidden';
    
    const newPosition = originalCard.getBoundingClientRect();

    const x = newPosition.left - oldPosition.left;
    const y = newPosition.top - oldPosition.top;

    const animation = animatedCard.animate(
        [
            {transform: 'translate(0,0)'},
            {transform: `translate(${x - 80}px, ${y}px)`}
        ],
        {
            duration: 500,
            easing: 'ease-in-out'
        }
    );

    animation.finished.then(() => {
        animatedCard.remove();
        originalCard.style.visibility = 'visible';
    });
}

