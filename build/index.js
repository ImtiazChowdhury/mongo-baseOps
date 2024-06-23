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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongopool_1 = __importDefault(require("@imtiazchowdhury/mongopool"));
const mongodb_paginate_1 = __importDefault(require("mongodb-paginate"));
const mongodb_1 = __importStar(require("mongodb"));
class BaseDatabaseOps {
    constructor(collectionName, dbName, dbUrl, dbOpsOption) {
        this.dbName = null;
        this.dbUrl = null;
        this.dbOpsOption = {
            timestamps: true,
            softDelete: true
        };
        if (dbOpsOption) {
            this.dbOpsOption = Object.assign(Object.assign({}, this.dbOpsOption), dbOpsOption);
        }
        if (!collectionName || typeof collectionName !== "string") {
            throw new TypeError("first argument collectionName must be string, received " + typeof collectionName);
        }
        if (dbName) {
            this.dbName = dbName;
            mongopool_1.default.dbName = dbName;
        }
        if (dbUrl) {
            this.dbUrl = dbUrl;
            mongopool_1.default.url = dbUrl;
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
            let entity = doc;
            if (this.dbOpsOption.timestamps) {
                entity.createdAt = new Date();
                entity.lastUpdateAt = new Date();
            }
            if (this.dbOpsOption.softDelete) {
                entity.deleted = false;
                entity.deletedAt = null;
            }
            const writeResults = yield (yield this.getCollection()).insertOne(entity, options);
            const result = Object.assign({ _id: writeResults.insertedId }, entity);
            return result;
        });
    }
    writeMany(docs, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let entityList = docs;
            if (this.dbOpsOption.timestamps) {
                entityList = entityList.map(doc => {
                    return Object.assign(Object.assign({}, doc), { createdAt: new Date(), lastUpdateAt: new Date() });
                });
            }
            if (this.dbOpsOption.softDelete) {
                entityList = entityList.map(doc => {
                    return Object.assign(Object.assign({}, doc), { deleted: false, deletedAt: null });
                });
            }
            const writeResults = yield (yield this.getCollection()).insertMany(entityList, options);
            const resultList = entityList.map((doc, index) => {
                return Object.assign({ _id: writeResults.insertedIds[index] }, doc);
            });
            return resultList;
        });
    }
    updateOne(id_1, entity_1, options_1) {
        return __awaiter(this, arguments, void 0, function* (id, entity, options, updateSoftDeletedItems = false) {
            delete entity._id;
            if (this.dbOpsOption.timestamps) {
                entity.lastUpdateAt = new Date();
            }
            if (updateSoftDeletedItems || !this.dbOpsOption.softDelete) {
                const updateResults = yield (yield this.getCollection()).updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: entity }, options);
                return updateResults;
            }
            else {
                const updateResults = yield (yield this.getCollection()).updateOne({ _id: new mongodb_1.ObjectId(id), deleted: false }, { $set: entity }, options);
                return updateResults;
            }
        });
    }
    updateMany(entityList_1, options_1) {
        return __awaiter(this, arguments, void 0, function* (entityList, options, overrideSoftDeleted = false) {
            const session = (yield this.getClient()).startSession();
            session.startTransaction();
            try {
                const updatePromises = [];
                for (let entity of entityList) {
                    const id = entity["_id"];
                    const entityWithoutId = entity;
                    delete entityWithoutId["_id"]; // can  not update _id
                    const collection = yield this.getCollection();
                    if (this.dbOpsOption.timestamps) {
                        entityWithoutId.lastUpdateAt = new Date();
                    }
                    if (overrideSoftDeleted || !this.dbOpsOption.softDelete) {
                        updatePromises.push(collection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: entityWithoutId }, options));
                    }
                    else {
                        updatePromises.push(collection.updateOne({ _id: new mongodb_1.ObjectId(id), deleted: false }, { $set: entityWithoutId }, options));
                    }
                }
                session.endSession();
                const result = yield Promise.all(updatePromises);
                // return update count
                const modifiedCount = result.reduce((acc, curr) => acc + curr.modifiedCount, 0);
                const acknowledgedCount = result.reduce((acc, curr) => acc + (curr.acknowledged ? 1 : 0), 0);
                const matchedCount = result.reduce((acc, curr) => acc + curr.matchedCount, 0);
                return {
                    modifiedCount,
                    acknowledged: acknowledgedCount === result.length,
                    matchedCount
                };
            }
            catch (err) {
                session.abortTransaction();
                session.endSession();
                throw err;
            }
        });
    }
    readOne(id_1) {
        return __awaiter(this, arguments, void 0, function* (id, resolve = {}, readSoftDeleted = false) {
            // this is the bare minimum implementation
            // resolve will be different for each collection
            // so this method will have to be overridden if someone tries to resolve any property
            if (Object.keys(resolve).length) {
                console.warn("base implementation doesn't respond to `resolve`. You need to override the `readOne` method for collection " + this.collectionName);
            }
            if (readSoftDeleted || !this.dbOpsOption.softDelete) {
                const result = yield (yield this.getCollection()).findOne({ _id: new mongodb_1.ObjectId(id) });
                return result;
            }
            else {
                const result = yield (yield this.getCollection()).findOne({ _id: new mongodb_1.ObjectId(id), deleted: false });
                return result;
            }
        });
    }
    readMany(id_1) {
        return __awaiter(this, arguments, void 0, function* (id, resolve = {}, readSoftDeleted = false) {
            // this is the bare minimum implementation
            // resolve will be different for each collection
            // so this method will have to be overridden if someone tries to resolve any property
            if (Object.keys(resolve).length) {
                console.warn("base implementation doesn't respond to `resolve`. You need to override the `readMany` method for collection " + this.collectionName);
            }
            if (readSoftDeleted || !this.dbOpsOption.softDelete) {
                const result = yield (yield this.getCollection()).find({
                    _id: { $in: id.map(i => new mongodb_1.ObjectId(i)) }
                }).toArray();
                return result;
            }
            else {
                const result = yield (yield this.getCollection()).find({
                    _id: { $in: id.map(i => new mongodb_1.ObjectId(i)) },
                    deleted: false
                }).toArray();
                return result;
            }
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
            return yield this.paginate([], [], paginationOptions);
        });
    }
    removeOne(id_1) {
        return __awaiter(this, arguments, void 0, function* (id, hardDelete = false) {
            if (hardDelete || !this.dbOpsOption.softDelete) {
                const deleteResult = (yield this.getCollection()).deleteOne({ _id: new mongodb_1.ObjectId(id) });
                return deleteResult;
            }
            else {
                const updateDeleteResult = yield (yield this.getCollection()).updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { deleted: true, deletedAt: new Date() } });
                return {
                    deletedCount: updateDeleteResult.modifiedCount,
                    acknowledged: updateDeleteResult.acknowledged
                };
            }
        });
    }
    removeMany(idList_1) {
        return __awaiter(this, arguments, void 0, function* (idList, hardDelete = false) {
            if (!Array.isArray(idList)) {
                throw new TypeError("idList must be an array, received " + typeof idList);
            }
            if (hardDelete || !this.dbOpsOption.softDelete) {
                const deleteResults = yield (yield this.getCollection()).deleteMany({ _id: { $in: idList.map(i => new mongodb_1.ObjectId(i)) } });
                return deleteResults;
            }
            else {
                const collection = yield this.getCollection();
                const updateDeleteResults = yield collection.updateMany({ _id: { $in: idList.map(i => new mongodb_1.ObjectId(i)) } }, { $set: { deleted: true, deletedAt: new Date() } });
                return {
                    deletedCount: updateDeleteResults.modifiedCount,
                    acknowledged: updateDeleteResults.acknowledged
                };
            }
        });
    }
    paginate(prePagingState_1, postPagingStage_1, options_1, facet_1, aggregateOptions_1) {
        return __awaiter(this, arguments, void 0, function* (prePagingState, postPagingStage, options, facet, aggregateOptions, listSoftDeleted = false) {
            if (listSoftDeleted || !this.dbOpsOption.softDelete) {
                return yield (0, mongodb_paginate_1.default)(yield this.getCollection(), prePagingState, postPagingStage, options, facet, aggregateOptions);
            }
            else {
                const newPrePagingState = [
                    ...prePagingState,
                    {
                        $match: {
                            deleted: false
                        }
                    }
                ];
                return yield (0, mongodb_paginate_1.default)(yield this.getCollection(), newPrePagingState, postPagingStage, options, facet, aggregateOptions);
            }
        });
    }
}
BaseDatabaseOps.ObjectId = mongodb_1.ObjectId;
BaseDatabaseOps.mongodb = mongodb_1.default;
exports.default = BaseDatabaseOps;
