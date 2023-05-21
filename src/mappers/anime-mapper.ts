import { AnimeDbRow } from "../db/anime.db";

const AnimeMapperCSVToDB = (animeFromCSV: any): AnimeDbRow => {
    return {
        ...animeFromCSV,
        score: parseFloat(animeFromCSV.score),
        ranked: parseInt(animeFromCSV.ranked),
        popularity: parseInt(animeFromCSV.popularity),
        members: parseInt(animeFromCSV.members),
        episodes: parseInt(animeFromCSV.episodes),
        aired_start: animeFromCSV.aired.split("to").map((e: string) => new Date(e.trim()))[0],
        aired_end: animeFromCSV.aired.split("to").map((e: string) => new Date(e.trim()))[1],
        uid: parseInt(animeFromCSV.uid),
        genre: JSON.parse(animeFromCSV.genre.replaceAll("'", '"'))
    };
};

export { AnimeMapperCSVToDB }
