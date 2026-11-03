export function applyOverlap() {
    document.querySelectorAll('.hand').forEach((hand) => {
       const allCards = hand.querySelectorAll('.card');

        const style = getComputedStyle(hand);
        const paddings = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        const handWidth = hand.getBoundingClientRect().width;
        const availableHandWidth = handWidth - paddings;
        const totalCardsWidth = allCards[0].getBoundingClientRect().width * allCards.length;

        if (availableHandWidth > totalCardsWidth) {
           hand.style.gap = '5px';
            return;
        }

        const difference = totalCardsWidth - availableHandWidth;
        const overlap = (difference + 3) / (allCards.length - 1);
        const marginLeft = overlap > 58 ? 58 : overlap;
        console.log(overlap, overlap > allCards[0].getBoundingClientRect().width);
        
        allCards.forEach((card) => {
            card.style.setProperty('--overlap', `-${marginLeft}px`);
        });
    });
}