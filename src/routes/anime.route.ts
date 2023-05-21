import express from 'express';
import { Request, Response } from 'express';
// import * as redisWrapper from '../modules/redis'
import { AnimeService } from '../services/anime.service';
import { getRelatedUrl } from '../utils/url-builder';
import { resultPerPage } from '../constants';
import { orderByFields, orderEnum } from '../db/anime.db';

// const getAnimeFromCache = async () => await redisWrapper.redisList.all("AnimeList");

const animeRouter = express.Router();

animeRouter.use(function (req, res, next) {
	console.log(req.path);
	next();
});

animeRouter.get('/', async (req: Request, res: Response) => {
	try {

		const page = parseInt(req?.query?.page as string) || 1;
		const pageSize = (parseInt(req?.query?.pageSize as string)) || resultPerPage;
		const orderBy: orderByFields = (req?.query?.orderBy as orderByFields) || 'score';
		const order: orderEnum = (req?.query?.order as orderEnum) || 'DESC';

		const anime = await AnimeService.get(page, pageSize, orderBy, order);

		const response = {
			data: anime,
			controls: {
				search: getRelatedUrl('/anime/search?animeName='),
				pagination: {
					prev: getRelatedUrl(`/anime?page=${(page - 1) || 1}&pageSize=${pageSize}&order=${order}&orderBy=${orderBy}`),
					next: getRelatedUrl(`/anime?page=${page + 1}&pageSize=${pageSize}&order=${order}&orderBy=${orderBy}`),
					fields: {
						orderBy: Object.keys(anime[0]),
						order: ['ASC', 'DES']
					}
				},
			}
		}

		res.send(response);
		// }

	} catch (e) {
		console.log(e);
		res.status(503).send(e);
	}
});

// animeRouter.get("/Anime/:videoLocation", Anime.stream);


animeRouter.get('/search', async (req: Request, res: Response) => {
	const { animeName } = req.query;
	console.log('animeName', animeName);
	const matchingAnime = await AnimeService.search(animeName as string);

	res.send(matchingAnime);
});

export { animeRouter };

