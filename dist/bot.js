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
const dotenv_1 = require("dotenv");
dotenv_1.config();
const discord_js_1 = require("discord.js");
const config_json_1 = require("./config.json");
const node_fetch_1 = __importDefault(require("node-fetch"));
const client = new discord_js_1.Client();
client.on('ready', () => {
    console.log('bot Is READY');
});
client.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.content.startsWith(config_json_1.prefix + 'user ')) {
        const user = message.content.split(' ')[1];
        const response = yield node_fetch_1.default('https://api.github.com/users/' + user);
        const data = yield response.json();
        const secondResponse = yield node_fetch_1.default('https://api.github.com/users/' + user + '/repos?per_page=6');
        const repositories = yield secondResponse.json();
        message.channel.send(data.avatar_url);
        message.channel.send(data.login);
        for (let i = 0; i < repositories.length; i++) {
            message.channel.send(repositories[i].full_name);
        }
    }
}));
client.login(process.env.DISCORD_TOKEN);
