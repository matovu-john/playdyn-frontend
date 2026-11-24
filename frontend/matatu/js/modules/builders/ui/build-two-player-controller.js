export function buildTwoPlayerController() {
    const controller = document.createElement('div');
    controller.classList.add('two-player-controller');
    controller.innerHTML = `
        <div class='player-wrapper opponent active'>
            <div class='avatar-container' src='' alt='player-avatar'>
                <span class='avatar-fallback'>B</span>
                <img class='avatar-img' src='' alt='User avatar'>
            </div>
            <div class='player-info'>
                <span class='name'>Bright</span>
                <p>Cards: <span class='card-count'>5</span> </p
            </div>
        </div>
        <div class='manager turn-indicator'>
            <p class='message'>Bright's turn</p>
            <button class='pass-btn'>Pass</button>
        </div>
        <div class='player-wrapper me'>
        <div class='avatar-container' src='' alt='player-avatar'>
                <span class='avatar-fallback'>B</span>
                <img class='avatar-img' src='' alt='User avatar'>
            </div>
            <div class='player-info'>
                <span class='name'>You</span>
                <p>Cards: <span class='card-count'>8</span> </p>
            </div>
        </div>
    `;
    return controller;
}