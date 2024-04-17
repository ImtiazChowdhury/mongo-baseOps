// import mongoClient from "@imtiazchowdhury/mongopool";
import BaseDatabaseOps from "..";

// mongoClient.url = "mongodb://localhost:27017";
// mongoClient.dbName = "baseOpsTest";

const dbOps = new BaseDatabaseOps("user", "baseOpsTest", "mongodb://localhost:27017")

async function main() {
    const writeOneResult = await dbOps.writeOne(dummyUsers[0])
    const writeManyResult = await dbOps.writeMany([dummyUsers[1]])
    console.log({ writeOneResult })
    console.log({ writeManyResult })

    if (writeOneResult["_id"]) {
        console.log({writeOneResultId: writeOneResult["_id"]})
        const readOneResult = await dbOps.readOne(writeOneResult["_id"])
        console.log({readOneResult})
    }

    const readManyResult = await dbOps.readMany(writeManyResult.map(i=> i._id))
    console.log({readManyResult})

    const deleteManyResult = await dbOps.removeMany(writeManyResult.map(i=> i._id))
    console.log({deleteManyResult})

}

const dummyUsers = [
    {
        name: "Imtiaz Chowdhury",
        company: "Sheba Innovations Ltd",
    },
    {
        name: "Fahim Raz",
        company: "Sheba Innovations Ltd",
    }
]

main()
