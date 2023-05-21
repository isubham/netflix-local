import assert from "node:assert";
import { AnimeDbRow, AnimeDB } from "../../db/anime.db";

import { test } from "node:test";
import { AnimeMapperCSVToDB } from "../../mappers/anime-mapper";

test('saveAnime with correct details', async () => {

    const animeFromCSV = {
        uid: '3588',
        title: 'Soul Eater',
        synopsis: `Death City is home to the famous Death Weapon Meister Academy, a technical academy headed by the Shinigami—Lord Death himself. Its mission: to raise "Death Scythes" for the Shinigami to wield against the many evils of their fantastical world. These Death Scythes, however, are not made from physical weapons; rather, they are born from human hybrids who have the ability to transform their bodies into Demon Weapons, and only after they have consumed the souls of 99 evil beings and one witch's soul. \r\n` +
            ' \r\n' +
            "Soul Eater Evans, a Demon Scythe who only seems to care about what's cool, aims to become a Death Scythe with the help of his straight-laced wielder, or meister, Maka Albarn. The contrasting duo work and study alongside the hot headed Black☆Star and his caring weapon Tsubaki, as well as the Shinigami's own son, Death the Kid, an obsessive-compulsive dual wielder of twin pistols Patty and Liz. \r\n" +
            ' \r\n' +
            " Soul Eater  follows these students of Shibusen as they take on missions to collect souls and protect the city from the world's threats while working together under the snickering sun to become sounder in mind, body, and soul. \r\n" +
            ' \r\n' +
            '[Written by MAL Rewrite]',
        genre: "['Action', 'Fantasy', 'Comedy', 'Supernatural', 'Shounen']",
        aired: 'Apr 7, 2008 to Mar 30, 2009',
        episodes: '51.0',
        members: '970841',
        popularity: '32',
        ranked: '606.0',
        score: '7.99',
        img_url: 'https://cdn.myanimelist.net/images/anime/9/7804.jpg',
        link: 'https://myanimelist.net/anime/3588/Soul_Eater'
    };

    const animeDbRow = AnimeMapperCSVToDB(animeFromCSV);
    const insertedRowCount = await AnimeDB.saveAnime(animeDbRow);
    assert.equal(insertedRowCount, 0);
});

test('getAnime with page 1 size 2 order by uid', async () => {
    const insertedRowCount = await AnimeDB.getAnime(1, 2, 'uid', 'ASC');
    assert.equal(insertedRowCount.length, 2);
});

test('getAnime with page 1 size 2 order by popularity', async () => {
    const insertedRowCount = await AnimeDB.getAnime(1, 2, 'popularity', 'ASC');
    assert.equal(insertedRowCount.length, 2);
});

test('getAnime with page 1 size 2 order by members', async () => {
    const insertedRowCount = await AnimeDB.getAnime(1, 30, 'members', 'DESC');
    assert.equal(insertedRowCount.length, 2);
});

test('search "shig"', async () => {
    const searchedAnime = await AnimeDB.search('Shig');
    assert.ok(searchedAnime);
});

