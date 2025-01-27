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
const config_1 = __importDefault(require("./config/config"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
//handle uncaughtException error
process.on('uncaughtException', error => {
    console.log('uncaughtException');
    process.exit(1);
});
let server;
function main() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.database_url);
            server = app_1.default.listen((_a = config_1.default.port) !== null && _a !== void 0 ? _a : 4000, () => {
                console.log('app is connected with database');
            });
            console.log(config_1.default.database_url);
        }
        catch (error) {
            console.log(error);
        }
        //handle unhandledRejection error
        process.on('unhandledRejection', error => {
            if (server) {
                server.close(() => {
                    console.log('unhandledRejection');
                    process.exit(1);
                });
            }
            else {
                process.exit(1);
            }
        });
    });
}
main();
process.on('SIGTERM', () => {
    console.log('sigterm recieved');
    if (server) {
        server.close();
    }
});
