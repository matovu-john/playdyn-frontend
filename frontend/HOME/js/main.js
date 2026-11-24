import {API_BASE} from "../../shared/config/config.js";
import {createGameSession} from "../../shared/network/create-matatu-game-session.js";

document.querySelectorAll('a').forEach( (link) => {
    link.addEventListener('click', async (event) => {
        event.preventDefault();
        const url = new URL(link.href);
        let path = url.pathname;
        console.log(path);

        if (path.startsWith('/matatu/')) {
            const game = await createGameSession();
            if (!game.ok) {
                alert(game.reason);
                return;
            }
            url.searchParams.set('id' ,game.gameId);
            window.location.href = url;
        }
        //window.location.href = `${link.href}?action=create`;
    }
    );
}
);
