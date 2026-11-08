import {moveCardToDiscardPile} from "../animations/move-card-to-dicard-pile.js";
//import {socket} from "../../main.js";

export function playableCardClickHandler(event) {
    const card = event.currentTarget;
    moveCardToDiscardPile(card.id);
  //  socket.send(card.id);
}
