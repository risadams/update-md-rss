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
exports.FeedParser = void 0;
const rss_parser_1 = __importDefault(require("rss-parser"));
/**
 * It takes a list of RSS feed URLs, fetches them, parses them, and returns a list of posts
 * @param {FeedParserOptions} options - FeedParserOptions
 * @returns An array of Feed objects.
 */
function FeedParser(options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const parser = new rss_parser_1.default({
            headers: {
                'User-Agent': options.userAgent
            }
        });
        if (isNaN(options.maxItems)) {
            throw new Error('max items not a number');
        }
        if (options.feedNamesList.length === 0) {
            throw new Error('feed_list should have at least one url');
        }
        const parsedFeeds = [];
        for (const feedUrl of options.feedNamesList) {
            const feed = yield parser.parseURL(feedUrl);
            const posts = [];
            const title = feed.title;
            for (const item of feed.items) {
                const categories = item.categories ? item.categories : [];
                const post = {
                    title: item.title,
                    url: (_a = item.link) === null || _a === void 0 ? void 0 : _a.trim(),
                    date: item.pubDate ? new Date(item.pubDate) : Date.now(),
                    description: item.contentSnippet ? item.contentSnippet.trim() : '',
                    categories
                };
                posts.push(post);
            }
            posts.sort((a, b) => b.date.valueOf() - a.date.valueOf());
            posts.slice(0, options.maxItems);
            parsedFeeds.push({ title, posts });
        }
        return parsedFeeds;
    });
}
exports.FeedParser = FeedParser;
