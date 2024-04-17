[mongo-baseops](../README.md) / [Exports](../modules.md) / default

# Class: default

## Table of contents

### Constructors

- [constructor](default.md#constructor)

### Properties

- [\_collection](default.md#_collection)
- [\_db](default.md#_db)
- [client](default.md#client)
- [collectionName](default.md#collectionname)
- [dbName](default.md#dbname)
- [dbUrl](default.md#dburl)
- [ObjectId](default.md#objectid)
- [mongodb](default.md#mongodb)

### Methods

- [getClient](default.md#getclient)
- [getCollection](default.md#getcollection)
- [getDB](default.md#getdb)
- [list](default.md#list)
- [readMany](default.md#readmany)
- [readOne](default.md#readone)
- [removeMany](default.md#removemany)
- [removeOne](default.md#removeone)
- [updateMany](default.md#updatemany)
- [updateOne](default.md#updateone)
- [writeMany](default.md#writemany)
- [writeOne](default.md#writeone)

## Constructors

### constructor

• **new default**(`collectionName`, `dbName?`, `dbUrl?`): [`default`](default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `collectionName` | `string` |
| `dbName?` | `string` |
| `dbUrl?` | `string` |

#### Returns

[`default`](default.md)

#### Defined in

[src/index.ts:18](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/8a06a94fb4a5e576dc91ee3611cb6f52e91c3960/src/index.ts#L18)

## Properties

### \_collection

• `Private` **\_collection**: ``null`` \| [`Collection`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.Collection.md)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>

#### Defined in

[src/index.ts:12](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/8a06a94fb4a5e576dc91ee3611cb6f52e91c3960/src/index.ts#L12)

___

### \_db

• `Private` **\_db**: ``null`` \| [`Db`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.Db.md)

#### Defined in

[src/index.ts:8](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/8a06a94fb4a5e576dc91ee3611cb6f52e91c3960/src/index.ts#L8)

___

### client

• **client**: ``null`` \| [`MongoClient`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.MongoClient.md)

#### Defined in

[src/index.ts:13](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/8a06a94fb4a5e576dc91ee3611cb6f52e91c3960/src/index.ts#L13)

___

### collectionName

• **collectionName**: `string`

#### Defined in

[src/index.ts:9](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/8a06a94fb4a5e576dc91ee3611cb6f52e91c3960/src/index.ts#L9)

___

### dbName

• **dbName**: ``null`` \| `string` = `null`

#### Defined in

[src/index.ts:10](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/8a06a94fb4a5e576dc91ee3611cb6f52e91c3960/src/index.ts#L10)

___

### dbUrl

• **dbUrl**: ``null`` \| `string` = `null`

#### Defined in

[src/index.ts:11](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/8a06a94fb4a5e576dc91ee3611cb6f52e91c3960/src/index.ts#L11)

___

### ObjectId

▪ `Static` **ObjectId**: typeof [`ObjectId`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.ObjectId.md) = `ObjectId`

#### Defined in

[src/index.ts:15](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/8a06a94fb4a5e576dc91ee3611cb6f52e91c3960/src/index.ts#L15)

___

### mongodb

▪ `Static` **mongodb**: [`"Z:/mongo-baseOps/node_modules/mongodb/mongodb"`](../modules/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.md) = `mongodb`

#### Defined in

[src/index.ts:16](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/8a06a94fb4a5e576dc91ee3611cb6f52e91c3960/src/index.ts#L16)

## Methods

### getClient

▸ **getClient**(): `Promise`\<[`MongoClient`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.MongoClient.md)\>

#### Returns

`Promise`\<[`MongoClient`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.MongoClient.md)\>

#### Defined in

[src/index.ts:64](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/8a06a94fb4a5e576dc91ee3611cb6f52e91c3960/src/index.ts#L64)

___

### getCollection

▸ **getCollection**(): `Promise`\<[`Collection`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.Collection.md)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>\>

#### Returns

`Promise`\<[`Collection`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.Collection.md)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>\>

#### Defined in

[src/index.ts:54](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/8a06a94fb4a5e576dc91ee3611cb6f52e91c3960/src/index.ts#L54)

___

### getDB

▸ **getDB**(): `Promise`\<[`Db`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.Db.md)\>

#### Returns

`Promise`\<[`Db`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.Db.md)\>

#### Defined in

[src/index.ts:44](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/8a06a94fb4a5e576dc91ee3611cb6f52e91c3960/src/index.ts#L44)

___

### list

▸ **list**(`filter?`, `resolve?`, `paginationOptions`): `Promise`\<[`PaginateResult`](../interfaces/internal_.PaginateResult.md) \| [`EmptyPaginateResult`](../interfaces/internal_.EmptyPaginateResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | `Object` |
| `resolve` | `Object` |
| `paginationOptions` | [`PaginationOptions`](../interfaces/internal_.PaginationOptions.md) |

#### Returns

`Promise`\<[`PaginateResult`](../interfaces/internal_.PaginateResult.md) \| [`EmptyPaginateResult`](../interfaces/internal_.EmptyPaginateResult.md)\>

#### Defined in

[src/index.ts:159](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/8a06a94fb4a5e576dc91ee3611cb6f52e91c3960/src/index.ts#L159)

___

### readMany

▸ **readMany**(`id`, `resolve?`): `Promise`\<[`WithId`](../modules/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.md#withid)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | (`undefined` \| `string` \| [`ObjectId`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.ObjectId.md))[] |
| `resolve` | [`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md) |

#### Returns

`Promise`\<[`WithId`](../modules/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.md#withid)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>[]\>

#### Defined in

[src/index.ts:144](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/8a06a94fb4a5e576dc91ee3611cb6f52e91c3960/src/index.ts#L144)

___

### readOne

▸ **readOne**(`id`, `resolve?`): `Promise`\<``null`` \| [`WithId`](../modules/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.md#withid)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` \| [`ObjectId`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.ObjectId.md) |
| `resolve` | [`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md) |

#### Returns

`Promise`\<``null`` \| [`WithId`](../modules/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.md#withid)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>\>

#### Defined in

[src/index.ts:133](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/8a06a94fb4a5e576dc91ee3611cb6f52e91c3960/src/index.ts#L133)

___

### removeMany

▸ **removeMany**(`idList`): `Promise`\<[`DeleteResult`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.DeleteResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `idList` | (`undefined` \| `string` \| [`ObjectId`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.ObjectId.md))[] |

#### Returns

`Promise`\<[`DeleteResult`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.DeleteResult.md)\>

#### Defined in

[src/index.ts:181](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/8a06a94fb4a5e576dc91ee3611cb6f52e91c3960/src/index.ts#L181)

___

### removeOne

▸ **removeOne**(`id`): `Promise`\<[`DeleteResult`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.DeleteResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` \| [`ObjectId`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.ObjectId.md) |

#### Returns

`Promise`\<[`DeleteResult`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.DeleteResult.md)\>

#### Defined in

[src/index.ts:176](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/8a06a94fb4a5e576dc91ee3611cb6f52e91c3960/src/index.ts#L176)

___

### updateMany

▸ **updateMany**(`entityList`, `options?`): `Promise`\<[`UpdateResult`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.UpdateResult.md)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityList` | [`OptionalId`](../modules/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.md#optionalid)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>[] |
| `options?` | [`UpdateOptions`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.UpdateOptions.md) |

#### Returns

`Promise`\<[`UpdateResult`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.UpdateResult.md)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>[]\>

#### Defined in

[src/index.ts:105](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/8a06a94fb4a5e576dc91ee3611cb6f52e91c3960/src/index.ts#L105)

___

### updateOne

▸ **updateOne**(`id`, `entity`, `options?`): `Promise`\<[`UpdateResult`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.UpdateResult.md)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` \| [`ObjectId`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.ObjectId.md) |
| `entity` | [`OptionalId`](../modules/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.md#optionalid)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\> |
| `options?` | [`UpdateOptions`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.UpdateOptions.md) |

#### Returns

`Promise`\<[`UpdateResult`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.UpdateResult.md)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>\>

#### Defined in

[src/index.ts:98](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/8a06a94fb4a5e576dc91ee3611cb6f52e91c3960/src/index.ts#L98)

___

### writeMany

▸ **writeMany**(`docs`, `options?`): `Promise`\<[`OptionalId`](../modules/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.md#optionalid)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `docs` | [`OptionalId`](../modules/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.md#optionalid)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>[] |
| `options?` | [`BulkWriteOptions`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BulkWriteOptions.md) |

#### Returns

`Promise`\<[`OptionalId`](../modules/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.md#optionalid)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>[]\>

#### Defined in

[src/index.ts:83](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/8a06a94fb4a5e576dc91ee3611cb6f52e91c3960/src/index.ts#L83)

___

### writeOne

▸ **writeOne**(`doc`, `options?`): `Promise`\<[`OptionalId`](../modules/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.md#optionalid)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `doc` | [`OptionalId`](../modules/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.md#optionalid)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\> |
| `options?` | [`InsertOneOptions`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.InsertOneOptions.md) |

#### Returns

`Promise`\<[`OptionalId`](../modules/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.md#optionalid)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>\>

#### Defined in

[src/index.ts:74](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/8a06a94fb4a5e576dc91ee3611cb6f52e91c3960/src/index.ts#L74)
