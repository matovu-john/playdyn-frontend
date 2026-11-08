export function buildTwoPlayerContainer() {
  const container = document.createElement('div');
  container.className = 'two-player-container';
    container.innerHTML = `
    <div class='top'>
      <div class='hand computer-hand'></div>
    </div>
    <div class='left'>
      <div class='draw-pile-section'>
      </div>
    </div>
    <div class='center discard-pile-area'></div>
    <div class='right'>
      <div class='controller-section'></div>
    </div>
    <div class='bottom'>
      <div class='hand human-hand'></div>
    </div>
    `

  return container;
}
