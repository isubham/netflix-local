import {MongoClient} from 'mongodb';
import { FileIterator } from './file.js';
import { Crypto } from './hash.js';
import path from 'path';
import { v4 } from 'uuid';

class AnimeDb {

	client = new MongoClient('mongodb://admin:password@localhost:27017');
	dbName = 'anime_local';
	col_intro = 'intro';

	async getAllAnimeDb(req, res) {
		try {
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
			// "../collection/external"
	];
	/**
	 * returns  
	[{title, type, content, id}]
	*/
	static getAnime() {
		
		const animes = [];
		Anime.animeLocations.forEach(animeLocation => {
			animes.push(Anime.getAnimeOfFolder(animeLocation));
		});
		return animes;
	};

	

	static getAnimeOfFolder(animeFolder) {

		const animeInLocation = FileIterator.getFolderHierarchy(animeFolder, []);
		const animeFormatted = animeInLocation.map(animevideolocation => { 
				const id = Crypto.sha256(animevideolocation);
				const filename = path.basename(animevideolocation);
				const type = 'video';
				const content = animevideolocation;
				return { id, filename, type, content };
			});
		return animeFormatted;
	}


	static getAnimeNames() {

		let animes = [];
		Anime.animeLocations.forEach(animeLocation => {
			animes = animes.concat(Anime.getAnimeNamesOfFolder(animeLocation));
		});
		return animes;
	}

	static getAnimeNamesOfFolder(animeFolder) {
		const animeNames = FileIterator.getFilesOfFolder(animeFolder).map(e => {
			return {type: 'folder', name: e, content: [], id: v4()}
		});
		return animeNames;
	}
}

export {Anime};

