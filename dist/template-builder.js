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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateBuilder = void 0;
/**
 * It takes an array of feeds and returns a string of generated markdown
 * @param {Feed[]} feeds - Feed[]
 * @returns A string of markdown.
 */
function TemplateBuilder(feeds) {
    return __awaiter(this, void 0, void 0, function* () {
        let md = '';
        for (const feed of feeds) {
            md += `### ${feed.title}\n\n`;
            for (const post of feed.posts) {
                md += `- [${post.title}](${post.url})\n\n`;
                //md += `${post.description}\n\n`
            }
        }
        return md;
    });
}
exports.TemplateBuilder = TemplateBuilder;
