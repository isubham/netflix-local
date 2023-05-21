import csvParser from 'csv-parser';
import fs, { read } from 'fs';
import { AnimeDbRow, AnimeDB } from '../db/anime.db';
import { AnimeMapperCSVToDB } from '../mappers/anime-mapper';

const csvFile = '../../data/animes.csv';

const delayOf2Sec = (chunk: any) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`\t\tprocessed ${chunk}`)
    }, 2000)
  });
}

let success = 0;
let failure = 0;
let counter = 0
const readFile = (csvFile: string) => {
  fs.createReadStream(csvFile, { encoding: "utf-8" })
    .pipe((csvParser()))
    .on("data", (chunk) => {
      console.log(`proceesing ${counter} / 15000`);
      counter += 1;
      // console.log(chunk);

      const animeDbRow: AnimeDbRow = AnimeMapperCSVToDB(chunk);
      setTimeout(() => {
        AnimeDB.saveAnime(animeDbRow).then((res: number) => {
          console.log(res);
          success += 1;
        }).catch((e: any) => {
          console.log(e);
          failure += 1;
        })
      }, 1000 + 100 * counter)

    })
    .on("error", (error) => {
      console.log(error);
    })
    .on('end', () => {
      console.log(`sucess : ${success} failure ${failure}`);
    });
}

readFile(csvFile);