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
exports.FileUpdater = void 0;
const fs_1 = __importDefault(require("fs"));
/**
 * It takes a file, finds the start and end comment tags, and replaces the content between them with
 * the new content
 * @param {FileUpdaterOptions} options - {
 */
function FileUpdater(options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fileContent = fs_1.default.readFileSync(options.file, 'utf8');
            const currentContent = fileContent;
            const startingTag = `<!-- ${options.tokenStart}:`;
            const endingTag = `<!-- ${options.tokenEnd}:`;
            const closingTag = '-->';
            const startOpenIndex = fileContent.indexOf(startingTag);
            const startCloseIndex = fileContent.indexOf(closingTag, startOpenIndex);
            const endOpenIndex = fileContent.indexOf(endingTag);
            const endCloseIndex = fileContent.indexOf(closingTag, endOpenIndex);
            if (startOpenIndex === -1 ||
                endOpenIndex === -1 ||
                startCloseIndex === -1 ||
                endCloseIndex === -1) {
                throw new Error('Cannot find the comment start/close tags on the file:');
            }
            const newContent = [
                fileContent.slice(0, endOpenIndex + closingTag.length),
                '\n',
                options.content,
                '\n',
                fileContent.slice(startCloseIndex)
            ].join('');
            if (currentContent !== newContent) {
                fs_1.default.writeFileSync(options.file, newContent);
            }
        }
        catch (error) {
            if (error instanceof Error)
                throw error;
            throw new Error('Unable to update file content');
        }
    });
}
exports.FileUpdater = FileUpdater;
