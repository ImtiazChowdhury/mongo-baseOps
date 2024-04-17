
import client from "@imtiazchowdhury/mongopool";
import paginate from "mongodb-paginate";
import mongodb, {ObjectId} from "mongodb"
import { PaginationOptions } from "mongodb-paginate/dist/types/types";

class BaseDatabaseOps {
    private _db: mongodb.Db | null;
    public collectionName: string;
    public dbName: string | null = null;
    public dbUrl: string | null = null;
    private _collection: mongodb.Collection | null;
    public client: mongodb.MongoClient | null;

    public static ObjectId = ObjectId;
    public static mongodb = mongodb;

    constructor(collectionName: string, dbName?: string, dbUrl?: string) {

        if (!collectionName || typeof collectionName !== "string") {
            throw new TypeError("first argument collectionName must be string, received " + typeof collectionName);
        }

        if(dbName){
            this.dbName = dbName;
            client.dbName = dbName
        }
        if(dbUrl){
            this.dbUrl = dbUrl;
            client.url = dbUrl
        }

        this._db = null;

        this.collectionName = collectionName;

        this._collection = null;

        this.client = null;

    }


    async getDB() {

        //wait until first query attempt is made before getting db object
        if (!this._db) {
            this._db = await client.getDB();
        }
        return this._db;
    }

    // can't write this.db.collection(this.collectionName) everywhere
    async getCollection() {
        //wait until first query attempt is made before storing collection object
        if (!this._collection) {
            this._collection = await (await this.getDB()).collection(this.collectionName)
        }
        return this._collection
    }



    async getClient() {
        //wait until first query attempt is made before storing client object
        if (!this.client) {
            this.client = await client.getClient()
        }
        return this.client
    }



    async writeOne(doc: mongodb.OptionalId<mongodb.BSON.Document>, options?: mongodb.InsertOneOptions) {
        console.log({doc})
        const writeResults = await (await this.getCollection()).insertOne(doc, options);

        doc["_id"] = writeResults.insertedId;
        return doc;
    }


    async writeMany(docs: mongodb.OptionalId<mongodb.BSON.Document>[], options?: mongodb.BulkWriteOptions) {
        const writeResults = await (await this.getCollection()).insertMany(docs, options);

        for (let key in writeResults.insertedIds) {
            const id = writeResults.insertedIds[key];
            const entity = docs[key]
            if (entity && id) {
                entity["_id"] = id;
            }
        }
        return docs;
    }



    async updateOne(id: string | ObjectId, entity: mongodb.OptionalId<mongodb.BSON.Document>, options?: mongodb.UpdateOptions) {
        const updateResults = await (await this.getCollection()).updateOne({ _id: new ObjectId(id) }, { $set: entity }, options)
        return updateResults;
    }



    async updateMany(entityList: Array<mongodb.OptionalId<mongodb.BSON.Document>>, options?: mongodb.UpdateOptions) {

        const session = (await this.getClient()).startSession();
        session.startTransaction();

        try {
            const updatePromises = []
            for (let entity of entityList) {

                const id = entity["_id"];
                delete entity["_id"]; // can  not update _id

                const collection = await this.getCollection();
                updatePromises.push(
                    collection.updateOne({ _id: new ObjectId(id) }, { $set: entity }, options)
                )
            }

            session.endSession();

            return await Promise.all(updatePromises)
        } catch (err) {
            session.abortTransaction();
            session.endSession();
            throw err;
        }
    }

    async readOne(id: string | ObjectId, resolve: mongodb.Document = {}) {
        // this is the bare minimum implementation
        // resolve will be different for each collection
        // so this method will have to be overridden if someone tries to resolve any property

        if (Object.keys(resolve).length) {
            console.warn("base implementation doesn't respond to `resolve`. You need to override the `readOne` method for collection " + this.collectionName)
        }
        const result = await (await this.getCollection()).findOne({ _id: new ObjectId(id) });
        return result;
    }
    async readMany(id: Array<string | ObjectId | undefined>, resolve: mongodb.Document = {}) {
        // this is the bare minimum implementation
        // resolve will be different for each collection
        // so this method will have to be overridden if someone tries to resolve any property

        if (Object.keys(resolve).length) {
            console.warn("base implementation doesn't respond to `resolve`. You need to override the `readMany` method for collection " + this.collectionName)
        }
        const result = await (await this.getCollection()).find({
            _id: { $in: id.map(i => new ObjectId(i)) }
        }
        ).toArray();
        return result;
    }

    async list(filter = {}, resolve = {}, paginationOptions: PaginationOptions) {

        // only support pagination options here
        // filter & resolve will be different queries for each collection
        // so the developer will have to override them if he needs filtering and resolve

        if (Object.keys(filter).length) {
            console.warn("base implementation doesn't respond to `filter`. You need to override the `list` method for collection " + this.collectionName)
        }
        if (Object.keys(resolve).length) {
            console.warn("base implementation doesn't respond to `resolve`. You need to override the `list` method for collection " + this.collectionName)
        }

        return await paginate(this.collectionName, [], [], paginationOptions)
    }


    async removeOne(id: string | ObjectId) {
        const deleteResult = (await this.getCollection()).deleteOne({ _id: new ObjectId(id) });
        return deleteResult;
    }

    async removeMany(idList: Array<string | ObjectId | undefined>) {
        if (!Array.isArray(idList)) {
            throw new TypeError("idList must be an array, received " + typeof idList)
        }
        const deleteResults = await (await this.getCollection()).deleteMany({ _id: { $in: idList.map(i => new ObjectId(i)) } });
        return deleteResults;
    }
}

export default BaseDatabaseOps;