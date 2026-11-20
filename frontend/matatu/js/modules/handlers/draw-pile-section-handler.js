import {buildMatatuCard} from "../builders/ui/buildMatatuCard.js";

let drawPileSection;

export function renderCutterCard(cardData) {
    drawPileSection = document.querySelector('.draw-pile-section');
    
    const card = buildMatatuCard(cardData);
    card.classList.add('cutter');
   // console.log('drawPileSection is', drawPileSection)
    drawPileSection.appendChild(card);
}

export function renderDrawableCards(cardsArray) {
    cardsArray.forEach( (cardData, index) => {
        const card = buildMatatuCard(cardData);
        card.classList.add('drawable-card');

        card.style.transform = `translate(-${index * 0.1}px)`;
        drawPileSection.appendChild(card);
    }
    );
}
