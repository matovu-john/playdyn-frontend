import {onMessage} from "../../../../shared/network/websocket.js";
import {moveCardToDiscardPile} from "../animations/move-card-to-dicard-pile.js";
import {moveCardToHand} from "../animations/move-card-to-hand.js";
import { getSuitMenu } from "../builders/ui/get-suit-menu.js";
import { guestId } from "../../../../shared/guest-manager.js";
import {sendMessage} from "../../../../shared/network/websocket.js";
import {gameId} from "../../main.js";

export function onMessageHandler() {
   onMessage((message) => {
    console.log(message);

      if (message.action2 === 'change-suit') {
         renderSuitMenu(message.playerId);
         addListenersToSuits();
      }

     if (message.action === 'play-card') {
        moveCardToDiscardPile(message.cardId);
     } 
     else if (message.action === 'draw-card') {
        const hand = document.getElementById(message.playerId);
        moveCardToHand(message.cardId, hand.id);
     }
     else if (message.action === 'approve-suit') {
        const suitMenu = document.querySelector('.suit-menu');
        suitMenu.remove();
     }
     else {
        alert(message.reason);
     }


  }); 
}

function renderSuitMenu(playerId) {
   const hand = document.getElementById(playerId);
   const suitMenu = getSuitMenu();
   document.body.appendChild(suitMenu);

   const suitMenuHeight = suitMenu.getBoundingClientRect().height;
   suitMenu.style.top = `${hand.getBoundingClientRect().top - suitMenuHeight - 20}px`;
   suitMenu.style.left = `${hand.getBoundingClientRect().left - 10}px`;
}

function addListenersToSuits() {
   const suits = document.querySelectorAll('.suit-menu .suit');
   suits.forEach((suit) => {
      suit.addEventListener('click', () => {
         const selectedSuit = suit.classList[1];
         for (let suit of suits) {
            if (!suit.classList.contains(selectedSuit)) {
               suit.remove();
            }
         }
         
         const message = {
           path: '/api/game-sessions',
           gameType: 'matatu',
           gameId: gameId,
              actionData: {
               action: 'change-suit',
               playerId: guestId,
               newSuit: suit.textContent
              }
         }
         sendMessage(message);
      });
   });
}
                 