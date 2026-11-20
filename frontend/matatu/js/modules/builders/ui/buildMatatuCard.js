export function buildMatatuCard(cardInfo) {
    const card = document.createElement('div');
    card.classList.add('card', 'is-black');

    card.id = cardInfo.id;

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

    
    if (cardInfo.suit === '♥' || cardInfo.suit === '♦') {
        card.style.color = 'red';
    } else {
        card.style.color = 'black';
    }

    return card;
}