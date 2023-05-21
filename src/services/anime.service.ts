import path from 'path';
import { v4 } from 'uuid';

import fs from 'fs';
import { MongoClient } from 'mongodb';
import { FileIterator } from '../modules/file';
import { Request, Response } from 'express';
import { MediaFile, MediaFolder } from '../declarations';
// import { redisHash } from '../modules/redis';
import { AnimeDB, AnimeDbRow, orderByFields } from '../db/anime.db';
import { resultPerPage } from '../constants';

class AnimeDb {

	async getAllAnimeDb(req: Request, res: Response) {
		try {
			const client = new MongoClient('mongodb://admin:password@localhost:27017');
			const dbName = 'anime_local';
			const col_intro = 'intro';
			await client.connect();
			const db = client.db(dbName);
			const collection = db.collection(col_intro)
			const allIntros = await collection.find({}).toArray();
			client.close();
			res.send(allIntros);
		} catch (e) {
			console.log(e);
			res.send(e);
		}
	};


}



class Anime {

	static animeLocations = [
		"../collection/Anime",
		"../collection/external"
	];
	static animeLinks: string = "animeLinks";

	static async getAnimeNames(): Promise<Array<MediaFolder>> {

		let animes: Array<MediaFolder> = [];
		// check cache

		let videoIdToPathMapping: Record<string, string> = {};
		Anime.animeLocations.forEach(animeLocation => {
			const anime: Array<MediaFolder> = Anime.getAnimeNamesOfFolder(animeLocation);
			anime.forEach(series => {
				series.content = Anime.getEpisodesOfAnime(path.join(animeLocation, series.filename), videoIdToPathMapping)

			});
			animes = animes.concat(anime);
		});
		// await redisHash.setMultiple(Anime.animeLinks, videoIdToPathMapping)
		return animes;
	}


	private static getEpisodesOfAnime(animeFolder: string, videoIdToPathMapping: Record<string, string>): Array<MediaFile> {
		const episodes = FileIterator.getFilesOfFolder(animeFolder).map(anime => {
			const animeLocation = path.join(animeFolder, anime);
			const animeId = v4();
			videoIdToPathMapping[animeId] = animeLocation;
			return { type: 'video', filename: anime, content: animeLocation, id: animeId }
		});
		return episodes;
	}

	private static getAnimeNamesOfFolder(animeFolder: string): Array<MediaFolder> {
		const animeNames = FileIterator.getFolderOfFolder(animeFolder).map(anime => {
			return { type: 'folder', filename: anime, content: [], id: v4() }
		});
		return animeNames;
	}


	static async stream(req: Request, res: Response) {
		try {

			const videoId = req.params.videoLocation;
			console.log("videoId", videoId);

			const range = req.headers.range as string;
			console.log('range', range);
			if (!range) {
				res.status(400).send("Requires Range header");
			}
			// const videoPath = await redisHash.get(Anime.animeLinks, videoId)
			// console.log('videoPath', videoPath);
			// const videoSize = fs.statSync(videoPath).size;
			// console.log('videoSize', videoSize);
			const CHUNK_SIZE = 10 ** 6;
			const start = Number(range.replace(/\D/g, ""));
			// const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
			// const contentLength = end - start + 1;
			const headers = {
				// "Content-Range": `bytes ${start}-${end}/${videoSize}`,
				"Accept-Ranges": "bytes",
				// "Content-Length": contentLength,
				"Content-Type": "video/mp4",
			};
			res.writeHead(206, headers);

			// const videoStream = fs.createReadStream(videoPath, { start, end });
			// videoStream.pipe(res);

		} catch (e) {
			console.log(e);
		}
	}

}

class AnimeService {
	static async get(page: number = 1, pageSize: number = resultPerPage, orderBy: orderByFields = 'score', order: 'ASC' | 'DESC' = 'ASC') {
		const anime = await AnimeDB.getAnime(page, pageSize, orderBy, order)
		return anime;
	}

	static async search(animeName: string): Promise<AnimeDbRow[]> {
		const anime = await AnimeDB.search(animeName);
		return anime;
	}
}

export { AnimeService };

