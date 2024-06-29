"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongopool_1 = require("@imtiazchowdhury/mongopool");
var mongodb_paginate_1 = require("mongodb-paginate");
var mongodb_1 = require("mongodb");
var BaseDatabaseOps = /** @class */ (function () {
    function BaseDatabaseOps(collectionName, dbName, dbUrl, dbOpsOption) {
        this.dbName = null;
        this.dbUrl = null;
        this.dbOpsOption = {
            timestamps: true,
            softDelete: true
        };
        if (dbOpsOption) {
            this.dbOpsOption = __assign(__assign({}, this.dbOpsOption), dbOpsOption);
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
    BaseDatabaseOps.prototype.getDB = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this._db) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, mongopool_1.default.getDB()];
                    case 1:
                        _a._db = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this._db];
                }
            });
        });
    };
    // can't write this.db.collection(this.collectionName) everywhere
    BaseDatabaseOps.prototype.getCollection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this._collection) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, this.getDB()];
                    case 1: return [4 /*yield*/, (_b.sent()).collection(this.collectionName)];
                    case 2:
                        _a._collection = _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/, this._collection];
                }
            });
        });
    };
    BaseDatabaseOps.prototype.getClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.client) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, mongopool_1.default.getClient()];
                    case 1:
                        _a.client = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.client];
                }
            });
        });
    };
    BaseDatabaseOps.prototype.writeOne = function (doc, options) {
        return __awaiter(this, void 0, void 0, function () {
            var entity, writeResults, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entity = doc;
                        if (this.dbOpsOption.timestamps) {
                            entity.createdAt = new Date();
                            entity.lastUpdateAt = new Date();
                        }
                        if (this.dbOpsOption.softDelete) {
                            entity.deleted = false;
                            entity.deletedAt = null;
                        }
                        return [4 /*yield*/, this.getCollection()];
                    case 1: return [4 /*yield*/, (_a.sent()).insertOne(entity, options)];
                    case 2:
                        writeResults = _a.sent();
                        result = __assign({ _id: writeResults.insertedId }, entity);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    BaseDatabaseOps.prototype.writeMany = function (docs, options) {
        return __awaiter(this, void 0, void 0, function () {
            var entityList, writeResults, resultList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entityList = docs;
                        if (this.dbOpsOption.timestamps) {
                            entityList = entityList.map(function (doc) {
                                return __assign(__assign({}, doc), { createdAt: new Date(), lastUpdateAt: new Date() });
                            });
                        }
                        if (this.dbOpsOption.softDelete) {
                            entityList = entityList.map(function (doc) {
                                return __assign(__assign({}, doc), { deleted: false, deletedAt: null });
                            });
                        }
                        return [4 /*yield*/, this.getCollection()];
                    case 1: return [4 /*yield*/, (_a.sent()).insertMany(entityList, options)];
                    case 2:
                        writeResults = _a.sent();
                        resultList = entityList.map(function (doc, index) {
                            return __assign({ _id: writeResults.insertedIds[index] }, doc);
                        });
                        return [2 /*return*/, resultList];
                }
            });
        });
    };
    BaseDatabaseOps.prototype.updateOne = function (id_1, entity_1, options_1) {
        return __awaiter(this, arguments, void 0, function (id, entity, options, updateSoftDeletedItems) {
            var updateResults, updateResults;
            if (updateSoftDeletedItems === void 0) { updateSoftDeletedItems = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        delete entity._id;
                        if (this.dbOpsOption.timestamps) {
                            entity.lastUpdateAt = new Date();
                        }
                        if (!(updateSoftDeletedItems || !this.dbOpsOption.softDelete)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getCollection()];
                    case 1: return [4 /*yield*/, (_a.sent()).updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: entity }, options)];
                    case 2:
                        updateResults = _a.sent();
                        return [2 /*return*/, updateResults];
                    case 3: return [4 /*yield*/, this.getCollection()];
                    case 4: return [4 /*yield*/, (_a.sent()).updateOne({ _id: new mongodb_1.ObjectId(id), deleted: false }, { $set: entity }, options)];
                    case 5:
                        updateResults = _a.sent();
                        return [2 /*return*/, updateResults];
                }
            });
        });
    };
    BaseDatabaseOps.prototype.updateMany = function (entityList_1, options_1) {
        return __awaiter(this, arguments, void 0, function (entityList, options, overrideSoftDeleted) {
            var session, updatePromises, _i, entityList_2, entity, id, entityWithoutId, collection, result, modifiedCount, acknowledgedCount, matchedCount, err_1;
            if (overrideSoftDeleted === void 0) { overrideSoftDeleted = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getClient()];
                    case 1:
                        session = (_a.sent()).startSession();
                        session.startTransaction();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 8, , 9]);
                        updatePromises = [];
                        _i = 0, entityList_2 = entityList;
                        _a.label = 3;
                    case 3:
                        if (!(_i < entityList_2.length)) return [3 /*break*/, 6];
                        entity = entityList_2[_i];
                        id = entity["_id"];
                        entityWithoutId = entity;
                        delete entityWithoutId["_id"]; // can  not update _id
                        return [4 /*yield*/, this.getCollection()];
                    case 4:
                        collection = _a.sent();
                        if (this.dbOpsOption.timestamps) {
                            entityWithoutId.lastUpdateAt = new Date();
                        }
                        if (overrideSoftDeleted || !this.dbOpsOption.softDelete) {
                            updatePromises.push(collection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: entityWithoutId }, options));
                        }
                        else {
                            updatePromises.push(collection.updateOne({ _id: new mongodb_1.ObjectId(id), deleted: false }, { $set: entityWithoutId }, options));
                        }
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        session.endSession();
                        return [4 /*yield*/, Promise.all(updatePromises)
                            // return update count
                        ];
                    case 7:
                        result = _a.sent();
                        modifiedCount = result.reduce(function (acc, curr) { return acc + curr.modifiedCount; }, 0);
                        acknowledgedCount = result.reduce(function (acc, curr) { return acc + (curr.acknowledged ? 1 : 0); }, 0);
                        matchedCount = result.reduce(function (acc, curr) { return acc + curr.matchedCount; }, 0);
                        return [2 /*return*/, {
                                modifiedCount: modifiedCount,
                                acknowledged: acknowledgedCount === result.length,
                                matchedCount: matchedCount
                            }];
                    case 8:
                        err_1 = _a.sent();
                        session.abortTransaction();
                        session.endSession();
                        throw err_1;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    BaseDatabaseOps.prototype.readOne = function (id_1) {
        return __awaiter(this, arguments, void 0, function (id, resolve, readSoftDeleted) {
            var result, result;
            if (resolve === void 0) { resolve = {}; }
            if (readSoftDeleted === void 0) { readSoftDeleted = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // this is the bare minimum implementation
                        // resolve will be different for each collection
                        // so this method will have to be overridden if someone tries to resolve any property
                        if (Object.keys(resolve).length) {
                            console.warn("base implementation doesn't respond to `resolve`. You need to override the `readOne` method for collection " + this.collectionName);
                        }
                        if (!(readSoftDeleted || !this.dbOpsOption.softDelete)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getCollection()];
                    case 1: return [4 /*yield*/, (_a.sent()).findOne({ _id: new mongodb_1.ObjectId(id) })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3: return [4 /*yield*/, this.getCollection()];
                    case 4: return [4 /*yield*/, (_a.sent()).findOne({ _id: new mongodb_1.ObjectId(id), deleted: false })];
                    case 5:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    BaseDatabaseOps.prototype.readMany = function (id_1) {
        return __awaiter(this, arguments, void 0, function (id, resolve, readSoftDeleted) {
            var result, result;
            if (resolve === void 0) { resolve = {}; }
            if (readSoftDeleted === void 0) { readSoftDeleted = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // this is the bare minimum implementation
                        // resolve will be different for each collection
                        // so this method will have to be overridden if someone tries to resolve any property
                        if (Object.keys(resolve).length) {
                            console.warn("base implementation doesn't respond to `resolve`. You need to override the `readMany` method for collection " + this.collectionName);
                        }
                        if (!(readSoftDeleted || !this.dbOpsOption.softDelete)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getCollection()];
                    case 1: return [4 /*yield*/, (_a.sent()).find({
                            _id: { $in: id.map(function (i) { return new mongodb_1.ObjectId(i); }) }
                        }).toArray()];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3: return [4 /*yield*/, this.getCollection()];
                    case 4: return [4 /*yield*/, (_a.sent()).find({
                            _id: { $in: id.map(function (i) { return new mongodb_1.ObjectId(i); }) },
                            deleted: false
                        }).toArray()];
                    case 5:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    BaseDatabaseOps.prototype.list = function () {
        return __awaiter(this, arguments, void 0, function (filter, resolve, paginationOptions) {
            if (filter === void 0) { filter = {}; }
            if (resolve === void 0) { resolve = {}; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // only support pagination options here
                        // filter & resolve will be different queries for each collection
                        // so the developer will have to override them if he needs filtering and resolve
                        if (Object.keys(filter).length) {
                            console.warn("base implementation doesn't respond to `filter`. You need to override the `list` method for collection " + this.collectionName);
                        }
                        if (Object.keys(resolve).length) {
                            console.warn("base implementation doesn't respond to `resolve`. You need to override the `list` method for collection " + this.collectionName);
                        }
                        return [4 /*yield*/, this.paginate([], [], paginationOptions)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BaseDatabaseOps.prototype.removeOne = function (id_1) {
        return __awaiter(this, arguments, void 0, function (id, hardDelete) {
            var deleteResult, updateDeleteResult;
            if (hardDelete === void 0) { hardDelete = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(hardDelete || !this.dbOpsOption.softDelete)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getCollection()];
                    case 1:
                        deleteResult = (_a.sent()).deleteOne({ _id: new mongodb_1.ObjectId(id) });
                        return [2 /*return*/, deleteResult];
                    case 2: return [4 /*yield*/, this.getCollection()];
                    case 3: return [4 /*yield*/, (_a.sent()).updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { deleted: true, deletedAt: new Date() } })];
                    case 4:
                        updateDeleteResult = _a.sent();
                        return [2 /*return*/, {
                                deletedCount: updateDeleteResult.modifiedCount,
                                acknowledged: updateDeleteResult.acknowledged
                            }];
                }
            });
        });
    };
    BaseDatabaseOps.prototype.removeMany = function (idList_1) {
        return __awaiter(this, arguments, void 0, function (idList, hardDelete) {
            var deleteResults, collection, updateDeleteResults;
            if (hardDelete === void 0) { hardDelete = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Array.isArray(idList)) {
                            throw new TypeError("idList must be an array, received " + typeof idList);
                        }
                        if (!(hardDelete || !this.dbOpsOption.softDelete)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getCollection()];
                    case 1: return [4 /*yield*/, (_a.sent()).deleteMany({ _id: { $in: idList.map(function (i) { return new mongodb_1.ObjectId(i); }) } })];
                    case 2:
                        deleteResults = _a.sent();
                        return [2 /*return*/, deleteResults];
                    case 3: return [4 /*yield*/, this.getCollection()];
                    case 4:
                        collection = _a.sent();
                        return [4 /*yield*/, collection.updateMany({ _id: { $in: idList.map(function (i) { return new mongodb_1.ObjectId(i); }) } }, { $set: { deleted: true, deletedAt: new Date() } })];
                    case 5:
                        updateDeleteResults = _a.sent();
                        return [2 /*return*/, {
                                deletedCount: updateDeleteResults.modifiedCount,
                                acknowledged: updateDeleteResults.acknowledged
                            }];
                }
            });
        });
    };
    BaseDatabaseOps.prototype.paginate = function (prePagingState_1, postPagingStage_1, options_1, facet_1, aggregateOptions_1) {
        return __awaiter(this, arguments, void 0, function (prePagingState, postPagingStage, options, facet, aggregateOptions, listSoftDeleted) {
            var _a, newPrePagingState, _b;
            if (listSoftDeleted === void 0) { listSoftDeleted = false; }
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(listSoftDeleted || !this.dbOpsOption.softDelete)) return [3 /*break*/, 3];
                        _a = mongodb_paginate_1.default;
                        return [4 /*yield*/, this.getCollection()];
                    case 1: return [4 /*yield*/, _a.apply(void 0, [_c.sent(), prePagingState, postPagingStage, options, facet, aggregateOptions])];
                    case 2: return [2 /*return*/, _c.sent()];
                    case 3:
                        newPrePagingState = __spreadArray(__spreadArray([], prePagingState, true), [
                            {
                                $match: {
                                    deleted: false
                                }
                            }
                        ], false);
                        _b = mongodb_paginate_1.default;
                        return [4 /*yield*/, this.getCollection()];
                    case 4: return [4 /*yield*/, _b.apply(void 0, [_c.sent(), newPrePagingState, postPagingStage, options, facet, aggregateOptions])];
                    case 5: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    BaseDatabaseOps.ObjectId = mongodb_1.ObjectId;
    BaseDatabaseOps.mongodb = mongodb_1.default;
    return BaseDatabaseOps;
}());
exports.default = BaseDatabaseOps;
