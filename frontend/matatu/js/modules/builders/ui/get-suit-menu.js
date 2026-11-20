export function getSuitMenu() {
    const container = document.createElement('div');
    container.classList.add('suit-menu');
    container.innerHTML = `
    <div class='suits-container'>
      <span class='suit hearts'>♥</span>
      <span class='suit spades'>♠</span>
      <span class='suit diamonds'>♦</span>
      <span class='suit clubs'>♣</span>
    </div>
    `;
  return container;
}