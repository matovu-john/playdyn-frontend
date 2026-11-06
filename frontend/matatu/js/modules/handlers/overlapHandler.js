export function applyOverlap(handId) {

        const hand = document.getElementById(handId);
       const allCards = hand.querySelectorAll('.card');

        allCards.forEach((card) => {
            card.style.setProperty('--overlap', `0px`);
        });
        hand.style.gap = '0px';

        const style = getComputedStyle(hand);
        const paddings = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        const handWidth = hand.getBoundingClientRect().width;
        const availableHandWidth = handWidth - paddings;
        const totalCardsWidth = allCards[0].getBoundingClientRect().width * allCards.length;
        console.log('Hand width:', handWidth, '\r\n total Cards Width:', totalCardsWidth);

        if (availableHandWidth > totalCardsWidth) {
           hand.style.gap = '1px';
            return;
        }

        const difference = totalCardsWidth - availableHandWidth;
        const overlap = (difference + 3) / (allCards.length - 1);
        const marginLeft = overlap > 58 ? 58 : overlap;
       // console.log(overlap, overlap > allCards[0].getBoundingClientRect().width);
        
        allCards.forEach((card) => {
            card.style.setProperty('--overlap', `-${marginLeft}px`);
        });
   
}