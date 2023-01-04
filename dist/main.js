"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const core = __importStar(require("@actions/core"));
const process = __importStar(require("process"));
const feed_parser_1 = require("./feed-parser");
const template_builder_1 = require("./template-builder");
const file_updater_1 = require("./file-updater");
const exec_1 = require("./exec");
function run() {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            core.debug(new Date().toTimeString());
            const GITHUB_TOKEN = core.getInput('gh_token');
            const rawFeedListArg = (_a = core.getInput('feed_list')) === null || _a === void 0 ? void 0 : _a.trim();
            const userAgent = (_b = core.getInput('user_agent')) === null || _b === void 0 ? void 0 : _b.trim();
            const maxItems = parseInt(core.getInput('max_items'), 10);
            const filePath = (_c = core.getInput('file_path')) === null || _c === void 0 ? void 0 : _c.trim();
            const gitUser = core.getInput('commit_email');
            const gitEmail = core.getInput('committer_email');
            const commitMessage = core.getInput('commit_message');
            core.setSecret(GITHUB_TOKEN);
            // Reading feed list from the workflow input
            const feedList = rawFeedListArg.split(',').map(item => item.trim());
            if (feedList.length === 0) {
                core.error('feed_list should have at least one url');
                process.exit(1);
            }
            // Grabbing feed names and converting it into array
            const feedNames = core.getInput('feed_names').trim();
            const feedNamesList = feedNames.split(',').map(item => item.trim());
            // Fetch and parse feeds
            const feeds = yield (0, feed_parser_1.FeedParser)({
                feedNamesList,
                userAgent,
                maxItems
            });
            // Converte the parsed feeds into a markdown template
            const template = yield (0, template_builder_1.TemplateBuilder)(feeds);
            yield (0, file_updater_1.FileUpdater)({
                file: filePath,
                tokenStart: 'REPLACE_BLOG_START',
                tokenEnd: 'REPLACE_BLOG_END',
                content: template
            });
            // Commit to readme
            //set git email address
            yield (0, exec_1.exec)('git', ['config', '--global', 'user.email', gitEmail], {});
            yield (0, exec_1.exec)('git', ['config', '--global', 'user.name', gitUser], {});
            //set git auth token
            yield (0, exec_1.exec)('git', [
                'remote',
                'set-url',
                'origin',
                `https://${GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`
            ], {});
            yield (0, exec_1.exec)('git', ['add', filePath], {});
            yield (0, exec_1.exec)('git', ['commit', '-m', commitMessage], {});
            yield (0, exec_1.exec)('git', ['push'], {});
            core.debug(new Date().toTimeString());
            core.setOutput('time', new Date().toTimeString());
        }
        catch (error) {
            if (error instanceof Error)
                core.setFailed(error.message);
        }
    });
}
run();
