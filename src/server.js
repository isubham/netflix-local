"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// https://stackabuse.com/bytes/fix-dirname-is-not-defined-in-es-module-scope-in-javascript-node/
const path_1 = __importDefault(require("path"));
// import * as redisWrapper from './modules/redis'
const anime_route_1 = require("./routes/anime.route");
const constants_1 = require("./constants");
const url_builder_1 = require("./utils/url-builder");
const _dirname = process.cwd();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// serve static files
app.use(express_1.default.static(_dirname));
app.use(express_1.default.static(path_1.default.join(_dirname, "../collection/")));
app.use("/anime", anime_route_1.animeRouter);
app.get("/health", (req, res) => {
    console.log("hiting health request");
    res.status(200).send({
        status: "healthy",
        routes: {
            anime: (0, url_builder_1.getRelatedUrl)('/anime')
        }
    });
});
let AnimeCache = [];
// END OF ANIME
app.listen(constants_1.port, async function () {
    // await redisWrapper.connect();
    // AnimeCache = await getAnimeFromCache();
    // console.log('AnimeCache length', AnimeCache.length);
    console.log(`Listening on port ${constants_1.port}!`);
});
