import {moveCardToHand} from "../animations/move-card-to-hand.js";

export function drawableClickCardHander(event) {
    const card = event.currentTarget;
    const hands = document.querySelectorAll('.hand');
    const hand = hands[Math.floor(Math.random() * 2)];
    
    moveCardToHand(card.id, hand.id);
}