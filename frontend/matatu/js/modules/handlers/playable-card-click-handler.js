
import { guestId } from "../../../../shared/guest-manager.js";
import {sendMessage} from "../../../../shared/network/websocket.js";
import {gameId} from "../../main.js";

export function playableCardClickHandler(event) {
    const card = event.currentTarget;

    if(card.closest('.hand').id !== guestId) {
      alert('You cannot play your opponents card');
      return;
    }

    const message = {
        path: '/api/game-sessions',
        gameType: 'matatu',
        gameId: gameId,
        actionData: {
            action: 'play-card',
            playerId: guestId,
            cardId: card.id
        }
    }
    
    sendMessage(message);
}