import {API_BASE} from "./config.js";

export async function createGameSession() {
    
    const res = await fetch(`${API_BASE}/api/game-sessions?game-type=matatu&action=create-game`, {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
            mode: 'computer',
            players: [
                {name: 'john', isOpponent: false},
                {name: 'dyn_v1', isOpponent: true},
            ],
        })
    });
    const gameId = await res.text();    
    return gameId;
}


export async function getGameSesstion(id) {
    const res = await fetch(`${API_BASE}/api/game-sessions?game-type=matatu&action=get-game&id=${id}`);
    const game = await res.json();
    return game;
}