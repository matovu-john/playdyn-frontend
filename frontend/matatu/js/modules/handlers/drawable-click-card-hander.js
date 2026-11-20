
import { guestId } from "../../../../shared/guest-manager.js";
import {sendMessage} from "../../../../shared/network/websocket.js";
import {gameId} from "../../main.js";

export function drawableClickCardHander(event) {
    const card = event.currentTarget;
    const hands = document.querySelectorAll('.hand');
    const hand = hands[Math.floor(Math.random() * 2)];

    const message = {
        path: '/api/game-sessions',
        gameType: 'matatu',
        gameId: gameId,
        actionData: {
            action: 'draw-card',
            playerId: guestId,
            cardId: card.id
        }
    }
    sendMessage(message);
    
}