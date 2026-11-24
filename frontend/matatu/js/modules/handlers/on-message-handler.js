import {onMessage} from "../../../../shared/network/websocket.js";
import {moveCardToDiscardPile} from "../animations/move-card-to-dicard-pile.js";
import {moveCardToHand} from "../animations/move-card-to-hand.js";
import { getSuitMenu } from "../builders/ui/get-suit-menu.js";
import { guestId } from "../../../../shared/guest-manager.js";
import {sendMessage} from "../../../../shared/network/websocket.js";
import {gameId} from "../../main.js";
import { buildMatatuCard, cardBuilder } from "../builders/ui/buildMatatuCard.js";

export function onMessageHandler() {
   onMessage((message) => {
    console.log(message);

      if (message.action2 === 'change-suit') {
         renderSuitMenu(message.playerId);
         addListenersToSuits();
      }

     if (message.action === 'play-card') {
        if (message.card.id !== 'guestId') {
           const cardBack = document.getElementById(message.card.id);
           const cardFace = buildMatatuCard(message.card);
           cardBack.replaceWith(cardFace);
        }
        moveCardToDiscardPile(message.card.id);
     } 
     else if (message.action === 'draw-card') {
        const hand = document.getElementById(message.playerId);
        let delay = 0;
        for (let card of message.cards) {
           setTimeout(() => {
              const cardBack = document.getElementById(card.id);
              const cardFace = buildMatatuCard(card);
              cardBack.replaceWith(cardFace);
              moveCardToHand(card.id, hand.id)
           }, delay);
           delay += 300;
        }
        
     }
     else if (message.action === 'approve-suit') {
        const suitMenu = document.querySelector('.suit-menu');
        const suits = document.querySelectorAll('.suit-menu .suit');
        for (let suit of suits) {
           if (suit.textContent !== message.selectedSuit) {
              suit.remove();
           }
        }
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
   suitMenu.style.top = `300px`;
  // suitMenu.style.left = `${hand.getBoundingClientRect().left - 10}px`;
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
                 