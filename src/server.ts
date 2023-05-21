import express, { Request, Response } from 'express';
import cors from 'cors';
// https://stackabuse.com/bytes/fix-dirname-is-not-defined-in-es-module-scope-in-javascript-node/
import path from 'path';
import { MediaFolder } from './declarations';
// import * as redisWrapper from './modules/redis'
import { animeRouter } from './routes/anime.route';
import { host, port } from './constants';
import { getRelatedUrl } from './utils/url-builder';

const _dirname = process.cwd();

const app = express();
app.use(cors());

// serve static files
app.use(express.static(_dirname));
app.use(express.static(path.join(_dirname, "../collection/")));

app.use("/anime", animeRouter)

app.get("/health", (req: Request, res: Response) => {
	console.log("hiting health request");
	res.status(200).send({
		status: "healthy",
		routes: {
			anime: getRelatedUrl('/anime')
		}
	});
});


let AnimeCache: Array<MediaFolder> = [];
// END OF ANIME
app.listen(port, async function () {
	// await redisWrapper.connect();
	// AnimeCache = await getAnimeFromCache();
	// console.log('AnimeCache length', AnimeCache.length);
	console.log(`Listening on port ${port}!`);
});

