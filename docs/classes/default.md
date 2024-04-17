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

• **new default**(`collectionName`): [`default`](default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `collectionName` | `string` |

#### Returns

[`default`](default.md)

#### Defined in

[src/index.ts:16](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/af6e75a3ba1971e5d9a0ca8ad27ac01842bfd039/src/index.ts#L16)

## Properties

### \_collection

• `Private` **\_collection**: ``null`` \| [`Collection`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.Collection.md)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>

#### Defined in

[src/index.ts:10](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/af6e75a3ba1971e5d9a0ca8ad27ac01842bfd039/src/index.ts#L10)

___

### \_db

• `Private` **\_db**: ``null`` \| [`Db`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.Db.md)

#### Defined in

[src/index.ts:8](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/af6e75a3ba1971e5d9a0ca8ad27ac01842bfd039/src/index.ts#L8)

___

### client

• **client**: ``null`` \| [`MongoClient`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.MongoClient.md)

#### Defined in

[src/index.ts:11](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/af6e75a3ba1971e5d9a0ca8ad27ac01842bfd039/src/index.ts#L11)

___

### collectionName

• **collectionName**: `string`

#### Defined in

[src/index.ts:9](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/af6e75a3ba1971e5d9a0ca8ad27ac01842bfd039/src/index.ts#L9)

___

### ObjectId

▪ `Static` **ObjectId**: typeof [`ObjectId`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.ObjectId.md) = `ObjectId`

#### Defined in

[src/index.ts:13](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/af6e75a3ba1971e5d9a0ca8ad27ac01842bfd039/src/index.ts#L13)

___

### mongodb

▪ `Static` **mongodb**: [`"Z:/mongo-baseOps/node_modules/mongodb/mongodb"`](../modules/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.md) = `mongodb`

#### Defined in

[src/index.ts:14](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/af6e75a3ba1971e5d9a0ca8ad27ac01842bfd039/src/index.ts#L14)

## Methods

### getClient

▸ **getClient**(): `Promise`\<[`MongoClient`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.MongoClient.md)\>

#### Returns

`Promise`\<[`MongoClient`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.MongoClient.md)\>

#### Defined in

[src/index.ts:53](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/af6e75a3ba1971e5d9a0ca8ad27ac01842bfd039/src/index.ts#L53)

___

### getCollection

▸ **getCollection**(): `Promise`\<[`Collection`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.Collection.md)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>\>

#### Returns

`Promise`\<[`Collection`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.Collection.md)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>\>

#### Defined in

[src/index.ts:43](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/af6e75a3ba1971e5d9a0ca8ad27ac01842bfd039/src/index.ts#L43)

___

### getDB

▸ **getDB**(): `Promise`\<[`Db`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.Db.md)\>

#### Returns

`Promise`\<[`Db`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.Db.md)\>

#### Defined in

[src/index.ts:33](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/af6e75a3ba1971e5d9a0ca8ad27ac01842bfd039/src/index.ts#L33)

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

[src/index.ts:148](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/af6e75a3ba1971e5d9a0ca8ad27ac01842bfd039/src/index.ts#L148)

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

[src/index.ts:133](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/af6e75a3ba1971e5d9a0ca8ad27ac01842bfd039/src/index.ts#L133)

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

[src/index.ts:122](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/af6e75a3ba1971e5d9a0ca8ad27ac01842bfd039/src/index.ts#L122)

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

[src/index.ts:170](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/af6e75a3ba1971e5d9a0ca8ad27ac01842bfd039/src/index.ts#L170)

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

[src/index.ts:165](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/af6e75a3ba1971e5d9a0ca8ad27ac01842bfd039/src/index.ts#L165)

___

### updateMany

▸ **updateMany**(`entityList`, `options?`): `Promise`\<[`UpdateResult`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.UpdateResult.md)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityList` | [`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)[] |
| `options?` | [`UpdateOptions`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.UpdateOptions.md) |

#### Returns

`Promise`\<[`UpdateResult`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.UpdateResult.md)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>[]\>

#### Defined in

[src/index.ts:94](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/af6e75a3ba1971e5d9a0ca8ad27ac01842bfd039/src/index.ts#L94)

___

### updateOne

▸ **updateOne**(`id`, `entity`, `options?`): `Promise`\<[`UpdateResult`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.UpdateResult.md)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` \| [`ObjectId`](internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.ObjectId.md) |
| `entity` | [`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md) |
| `options?` | [`UpdateOptions`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.UpdateOptions.md) |

#### Returns

`Promise`\<[`UpdateResult`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.UpdateResult.md)\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>\>

#### Defined in

[src/index.ts:87](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/af6e75a3ba1971e5d9a0ca8ad27ac01842bfd039/src/index.ts#L87)

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

[src/index.ts:72](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/af6e75a3ba1971e5d9a0ca8ad27ac01842bfd039/src/index.ts#L72)

___

### writeOne

▸ **writeOne**(`doc`, `options?`): `Promise`\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `doc` | [`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md) |
| `options?` | [`InsertOneOptions`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.InsertOneOptions.md) |

#### Returns

`Promise`\<[`Document`](../interfaces/internal_._Z__mongo_baseOps_node_modules_mongodb_mongodb_.BSON.Document.md)\>

#### Defined in

[src/index.ts:63](https://github.com/ImtiazChowdhury/mongo-baseOps/blob/af6e75a3ba1971e5d9a0ca8ad27ac01842bfd039/src/index.ts#L63)
