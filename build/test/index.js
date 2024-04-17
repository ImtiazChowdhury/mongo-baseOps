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
// import mongoClient from "@imtiazchowdhury/mongopool";
const __1 = __importDefault(require(".."));
// mongoClient.url = "mongodb://localhost:27017";
// mongoClient.dbName = "baseOpsTest";
const dbOps = new __1.default("user", "baseOpsTest", "mongodb://localhost:27017");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const writeOneResult = yield dbOps.writeOne(dummyUsers[0]);
        const writeManyResult = yield dbOps.writeMany([dummyUsers[1]]);
        console.log({ writeOneResult });
        console.log({ writeManyResult });
        if (writeOneResult["_id"]) {
            console.log({ writeOneResultId: writeOneResult["_id"] });
            const readOneResult = yield dbOps.readOne(writeOneResult["_id"]);
            console.log({ readOneResult });
        }
        const readManyResult = yield dbOps.readMany(writeManyResult.map(i => i._id));
        console.log({ readManyResult });
        const deleteManyResult = yield dbOps.removeMany(writeManyResult.map(i => i._id));
        console.log({ deleteManyResult });
    });
}
const dummyUsers = [
    {
        name: "Imtiaz Chowdhury",
        company: "Sheba Innovations Ltd",
    },
    {
        name: "Fahim Raz",
        company: "Sheba Innovations Ltd",
    }
];
main();
