import {API_BASE} from "../config/config.js";
import {guestId} from "../guest-manager.js";
//console.log('guestId is', guestId)

export async function createGameSession() {
    
    const res = await fetch(`${API_BASE}/api/game-sessions?game-type=matatu&action=create-game`, {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
            mode: 'computer',
            userType: 'guest',
            guestId: guestId,
            opponents: [
                {id: 'dyn_v1', type: 'computer'},
            ],
        })
    });
console.log(res)
    if (!res.ok) {
       // const err = await 
        alert(res)
        return {ok: false, reason: await res.text()}
    }

    const gameSession = await res.text();
        
    return {ok: true, gameId: gameSession}
}