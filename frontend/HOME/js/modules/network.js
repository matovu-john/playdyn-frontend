import {API_BASE} from "../../../config/config.js";
import {guestId} from "./guest-manager.js";
//console.log('guestId is', guestId)

export async function createGameSession() {
    
    const res = await fetch(`${API_BASE}/api/game-sessions?game-type=matatu&action=create-game`, {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
            mode: 'computer',
            guestId: guestId,
            players: [
                {id: guestId, type: 'human'},
                {id: 'dyn_v1', type: 'computer'},
            ],
        })
    })
    const gameSession = await res.text();
        
    return gameSession;
}