import client from "@imtiazchowdhury/mongopool";
import paginate, { PipelineStage } from "mongodb-paginate";
import mongodb, {
    ObjectId,
    Document,
    WithId,
    OptionalId,
    UpdateResult,
    Filter,
    FindOptions,
    OptionalUnlessRequiredId,
    MatchKeysAndValues,
} from "mongodb"

import {
    EmptyPaginateResult,
    FacetBucketQuery,
    PaginateResult,
    PaginationOptions
} from "mongodb-paginate/dist/types/types";

type DBOpsOption = {
    timestamps: boolean,
    softDelete: boolean,
}

type PaginateResultWithType<Type> = (PaginateResult & { data: Array<Type> }) | EmptyPaginateResult
type WithTimeStamp<Type> = Type & { createdAt?: Date, lastUpdateAt?: Date }
type WithSoftDelete<Type> = Type & { deleted?: boolean, deletedAt?: Date | null }

class BaseDatabaseOps<Type extends WithSoftDelete<WithTimeStamp<Document>> = WithTimeStamp<Document>> {
    private _db: mongodb.Db | null;
    public collectionName: string;
    public dbName: string | null = null;
    public dbUrl: string | null = null;
    private _collection: mongodb.Collection<Type> | null;
    public client: mongodb.MongoClient | null;

    public static ObjectId = ObjectId;
    public static mongodb = mongodb;

    public dbOpsOption: DBOpsOption = {
        timestamps: true,
        softDelete: true
    }

    constructor(collectionName: string, dbName?: string, dbUrl?: string, dbOpsOption?: Partial<DBOpsOption>) {

        if (dbOpsOption) {
            this.dbOpsOption = {
                ...this.dbOpsOption,
                ...dbOpsOption
            }
        }

        if (!collectionName || typeof collectionName !== "string") {
            throw new TypeError("first argument collectionName must be string, received " + typeof collectionName);
        }

        if (dbName) {
            this.dbName = dbName;
            client.dbName = dbName
        }
        if (dbUrl) {
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


    async writeOne(doc: OptionalId<Type>, options?: mongodb.InsertOneOptions): Promise<WithId<WithTimeStamp<Type>>> {
        let entity = doc as OptionalUnlessRequiredId<Type>;

        if (this.dbOpsOption.timestamps) {
            entity.createdAt = new Date();
            entity.lastUpdateAt = new Date();
        }

        if (this.dbOpsOption.softDelete) {
            entity.deleted = false;
            entity.deletedAt = null;
        }

        const collection = await this.getCollection()

        const writeResults = await collection.insertOne(entity, options);
        const result = {
            _id: writeResults.insertedId,
            ...entity,
        } as WithId<Type>
        return result;
    }


    async writeMany(docs: Array<OptionalId<Type>>, options?: mongodb.BulkWriteOptions): Promise<WithId<WithTimeStamp<Type>>[]> {
        let entityList = docs as Array<OptionalUnlessRequiredId<Type>>;

        if (this.dbOpsOption.timestamps) {
            entityList = entityList.map(doc => {
                return {
                    ...doc,
                    createdAt: new Date(),
                    lastUpdateAt: new Date()
                }
            })
        }
        if (this.dbOpsOption.softDelete) {
            entityList = entityList.map(doc => {
                return {
                    ...doc,
                    deleted: false,
                    deletedAt: null
                }
            })
        }

        const collection = await this.getCollection();
        const writeResults = await collection.insertMany(entityList, options);

        const resultList = entityList.map((doc, index) => {
            return {
                _id: writeResults.insertedIds[index],
                ...doc,
            }
        }) as Array<WithId<Type>>

        return resultList;
    }


    async updateOne(
        id: string | ObjectId,
        entity: Partial<Type>,
        options?: mongodb.UpdateOptions,
        updateSoftDeletedItems = false
    ): Promise<UpdateResult<Type>> {

        const collection = await this.getCollection();

        if (this.dbOpsOption.timestamps) {
            entity.lastUpdateAt = new Date();
        }

        const entityWithoutId = entity as MatchKeysAndValues<Type>
        delete entityWithoutId["_id"]; // can  not update _id


        if (updateSoftDeletedItems || !this.dbOpsOption.softDelete) {
            const updateResults = await collection.updateOne({ _id: new ObjectId(id) } as Filter<Type>, { $set: entityWithoutId }, options)
            return updateResults;
        } else {
            const updateResults = await collection.updateOne({
                _id: new ObjectId(id),
                deleted: false
            } as Filter<Type>, { $set: entityWithoutId }, options)
            return updateResults;
        }
    }

    async updateMany(
        entityList: Array<WithId<Partial<Type>>>,
        options?: mongodb.UpdateOptions,
        overrideSoftDeleted = false
    ) {
        const session = (await this.getClient()).startSession();
        session.startTransaction();
        const collection = await this.getCollection();

        try {
            const updatePromises = []
            for (let entity of entityList) {

                const id = entity["_id"];

                if (this.dbOpsOption.timestamps) {
                    entity["lastUpdateAt"] = new Date();
                }

                const entityWithoutId = entity as MatchKeysAndValues<Type>;
                delete entityWithoutId["_id"];


                if (overrideSoftDeleted || !this.dbOpsOption.softDelete) {
                    updatePromises.push(
                        collection.updateOne({ _id: new ObjectId(id) } as Filter<Type>, { $set: entityWithoutId }, options)
                    )
                } else {
                    updatePromises.push(
                        collection.updateOne({ _id: new ObjectId(id), deleted: false } as Filter<Type>, { $set: entityWithoutId }, options)
                    )
                }
            }
            session.endSession();

            const result = await Promise.all(updatePromises)
            // return update count
            const modifiedCount = result.reduce((acc, curr) => acc + curr.modifiedCount, 0);
            const acknowledgedCount = result.reduce((acc, curr) => acc + (curr.acknowledged ? 1 : 0), 0);
            const matchedCount = result.reduce((acc, curr) => acc + curr.matchedCount, 0);
            return {
                modifiedCount,
                acknowledged: acknowledgedCount === result.length,
                matchedCount
            }

        } catch (err) {
            session.abortTransaction();
            session.endSession();
            throw err;
        }
    }

    async readOne(id: string | ObjectId, resolve: mongodb.Document = {}, readSoftDeleted = false): Promise<WithTimeStamp<WithId<Type>> | null> {
        // this is the bare minimum implementation
        // resolve will be different for each collection
        // so this method will have to be overridden if someone tries to resolve any property
        if (Object.keys(resolve).length) {
            console.warn("base implementation doesn't respond to `resolve`. You need to override the `readOne` method for collection " + this.collectionName)
        }

        return await this.findOne({
            _id: new ObjectId(id)
        } as Filter<Type>, {}, readSoftDeleted) as WithTimeStamp<WithId<Type>> | null;
    }

    async readMany(
        id: Array<string | ObjectId | undefined>,
        resolve: mongodb.Document = {},
        readSoftDeleted = false
    ): Promise<Array<WithTimeStamp<WithId<Type>>>> {
        // this is the bare minimum implementation
        // resolve will be different for each collection
        // so this method will have to be overridden if someone tries to resolve any property
        if (Object.keys(resolve).length) {
            console.warn("base implementation doesn't respond to `resolve`. You need to override the `readMany` method for collection " + this.collectionName)
        }
        return await this.find({
            _id: { $in: id.map(i => new ObjectId(i)) }
        } as Filter<Type>, {}, readSoftDeleted)
    }

    async list(filter = {}, resolve = {}, paginationOptions: PaginationOptions): Promise<PaginateResultWithType<Type>> {

        // only support pagination options here
        // filter & resolve will be different queries for each collection
        // so the developer will have to override them if he needs filtering and resolve

        if (Object.keys(filter).length) {
            console.warn("base implementation doesn't respond to `filter`. You need to override the `list` method for collection " + this.collectionName)
        }
        if (Object.keys(resolve).length) {
            console.warn("base implementation doesn't respond to `resolve`. You need to override the `list` method for collection " + this.collectionName)
        }

        return await this.paginate([], [], paginationOptions) as PaginateResultWithType<Type>
    }


    async removeOne(id: string | ObjectId, hardDelete = false) {
        const collection = await this.getCollection();
        if (hardDelete || !this.dbOpsOption.softDelete) {
            const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) } as Filter<Type>);
            return deleteResult;
        } else {
            const updateDeleteResult = await this.updateOne(
                id,
                { deleted: true, deletedAt: new Date() } as Partial<Type>
            )
            return {
                deletedCount: updateDeleteResult.modifiedCount,
                acknowledged: updateDeleteResult.acknowledged
            };
        }
    }

    async removeMany(query: Filter<Type>, hardDelete?: boolean): Promise<mongodb.DeleteResult>;
    async removeMany(idList: Array<string | ObjectId | undefined>, hardDelete?: boolean): Promise<mongodb.DeleteResult>;
    async removeMany(queryOrIdList: Array<string | ObjectId | undefined> | Filter<Type>, hardDelete = false): Promise<mongodb.DeleteResult> {
        const collection = await this.getCollection();
        let filter: Filter<Type>;
    
        if (Array.isArray(queryOrIdList)) {
            // When idList is an array, construct a filter to match documents by _id
            filter = { _id: { $in: queryOrIdList.map(i => i ? new ObjectId(i) : null) } } as Filter<Type>;
        } else if (typeof queryOrIdList === 'object') {
            // When queryOrIdList is a filter object, use it directly
            filter = queryOrIdList;
        } else {
            throw new TypeError("First argument must be an array or a filter object, received " + typeof queryOrIdList);
        }
    
        if (hardDelete || !this.dbOpsOption.softDelete) {
            // Perform hard delete
            return await collection.deleteMany(filter);
        } else {
            // Perform soft delete by updating the document
            const updateDeleteResults = await collection.updateMany(
                filter,
                { $set: { deleted: true, deletedAt: new Date() } as Partial<Type> }
            );
            return {
                deletedCount: updateDeleteResults.modifiedCount,
                acknowledged: updateDeleteResults.acknowledged
            };
        }
    }

    async paginate(
        prePagingState: PipelineStage[],
        postPagingStage: PipelineStage[],
        options: PaginationOptions,
        facet?: FacetBucketQuery[],
        aggregateOptions?: mongodb.AggregateOptions,
        listSoftDeleted = false
    ): Promise<PaginateResultWithType<WithTimeStamp<WithId<Type>>>> {
        if (listSoftDeleted || !this.dbOpsOption.softDelete) {
            return await paginate(await this.getCollection(), prePagingState, postPagingStage, options, facet, aggregateOptions) as PaginateResultWithType<WithTimeStamp<WithId<Type>>>;
        } else {
            const newPrePagingState = [
                {
                    $match: {
                        deleted: false
                    }
                }, 
                ...prePagingState                
            ]
            return await paginate(await this.getCollection(), newPrePagingState, postPagingStage, options, facet, aggregateOptions) as PaginateResultWithType<WithTimeStamp<WithId<Type>>>
        }
    }

    async find(filter: Filter<Type> = {}, findOptions: FindOptions = {}, listSoftDeleted = false) {
        const collection = await this.getCollection();
        if (listSoftDeleted || !this.dbOpsOption.softDelete) {
            const resultCursor = collection.find(filter, findOptions)
            return await resultCursor.toArray();
        } else {
            filter = { ...filter, deleted: false };
            const resultCursor = collection.find(filter, findOptions);
            return await resultCursor.toArray();
        }
    }

    async findOne(filter: Filter<Type> = {}, findOptions: FindOptions = {}, listSoftDeleted = false) {
        const collection = await this.getCollection();
        if (listSoftDeleted || !this.dbOpsOption.softDelete) {
            return await collection.findOne(filter, findOptions)
        } else {
            filter = { ...filter, deleted: false }
            return await collection.findOne(filter, findOptions)
        }
    }


    async findAndUpdate(filter: Filter<Type>, update: Partial<Type>, options?: mongodb.UpdateOptions, updateSoftDeletedItems = false) {
        const collection = await this.getCollection();

        if (this.dbOpsOption.timestamps) {
            update.lastUpdateAt = new Date();
        }

        const entityWithoutId = update as MatchKeysAndValues<Type>;
        delete entityWithoutId["_id"]; // can  not update _id

        if (updateSoftDeletedItems || !this.dbOpsOption.softDelete) {
            return await collection.updateMany(filter, { $set: entityWithoutId }, options)
        } else {
            return await collection.updateMany({ ...filter, deleted: false } as Filter<Type>, { $set: entityWithoutId }, options)
        }
    }
}

export default BaseDatabaseOps;