import express from 'express';
import cors from 'cors';
// https://stackabuse.com/bytes/fix-dirname-is-not-defined-in-es-module-scope-in-javascript-node/
import path from 'path';
import url from 'url';
import { Anime }from './anime.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

// serve static files
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "../collection/")));


let AnimeCache = [];

// ANIME
app.get('/anime', (req, res) => {
	try {

	const page = (req.query.page - 1) || 0;
	const perPage = 100;
	const getAnimeOfPage = () => {
		const startIndex = page*perPage;
		let endIndex = startIndex + perPage
		if (AnimeCache.length < endIndex) {
			endIndex =  AnimeCache.length;
		}
		const paggedAnime = AnimeCache.slice(startIndex, endIndex)
		return paggedAnime;
	}
	if (AnimeCache.length != 0) {
		console.log('cache hit');
		res.send(getAnimeOfPage());
	}

	if (AnimeCache.length == 0)
	{
		const anime = Anime.getAnimeNames();
		AnimeCache = anime;
		res.send(getAnimeOfPage());
	}

	} catch (e) {
		console.log(e);
		res.send(e);
	}
});
// END OF ANIME
const port = 8005
app.listen(port, function () {
	    console.log(`Listening on port ${port}!`);
});
