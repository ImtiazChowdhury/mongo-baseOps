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


    // this is for internal use only
    // the collection on this class has type of mongodb.Collection<Type>
    // but the collection object from mongodb has type of mongodb.Collection
    // so on creation, update and other operation need mongodb specific type
    // current project mismatch the type of collection object
    // eg-> on create my Project uses OptionalId<Type> but mongodb uses OptionalUnlessRequiredId<Type>
    private async getInternalCollection() {
        if (!this._collection) {
            this._collection = await (await this.getDB()).collection(this.collectionName)
        }
        return this._collection as unknown as mongodb.Collection;
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
        let entity = doc;

        if (this.dbOpsOption.timestamps) {
            entity.createdAt = new Date();
            entity.lastUpdateAt = new Date();
        }

        if (this.dbOpsOption.softDelete) {
            entity.deleted = false;
            entity.deletedAt = null;
        }

        const writeResults = await (await this.getInternalCollection()).insertOne(entity, options);
        const result = {
            _id: writeResults.insertedId,
            ...entity,
        } as WithId<Type>
        return result;
    }


    async writeMany(docs: Array<OptionalId<Type>>, options?: mongodb.BulkWriteOptions): Promise<WithId<WithTimeStamp<Type>>[]> {
        let entityList: Array<OptionalId<Type>> = docs;

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

        const writeResults = await (await this.getInternalCollection()).insertMany(entityList, options);

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
        entity: OptionalId<Type>,
        options?: mongodb.UpdateOptions,
        updateSoftDeletedItems = false
    ): Promise<UpdateResult<WithTimeStamp<WithId<Type>>>> {
        const collection = await this.getInternalCollection();
        delete entity._id;
        if (this.dbOpsOption.timestamps) {
            entity.lastUpdateAt = new Date();
        }
        if (updateSoftDeletedItems || !this.dbOpsOption.softDelete) {
            const updateResults = await collection.updateOne({ _id: new ObjectId(id) }, { $set: entity }, options)
            return updateResults;
        } else {
            const updateResults = await collection.updateOne({
                _id: new ObjectId(id),
                deleted: false
            }, { $set: entity }, options)
            return updateResults;
        }
    }

    async updateMany(
        entityList: Array<WithId<Type>>,
        options?: mongodb.UpdateOptions,
        overrideSoftDeleted = false
    ) {
        const session = (await this.getClient()).startSession();
        session.startTransaction();

        try {
            const updatePromises = []
            for (let entity of entityList) {

                const id = entity["_id"];

                const entityWithoutId = entity as OptionalId<Type>;
                delete entityWithoutId["_id"]; // can  not update _id

                const collection = await this.getInternalCollection();
                if (this.dbOpsOption.timestamps) {
                    entityWithoutId.lastUpdateAt = new Date();
                }
                if (overrideSoftDeleted || !this.dbOpsOption.softDelete) {
                    updatePromises.push(
                        collection.updateOne({ _id: new ObjectId(id) }, { $set: entityWithoutId }, options)
                    )
                } else {
                    updatePromises.push(
                        collection.updateOne({ _id: new ObjectId(id), deleted: false }, { $set: entityWithoutId }, options)
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
        const collection = await this.getInternalCollection();

        if (Object.keys(resolve).length) {
            console.warn("base implementation doesn't respond to `resolve`. You need to override the `readOne` method for collection " + this.collectionName)
        }
        if (readSoftDeleted || !this.dbOpsOption.softDelete) {
            const result = await collection.findOne({ _id: new ObjectId(id) });
            return result as WithTimeStamp<WithId<Type>> | null;
        } else {
            const result = await collection.findOne({ _id: new ObjectId(id), deleted: false });
            return result as WithTimeStamp<WithId<Type>> | null;
        }
    }

    async readMany(
        id: Array<string | ObjectId | undefined>,
        resolve: mongodb.Document = {},
        readSoftDeleted = false
    ): Promise<Array<WithTimeStamp<WithId<Type>>>> {
        // this is the bare minimum implementation
        // resolve will be different for each collection
        // so this method will have to be overridden if someone tries to resolve any property
        const collection = await this.getInternalCollection();

        if (Object.keys(resolve).length) {
            console.warn("base implementation doesn't respond to `resolve`. You need to override the `readMany` method for collection " + this.collectionName)
        }
        if (readSoftDeleted || !this.dbOpsOption.softDelete) {
            const result = await collection.find({
                _id: { $in: id.map(i => new ObjectId(i)) }
            }
            ).toArray();
            return result as Array<WithTimeStamp<WithId<Type>>>;
        } else {
            const result = await collection.find({
                _id: { $in: id.map(i => new ObjectId(i)) },
                deleted: false
            }
            ).toArray();
            return result as Array<WithTimeStamp<WithId<Type>>>;
        }
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


    async removeOne(id: string | ObjectId | undefined, hardDelete = false) {
        const collection = await this.getInternalCollection();
        if (hardDelete || !this.dbOpsOption.softDelete) {
            const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });
            return deleteResult;
        } else {
            const updateDeleteResult = await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { deleted: true, deletedAt: new Date() } }
            )
            return {
                deletedCount: updateDeleteResult.modifiedCount,
                acknowledged: updateDeleteResult.acknowledged
            };
        }
    }

    async removeMany(idList: Array<string | ObjectId | undefined>, hardDelete = false): Promise<mongodb.DeleteResult> {
        const collection = await this.getInternalCollection();
        if (!Array.isArray(idList)) {
            throw new TypeError("idList must be an array, received " + typeof idList)
        }
        if (hardDelete || !this.dbOpsOption.softDelete) {
            const deleteResults = await collection.deleteMany({ _id: { $in: idList.map(i => new ObjectId(i)) } });
            return deleteResults;
        } else {
            const updateDeleteResults = await collection.updateMany(
                { _id: { $in: idList.map(i => new ObjectId(i)) } },
                { $set: { deleted: true, deletedAt: new Date() } }
            )
            return {
                deletedCount: updateDeleteResults.modifiedCount,
                acknowledged: updateDeleteResults.acknowledged
            }
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
                ...prePagingState,
                {
                    $match: {
                        deleted: false
                    }
                }
            ]
            return await paginate(await this.getCollection(), newPrePagingState, postPagingStage, options, facet, aggregateOptions) as PaginateResultWithType<WithTimeStamp<WithId<Type>>>
        }
    }


    async find(filter?: Filter<Type>, findOptions?: FindOptions) {
        const collection = await this.getCollection()
        if (filter && findOptions) {
            const cursor = await collection.find(filter, findOptions);
            return cursor.toArray()
        } else if (filter) {
            const cursor = await collection.find(filter);
            return cursor.toArray()
        } else {
            const cursor = await collection.find();
            return cursor.toArray()
        }
    }
}

export default BaseDatabaseOps;