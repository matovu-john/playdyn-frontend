import {API_BASE} from "../../../../shared/config/config.js";

export async function getGameSesstion(id) {
    const res = await fetch(`${API_BASE}/api/game-sessions?game-type=matatu&action=get-game&id=${id}`);
   
    if (!res.ok) {
        const errMsg = await res.text();
       // alert(errMsg);
        return;
    }

    return await res.json();
}