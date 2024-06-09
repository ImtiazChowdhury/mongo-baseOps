/// <reference types="mongoose/types/pipelinestage" />
import { PipelineStage } from "mongodb-paginate";
import mongodb, { ObjectId, Document, WithId, OptionalId, UpdateResult } from "mongodb";
import { EmptyPaginateResult, FacetBucketQuery, PaginateResult, PaginationOptions } from "mongodb-paginate/dist/types/types";
type DBOpsOption = {
    timestamps: boolean;
    softDelete: boolean;
};
type PaginateResultWithType<Type> = (PaginateResult & {
    data: Array<Type>;
}) | EmptyPaginateResult;
type WithTimeStamp<Type> = Type & {
    createdAt?: Date;
    lastUpdateAt?: Date;
};
type WithSoftDelete<Type> = Type & {
    deleted?: boolean;
    deletedAt?: Date | null;
};
declare class BaseDatabaseOps<Type extends WithSoftDelete<WithTimeStamp<Document>> = WithTimeStamp<Document>> {
    private _db;
    collectionName: string;
    dbName: string | null;
    dbUrl: string | null;
    private _collection;
    client: mongodb.MongoClient | null;
    static ObjectId: typeof mongodb.BSON.ObjectId;
    static mongodb: typeof mongodb;
    dbOpsOption: DBOpsOption;
    constructor(collectionName: string, dbName?: string, dbUrl?: string, dbOpsOption?: Partial<DBOpsOption>);
    getDB(): Promise<mongodb.Db>;
    getCollection(): Promise<mongodb.Collection<mongodb.BSON.Document>>;
    getClient(): Promise<mongodb.MongoClient>;
    writeOne(doc: OptionalId<Type>, options?: mongodb.InsertOneOptions): Promise<WithId<WithTimeStamp<Type>>>;
    writeMany(docs: Array<OptionalId<Type>>, options?: mongodb.BulkWriteOptions): Promise<WithId<WithTimeStamp<Type>>[]>;
    updateOne(id: string | ObjectId, entity: OptionalId<Type>, options?: mongodb.UpdateOptions, updateSoftDeletedItems?: boolean): Promise<UpdateResult<WithTimeStamp<WithId<Type>>>>;
    updateMany(entityList: Array<WithId<Type>>, options?: mongodb.UpdateOptions, overrideSoftDeleted?: boolean): Promise<{
        modifiedCount: number;
        acknowledged: boolean;
        matchedCount: number;
    }>;
    readOne(id: string | ObjectId, resolve?: mongodb.Document, readSoftDeleted?: boolean): Promise<WithTimeStamp<WithId<Type>> | null>;
    readMany(id: Array<string | ObjectId | undefined>, resolve?: mongodb.Document, readSoftDeleted?: boolean): Promise<Array<WithTimeStamp<WithId<Type>>>>;
    list(filter: {} | undefined, resolve: {} | undefined, paginationOptions: PaginationOptions): Promise<PaginateResultWithType<Type>>;
    removeOne(id: string | ObjectId | undefined, hardDelete?: boolean): Promise<mongodb.DeleteResult>;
    removeMany(idList: Array<string | ObjectId | undefined>, hardDelete?: boolean): Promise<mongodb.DeleteResult>;
    paginate(prePagingState: PipelineStage[], postPagingStage: PipelineStage[], options: PaginationOptions, facet?: FacetBucketQuery[], aggregateOptions?: mongodb.AggregateOptions, listSoftDeleted?: boolean): Promise<PaginateResultWithType<WithTimeStamp<WithId<Type>>>>;
}
export default BaseDatabaseOps;
