[mongo-baseops](../README.md) / [Exports](../modules.md) / default

# Class: default\<Type\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Type` | extends `WithSoftDelete`\<`WithTimeStamp`\<`Document`\>\> = `WithTimeStamp`\<`Document`\> |

## Table of contents

### Constructors

- [constructor](default.md#constructor)

### Properties

- [\_collection](default.md#_collection)
- [\_db](default.md#_db)
- [client](default.md#client)
- [collectionName](default.md#collectionname)
- [dbName](default.md#dbname)
- [dbOpsOption](default.md#dbopsoption)
- [dbUrl](default.md#dburl)
- [ObjectId](default.md#objectid)
- [mongodb](default.md#mongodb)

### Methods

- [getClient](default.md#getclient)
- [getCollection](default.md#getcollection)
- [getDB](default.md#getdb)
- [list](default.md#list)
- [paginate](default.md#paginate)
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

• **new default**\<`Type`\>(`collectionName`, `dbName?`, `dbUrl?`, `dbOpsOption?`): [`default`](default.md)\<`Type`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Type` | extends `WithSoftDelete`\<`WithTimeStamp`\<`Document`\>\> = `WithTimeStamp`\<`Document`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `collectionName` | `string` |
| `dbName?` | `string` |
| `dbUrl?` | `string` |
| `dbOpsOption?` | `Partial`\<`DBOpsOption`\> |

#### Returns

[`default`](default.md)\<`Type`\>

#### Defined in

[index.ts:31](https://github.com/imtiazchowdhury/mongo-baseops/blob/2f8f7fd825b8b9e3e58d1efe333e118dc6059946/src/index.ts#L31)

## Properties

### \_collection

• `Private` **\_collection**: ``null`` \| `Collection`\<`Document`\>

#### Defined in

[index.ts:20](https://github.com/imtiazchowdhury/mongo-baseops/blob/2f8f7fd825b8b9e3e58d1efe333e118dc6059946/src/index.ts#L20)

___

### \_db

• `Private` **\_db**: ``null`` \| `Db`

#### Defined in

[index.ts:16](https://github.com/imtiazchowdhury/mongo-baseops/blob/2f8f7fd825b8b9e3e58d1efe333e118dc6059946/src/index.ts#L16)

___

### client

• **client**: ``null`` \| `MongoClient`

#### Defined in

[index.ts:21](https://github.com/imtiazchowdhury/mongo-baseops/blob/2f8f7fd825b8b9e3e58d1efe333e118dc6059946/src/index.ts#L21)

___

### collectionName

• **collectionName**: `string`

#### Defined in

[index.ts:17](https://github.com/imtiazchowdhury/mongo-baseops/blob/2f8f7fd825b8b9e3e58d1efe333e118dc6059946/src/index.ts#L17)

___

### dbName

• **dbName**: ``null`` \| `string` = `null`

#### Defined in

[index.ts:18](https://github.com/imtiazchowdhury/mongo-baseops/blob/2f8f7fd825b8b9e3e58d1efe333e118dc6059946/src/index.ts#L18)

___

### dbOpsOption

• **dbOpsOption**: `DBOpsOption`

#### Defined in

[index.ts:26](https://github.com/imtiazchowdhury/mongo-baseops/blob/2f8f7fd825b8b9e3e58d1efe333e118dc6059946/src/index.ts#L26)

___

### dbUrl

• **dbUrl**: ``null`` \| `string` = `null`

#### Defined in

[index.ts:19](https://github.com/imtiazchowdhury/mongo-baseops/blob/2f8f7fd825b8b9e3e58d1efe333e118dc6059946/src/index.ts#L19)

___

### ObjectId

▪ `Static` **ObjectId**: typeof `ObjectId` = `ObjectId`

#### Defined in

[index.ts:23](https://github.com/imtiazchowdhury/mongo-baseops/blob/2f8f7fd825b8b9e3e58d1efe333e118dc6059946/src/index.ts#L23)

___

### mongodb

▪ `Static` **mongodb**: `__module` = `mongodb`

#### Defined in

[index.ts:24](https://github.com/imtiazchowdhury/mongo-baseops/blob/2f8f7fd825b8b9e3e58d1efe333e118dc6059946/src/index.ts#L24)

## Methods

### getClient

▸ **getClient**(): `Promise`\<`MongoClient`\>

#### Returns

`Promise`\<`MongoClient`\>

#### Defined in

[index.ts:84](https://github.com/imtiazchowdhury/mongo-baseops/blob/2f8f7fd825b8b9e3e58d1efe333e118dc6059946/src/index.ts#L84)

___

### getCollection

▸ **getCollection**(): `Promise`\<`Collection`\<`Document`\>\>

#### Returns

`Promise`\<`Collection`\<`Document`\>\>

#### Defined in

[index.ts:74](https://github.com/imtiazchowdhury/mongo-baseops/blob/2f8f7fd825b8b9e3e58d1efe333e118dc6059946/src/index.ts#L74)

___

### getDB

▸ **getDB**(): `Promise`\<`Db`\>

#### Returns

`Promise`\<`Db`\>

#### Defined in

[index.ts:64](https://github.com/imtiazchowdhury/mongo-baseops/blob/2f8f7fd825b8b9e3e58d1efe333e118dc6059946/src/index.ts#L64)

___

### list

▸ **list**(`filter?`, `resolve?`, `paginationOptions`): `Promise`\<`PaginateResultWithType`\<`Type`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | `Object` |
| `resolve` | `Object` |
| `paginationOptions` | `PaginationOptions` |

#### Returns

`Promise`\<`PaginateResultWithType`\<`Type`\>\>

#### Defined in

[index.ts:267](https://github.com/imtiazchowdhury/mongo-baseops/blob/2f8f7fd825b8b9e3e58d1efe333e118dc6059946/src/index.ts#L267)

___

### paginate

▸ **paginate**(`prePagingState`, `postPagingStage`, `options`, `facet?`, `aggregateOptions?`, `listSoftDeleted?`): `Promise`\<`PaginateResultWithType`\<`WithTimeStamp`\<`WithId`\<`Type`\>\>\>\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `prePagingState` | `PipelineStage`[] | `undefined` |
| `postPagingStage` | `PipelineStage`[] | `undefined` |
| `options` | `PaginationOptions` | `undefined` |
| `facet?` | `FacetBucketQuery`[] | `undefined` |
| `aggregateOptions?` | `AggregateOptions` | `undefined` |
| `listSoftDeleted` | `boolean` | `false` |

#### Returns

`Promise`\<`PaginateResultWithType`\<`WithTimeStamp`\<`WithId`\<`Type`\>\>\>\>

#### Defined in

[index.ts:320](https://github.com/imtiazchowdhury/mongo-baseops/blob/2f8f7fd825b8b9e3e58d1efe333e118dc6059946/src/index.ts#L320)

___

### readMany

▸ **readMany**(`id`, `resolve?`, `readSoftDeleted?`): `Promise`\<`WithTimeStamp`\<`WithId`\<`Type`\>\>[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | (`undefined` \| `string` \| `ObjectId`)[] | `undefined` |
| `resolve` | `Document` | `{}` |
| `readSoftDeleted` | `boolean` | `false` |

#### Returns

`Promise`\<`WithTimeStamp`\<`WithId`\<`Type`\>\>[]\>

#### Defined in

[index.ts:239](https://github.com/imtiazchowdhury/mongo-baseops/blob/2f8f7fd825b8b9e3e58d1efe333e118dc6059946/src/index.ts#L239)

___

### readOne

▸ **readOne**(`id`, `resolve?`, `readSoftDeleted?`): `Promise`\<``null`` \| `WithTimeStamp`\<`WithId`\<`Type`\>\>\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` \| `ObjectId` | `undefined` |
| `resolve` | `Document` | `{}` |
| `readSoftDeleted` | `boolean` | `false` |

#### Returns

`Promise`\<``null`` \| `WithTimeStamp`\<`WithId`\<`Type`\>\>\>

#### Defined in

[index.ts:222](https://github.com/imtiazchowdhury/mongo-baseops/blob/2f8f7fd825b8b9e3e58d1efe333e118dc6059946/src/index.ts#L222)

___

### removeMany

▸ **removeMany**(`idList`, `hardDelete?`): `Promise`\<`DeleteResult`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `idList` | (`undefined` \| `string` \| `ObjectId`)[] | `undefined` |
| `hardDelete` | `boolean` | `false` |

#### Returns

`Promise`\<`DeleteResult`\>

#### Defined in

[index.ts:300](https://github.com/imtiazchowdhury/mongo-baseops/blob/2f8f7fd825b8b9e3e58d1efe333e118dc6059946/src/index.ts#L300)

___

### removeOne

▸ **removeOne**(`id`, `hardDelete?`): `Promise`\<`DeleteResult`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `undefined` \| `string` \| `ObjectId` | `undefined` |
| `hardDelete` | `boolean` | `false` |

#### Returns

`Promise`\<`DeleteResult`\>

#### Defined in

[index.ts:284](https://github.com/imtiazchowdhury/mongo-baseops/blob/2f8f7fd825b8b9e3e58d1efe333e118dc6059946/src/index.ts#L284)

___

### updateMany

▸ **updateMany**(`entityList`, `options?`, `overrideSoftDeleted?`): `Promise`\<\{ `acknowledged`: `boolean` ; `matchedCount`: `number` ; `modifiedCount`: `number`  }\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `entityList` | `WithId`\<`Type`\>[] | `undefined` |
| `options?` | `UpdateOptions` | `undefined` |
| `overrideSoftDeleted` | `boolean` | `false` |

#### Returns

`Promise`\<\{ `acknowledged`: `boolean` ; `matchedCount`: `number` ; `modifiedCount`: `number`  }\>

#### Defined in

[index.ts:171](https://github.com/imtiazchowdhury/mongo-baseops/blob/2f8f7fd825b8b9e3e58d1efe333e118dc6059946/src/index.ts#L171)

___

### updateOne

▸ **updateOne**(`id`, `entity`, `options?`, `updateSoftDeletedItems?`): `Promise`\<`UpdateResult`\<`WithTimeStamp`\<`WithId`\<`Type`\>\>\>\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` \| `ObjectId` | `undefined` |
| `entity` | `OptionalId`\<`Type`\> | `undefined` |
| `options?` | `UpdateOptions` | `undefined` |
| `updateSoftDeletedItems` | `boolean` | `false` |

#### Returns

`Promise`\<`UpdateResult`\<`WithTimeStamp`\<`WithId`\<`Type`\>\>\>\>

#### Defined in

[index.ts:152](https://github.com/imtiazchowdhury/mongo-baseops/blob/2f8f7fd825b8b9e3e58d1efe333e118dc6059946/src/index.ts#L152)

___

### writeMany

▸ **writeMany**(`docs`, `options?`): `Promise`\<`WithId`\<`WithTimeStamp`\<`Type`\>\>[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `docs` | `OptionalId`\<`Type`\>[] |
| `options?` | `BulkWriteOptions` |

#### Returns

`Promise`\<`WithId`\<`WithTimeStamp`\<`Type`\>\>[]\>

#### Defined in

[index.ts:116](https://github.com/imtiazchowdhury/mongo-baseops/blob/2f8f7fd825b8b9e3e58d1efe333e118dc6059946/src/index.ts#L116)

___

### writeOne

▸ **writeOne**(`doc`, `options?`): `Promise`\<`WithId`\<`WithTimeStamp`\<`Type`\>\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `doc` | `OptionalId`\<`Type`\> |
| `options?` | `InsertOneOptions` |

#### Returns

`Promise`\<`WithId`\<`WithTimeStamp`\<`Type`\>\>\>

#### Defined in

[index.ts:94](https://github.com/imtiazchowdhury/mongo-baseops/blob/2f8f7fd825b8b9e3e58d1efe333e118dc6059946/src/index.ts#L94)
