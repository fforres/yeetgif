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
exports.yeetGif = void 0;
const execa_1 = __importDefault(require("execa"));
const os_1 = __importDefault(require("os"));
const fs_1 = require("fs");
const rmfr_1 = __importDefault(require("rmfr"));
const path_1 = require("path");
const { mkdir } = fs_1.promises;
const isMac = (platform) => platform === "darwin";
const isLinux = (platform) => platform === "linux";
const getExecutable = () => {
    const platform = os_1.default.platform();
    if (isMac(platform)) {
        return path_1.resolve(__dirname, "../binaries/gif_osx");
    }
    if (isLinux(platform)) {
        return path_1.resolve(__dirname, "../binaries/gif_linux");
    }
    throw new Error(`Unsupported OS ${platform}`);
};
exports.yeetGif = (inputPath, outputPath, settings) => __awaiter(void 0, void 0, void 0, function* () {
    if (!inputPath) {
        throw new Error("No input path defined for yeetGif");
    }
    if (!outputPath) {
        throw new Error("No output path defined for yeetGif");
    }
    if (!settings.commands.length) {
        throw new Error("No commands passed to yeetGif");
    }
    const yeetGifArguments = [];
    settings.commands.forEach(({ command, options = {} }) => {
        const commandOptions = Object.entries(options).map(([key, value]) => `--${key} ${value}`);
        yeetGifArguments.push([getExecutable(), `--quiet`, command, ...commandOptions].join(" "));
    });
    try {
        yield mkdir(path_1.dirname(outputPath), { recursive: true });
        yield rmfr_1.default(outputPath);
        yield execa_1.default(`<${inputPath}`, [yeetGifArguments.join(" | "), `>${outputPath}`], {
            shell: true,
        });
        return outputPath;
    }
    catch (error) {
        console.error("/////  errror  /////");
        console.error(error);
        error.message = error.stderr || error.message;
        throw error;
    }
});
//# sourceMappingURL=index.js.map