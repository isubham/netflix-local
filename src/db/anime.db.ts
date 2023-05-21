import { tvDatabase } from "./postgres"

type AnimeDbRow = {
    uid: number;
    title: string;
    synopsis: string;
    genre: Array<string>
    aired_start: Array<Date>;
    aired_end: Array<Date>;
    episodes: number;
    members: number;
    popularity: number;
    ranked: number;
    score: number;
    img_url: string;
    link: string;
};

type orderByFields = 'uid' | 'title' | 'synopsis' | 'genre' | 'aired_start' | 'aired_end' | 'episodes' | 'members' | 'popularity' | 'ranked' | 'score' | 'img_url' | 'link'
type orderEnum = 'ASC' | 'DESC';

class AnimeDB {

    /**
     * saves single anime to db
     * @param anime 
     *   
     * @example
     * {
     * uid: '87',
     title: "Mobile Suit Gundam: Char's Counterattack",
    synopsis: 'The year is Universal Century 0093. Char Aznable has taken command of Neo Zeon, the rebels of outer space. He firmly believes that humankind can only achieve peace by relocating to space. Thus, he plans to crash the giant asteroid Axis into Earth and plunge the planet into an uninhabitable winter. Char also eagerly anticipates this opportunity to settle a 14-year rivalry with Amuro Ray. The two have been reluctant allies at times, but Char has never forgiven Amuro for causing the death of one of his comrades during the One Year War. \r\n' +
        ' \r\n' +
        "Only the Earth Federation's Londo Bell Unit has the power to stop Char from fulfilling his dangerous goal. Leading the defense of Earth is veteran captain Bright Noa and Amuro Ray with the latest Nu Gundam mobile suit. In this thrilling conclusion to the original Gundam series, Londo Bell engages in a final conflict with Neo Zeon that will decide the fate of Earth and end this long-standing rivalry—once and for all. \r\n" +
        ' \r\n' +
        '[Written by MAL Rewrite]',
    genre: "['Military', 'Sci-Fi', 'Space', 'Drama', 'Mecha']",
    aired: 'Mar 12, 1988',
    episodes: '1.0',
    members: '29248',
    popularity: '2604',
    ranked: '1081.0',
    score: '7.73',
    img_url: 'https://cdn.myanimelist.net/images/anime/1523/92371.jpg',
    link: 'https://myanimelist.net/anime/87/Mobile_Suit_Gundam__Chars_Counterattack'
    }
    */

    static async saveAnimeWithTransaction(anime: AnimeDbRow): Promise<number> {
        try {
            const result = await tvDatabase.transaction(`INSERT INTO anime 
                (uid, title, synopsis, genre, aired_start, aired_end, episodes, members, popularity, ranked, score, img_url, link) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
                [anime.uid, anime.title, anime.synopsis, anime.genre, anime.aired_start, anime.aired_end, anime.episodes, anime.members, anime.popularity, anime.ranked, anime.score, anime.img_url, anime.link]
            )
            return result?.rowCount as number;
        } catch (e) {
            throw e;
        }
    };

    static async saveAnime(anime: AnimeDbRow): Promise<number> {
        try {
            const result = await tvDatabase.query(`INSERT INTO anime 
                (uid, title, synopsis, genre, aired_start, aired_end, episodes, members, popularity, ranked, score, img_url, link) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
                [anime.uid, anime.title, anime.synopsis, anime.genre, anime.aired_start, anime.aired_end, anime.episodes, anime.members, anime.popularity, anime.ranked, anime.score, anime.img_url, anime.link]
            )
            console.log(`${anime.title} saved ${result?.rowCount}`)
            return result?.rowCount as number;
        } catch (e) {
            throw e;
        }
    };

    static async getAnime(page: number, pageSize: number, orderBy: orderByFields, order: 'ASC' | 'DESC'): Promise<Array<AnimeDbRow>> {
        try {
            const result = await tvDatabase.query(`SELECT * FROM anime WHERE ${orderBy} IS NOT NULL ORDER BY ${orderBy} ${order} LIMIT $1 OFFSET $2`,
                [pageSize, (page - 1) * pageSize])
            return result?.rows as Array<AnimeDbRow>;
        } catch (e) {
            throw e;
        }
    };

    static async search(query: string): Promise<Array<AnimeDbRow>> {
        try {
            const result = await tvDatabase.query(`SELECT * FROM anime WHERE UPPER(title) LIKE UPPER($1) LIMIT 10`,
                [`%${query}%`])
            return result?.rows as Array<AnimeDbRow>;
        } catch (e) {
            throw e;
        }
    };

}



export { AnimeDB, AnimeDbRow, orderByFields, orderEnum };
