import {API_BASE} from "../../config/config.js";
import {createGameSession} from "./modules/network.js";

document.querySelectorAll('a').forEach( (link) => {
    link.addEventListener('click', async (event) => {
        event.preventDefault();
        const url = new URL(link.href);
        let path = url.pathname;
        console.log(path);

        if (path === '/matatu/index.html') {
            const gameId = await createGameSession();
            url.searchParams.set('id' ,gameId);
            window.location.href = url;
        }
        //window.location.href = `${link.href}?action=create`;
    }
    );
}
);
