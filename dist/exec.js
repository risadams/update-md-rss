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
exports.exec = void 0;
const child_process_1 = require("child_process");
/**
 * Executes a command and returns its result as promise
 * @param cmd {string} command to execute
 * @param args {array} command line args
 * @param options {Object} extra options
 * @return {Promise<Object>}
 */
function exec(cmd, args, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let outputData = '';
            const optionsToCLI = Object.assign({}, options);
            if (!optionsToCLI.stdio) {
                Object.assign(optionsToCLI, { stdio: ['inherit', 'inherit', 'inherit'] });
            }
            const app = (0, child_process_1.spawn)(cmd, args, optionsToCLI);
            if (app.stdout) {
                // Only needed for pipes
                app.stdout.on('data', function (data) {
                    outputData += data.toString();
                });
            }
            app.on('close', (code) => {
                if (code !== 0) {
                    return reject(new Error(`${code} ${outputData})`));
                }
                return resolve({ code, outputData });
            });
            app.on('error', () => reject(new Error(`1 ${outputData})`)));
        });
    });
}
exports.exec = exec;
