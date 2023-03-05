import express from 'express';
import fs from 'fs';
// https://stackabuse.com/bytes/fix-dirname-is-not-defined-in-es-module-scope-in-javascript-node/
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { getFolderHierarchy } from './util.js';

const config =  {
	videoRoot : "Anime"
}

const app = express();


const {
	  createHash,
} = await import('node:crypto');

const sha256 = (data) => createHash('sha256').update(data).digest('hex');


let VideoHashMap = {};

// serve static files
app.use(express.static(__dirname));


app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.get("/details", function (req, res) {
	const videoLocation = getFolderHierarchy(config.videoRoot, []);
	const videos = videoLocation.map(v => { 
		const videoHash = sha256(v);

		VideoHashMap[videoHash] = v;

		return { link : `Anime/${videoHash}`, title: v }
	});
	res.json({ videos });
});

app.get("/Anime/:videoLocation", function (req, res) {

    console.log(req.params.videoLocation);

    const range = req.headers.range;
    if (!range) {
	res.status(400).send("Requires Range header");
    }
    const videoPath = VideoHashMap[req.params.videoLocation];
    console.log(videoPath);
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
		    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
		    "Accept-Ranges": "bytes",
		    "Content-Length": contentLength,
		    "Content-Type": "video/mp4",
		};
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
});

app.listen(8000, function () {
	    console.log("Listening on port 8000!");
});
