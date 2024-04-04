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
const mongopool_1 = __importDefault(require("@imtiazchowdhury/mongopool"));
const mongodb_paginate_1 = __importDefault(require("mongodb-paginate"));
const mongodb_1 = require("mongodb");
class BaseDatabaseOps {
    constructor(collectionName) {
        if (!collectionName || typeof collectionName !== "string") {
            throw new TypeError("first argument collectionName must be string, received " + typeof collectionName);
        }
        this._db = null;
        this.collectionName = collectionName;
        this._collection = null;
        this.client = null;
    }
    getDB() {
        return __awaiter(this, void 0, void 0, function* () {
            //wait until first query attempt is made before getting db object
            if (!this._db) {
                this._db = yield mongopool_1.default.getDB();
            }
            return this._db;
        });
    }
    // can't write this.db.collection(this.collectionName) everywhere
    getCollection() {
        return __awaiter(this, void 0, void 0, function* () {
            //wait until first query attempt is made before storing collection object
            if (!this._collection) {
                this._collection = yield (yield this.getDB()).collection(this.collectionName);
            }
            return this._collection;
        });
    }
    getClient() {
        return __awaiter(this, void 0, void 0, function* () {
            //wait until first query attempt is made before storing client object
            if (!this.client) {
                this.client = yield mongopool_1.default.getClient();
            }
            return this.client;
        });
    }
    writeOne(doc, options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log({ doc });
            const writeResults = yield (yield this.getCollection()).insertOne(doc, options);
            doc["_id"] = writeResults.insertedId;
            return doc;
        });
    }
    writeMany(docs, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const writeResults = yield (yield this.getCollection()).insertMany(docs, options);
            for (let key in writeResults.insertedIds) {
                const id = writeResults.insertedIds[key];
                const entity = docs[key];
                if (entity && id) {
                    entity["_id"] = id;
                }
            }
            return docs;
        });
    }
    updateOne(id, entity, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateResults = yield (yield this.getCollection()).updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: entity }, options);
            return updateResults;
        });
    }
    updateMany(entityList, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = (yield this.getClient()).startSession();
            session.startTransaction();
            try {
                const updatePromises = [];
                for (let entity of entityList) {
                    const id = entity["_id"];
                    delete entity["_id"]; // can  not update _id
                    const collection = yield this.getCollection();
                    updatePromises.push(collection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: entity }, options));
                }
                session.endSession();
                return yield Promise.all(updatePromises);
            }
            catch (err) {
                session.abortTransaction();
                session.endSession();
                throw err;
            }
        });
    }
    readOne(id_1) {
        return __awaiter(this, arguments, void 0, function* (id, resolve = {}) {
            // this is the bare minimum implementation
            // resolve will be different for each collection
            // so this method will have to be overridden if someone tries to resolve any property
            if (Object.keys(resolve).length) {
                console.warn("base implementation doesn't respond to `resolve`. You need to override the `readOne` method for collection " + this.collectionName);
            }
            const result = yield (yield this.getCollection()).findOne({ _id: new mongodb_1.ObjectId(id) });
            return result;
        });
    }
    readMany(id_1) {
        return __awaiter(this, arguments, void 0, function* (id, resolve = {}) {
            // this is the bare minimum implementation
            // resolve will be different for each collection
            // so this method will have to be overridden if someone tries to resolve any property
            if (Object.keys(resolve).length) {
                console.warn("base implementation doesn't respond to `resolve`. You need to override the `readMany` method for collection " + this.collectionName);
            }
            const result = yield (yield this.getCollection()).find({
                _id: { $in: id.map(i => new mongodb_1.ObjectId(i)) }
            }).toArray();
            return result;
        });
    }
    list() {
        return __awaiter(this, arguments, void 0, function* (filter = {}, resolve = {}, paginationOptions) {
            // only support pagination options here
            // filter & resolve will be different queries for each collection
            // so the developer will have to override them if he needs filtering and resolve
            if (Object.keys(filter).length) {
                console.warn("base implementation doesn't respond to `filter`. You need to override the `list` method for collection " + this.collectionName);
            }
            if (Object.keys(resolve).length) {
                console.warn("base implementation doesn't respond to `resolve`. You need to override the `list` method for collection " + this.collectionName);
            }
            return yield (0, mongodb_paginate_1.default)(this.collectionName, [], [], paginationOptions);
        });
    }
    removeOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = (yield this.getCollection()).deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return deleteResult;
        });
    }
    removeMany(idList) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(idList)) {
                throw new TypeError("idList must be an array, received " + typeof idList);
            }
            const deleteResults = yield (yield this.getCollection()).deleteMany({ _id: { $in: idList.map(i => new mongodb_1.ObjectId(i)) } });
            return deleteResults;
        });
    }
}
exports.default = BaseDatabaseOps;
