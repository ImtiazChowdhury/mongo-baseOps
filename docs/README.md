mongo-baseops / [Exports](modules.md)

# baseDatabaseOps  

Creates an object with base database operations which can then be extended and overridden as required for each collection.

the goal of this class is create a base object that has the basic required methods for average database collection which can be quickly modified and exported for each collection.

## basic usage

```js
//address database ops index.js file

const BaseDatabaseOps = require("path/to/this/class")

class AddressDB extends BaseDatabaseOps {
    constructor() {
        super('address')
    }
  
}
exports = module.exports = AddressDB
```

and as the required methods are already implemented in this base class it will take care of them such as writeOne, writeMany, readOne, readMany, list, updateOne, updateMany, removeOne, removeMany.

## overriding

And if  we ever need to change a method we can just override it.

For example let's say we want our `readOne` so that we can resolve/populate the customer field with customer info from the `customer` collection if required. Here is how we would approach the implementation:

```js
//address database ops index.js file

const BaseDatabaseOps = require("path/to/this/class")

class AddressDB extends BaseDatabaseOps {
    constructor() {
        super('address')
    }

    //example for overriding method
    async function readOne(id, resolve = {}) {
        
        const aggregatePipeline = [];
        aggregatePipeline.push({
            $match: {
                _id: { $in: id.map(i => new client.ObjectID(i)) }
            }
        })
        if(resolve.customer){
            aggregatePipeline.push({
                $lookup: {
                    from: "customer",
                    localField: "customer",
                    foreignField: "_id",
                    as: "customer"
                }
            },
            {
                $unwind: {
                    path: "$customer",
                    preserveNullAndEmptyArrays: true
                }
            }
            )
        }
        
        const db = await this.getDB();
        const result = await db.collection("address").aggregate(aggregatePipeline).toArray();
        return result;

    }

}
exports = module.exports = AddressDB
```

## parameters

- **collectionName** `string` - name of the database collection

### Note 1

 > Even though the base `readOne`, `readMany` method supports `resolve` parameter, it won't respond to them. If  resolving in needed for any collection than it should be implemented by overriding the base methods. A warning will be printed on the console every time any property is passed in the `resolve` param.

#### Note 2

 > Even though the base `list` method supports `resolve` and `filter` parameter, it won't respond to them. If filtering and resolving in needed for any collection than it should be implemented by overriding the base methods. A warning will be printed on the console every time any property is passed in the `filter` or `resolve` param.

## Methods

- `getDB(): Promise< object: databaseInstance >`
- `getCollection( ): Promise< object: dbCollectionInstance >`
- `getClient(): Promise< object: databaseClientInstance >`
- `writeOne( entity:object ) : Promise< object >`
- `writeMany( entityList: Array<object> ) : Promise< Array<object> >`
- `updateOne( id: string, entity: object ) : Promise< object >`
- `updateMany( entityList: Array<object> ) : Promise< Array<object> >`
- `readOne( id: string, entity: object ) : Promise< object >`
- `readMany( id: string, resolve: object ) : Promise< Array<object> >`
- `list( filter?: object, resolve?: object, paginateOptions?: object) : Promise< Array<object> >`
- `removeMany(id: string): Promise< object >`
- `removeOne(idList: Array<string>): Promise< Array<object> >`
