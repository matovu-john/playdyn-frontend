export function buildMatatuCard(cardInfo) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
    
        <div class='card-top-left'>
            <span class='rank'>${cardInfo.rank}</span>
            <span class='suit'>${cardInfo.suit}</span>
        </div>
        <div class='card-center'>
            <span class='suit big'>${cardInfo.suit}</span>
        </div>
        <div class='card-bottom-right'>
            <span class='rank'>${cardInfo.rank}</span>
            <span class='suit'>${cardInfo.suit}</span>
        </div>
    `;
    card.classList.toggle('is-red', cardInfo.suit === '\u2666' || cardInfo.suit === '\u2665');

    return card;
}