"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastTweetFromTwitterProfile = void 0;
const axios_1 = __importDefault(require("axios"));
const twitterProfileId = process.env.NEXT_PUBLIC_TWITTER_PROFILE_ID;
const twitterBearerTokenId = process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN;
const twitterTimelineEndpoint = `https://api.twitter.com/2/users/${twitterProfileId}/tweets?max_results=5`;
const config = {
    headers: { Authorization: `Bearer ${twitterBearerTokenId}` },
};
function getLastTweetFromTwitterProfile() {
    return __awaiter(this, void 0, void 0, function* () {
        const { data: twitterTimelineData } = yield (0, axios_1.default)(twitterTimelineEndpoint, config);
        return twitterTimelineData;
    });
}
exports.getLastTweetFromTwitterProfile = getLastTweetFromTwitterProfile;
//# sourceMappingURL=tweets.js.map