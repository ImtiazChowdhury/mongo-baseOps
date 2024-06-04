// import mongoClient from "@imtiazchowdhury/mongopool";
import BaseDatabaseOps from "..";

// mongoClient.url = "mongodb://localhost:27017";
// mongoClient.dbName = "baseOpsTest";

type User = {
    name: string,
    company: string,
}

const dbOpsSDTS = new BaseDatabaseOps<User>("user", "baseOpsTest[sdts]", "mongodb://localhost:27017", {
    softDelete: true,
    timestamps: true
})

async function testSDTS() {
    const results = await dbOpsSDTS.writeMany(dummyUsers);
    console.log("Results: ", results[0], " total created length: ", results.length);

    //check type
    results[0].name, results[0].company, results[0]._id, results[0].createdAt
    //delete first 2 users
    let res1 = await dbOpsSDTS.removeMany([results[0]._id, results[1]._id]);
    console.log("soft deleted results count : ", res1.deletedCount);
    //2nd 2 remove hard
    let res2 = await dbOpsSDTS.removeMany([results[2]._id, results[3]._id], true);
    console.log("hard deleted results count : ", res2.deletedCount);
    //try update soft deleted users
    const updatedResults = await dbOpsSDTS.updateMany(results.map((r, i) => ({ ...r, name: "Updated "+i })))
    console.log("soft delete Updated Results length: ", updatedResults.modifiedCount, updatedResults);
    // try to update soft deleted users by override
    const updatedResults2 = await dbOpsSDTS.updateMany(results.map((r, i) => ({ ...r, name: "Updated "+i })),{}, true)
    console.log("hard delete Updated Results length: ", updatedResults2.modifiedCount, updatedResults2);

    // paginate results with soft deleted
    const paginatedResults = await dbOpsSDTS.paginate([], [], {});
    console.log("soft delete -> Paginated Results length: ", paginatedResults.data.length);

    // paginate results without soft deleted
    const paginatedResults2 = await dbOpsSDTS.paginate([], [], {}, [], {}, true);
    console.log("override soft delete -> Paginated Results length: ", paginatedResults2.data.length);
    
    
    dbOpsSDTS.getClient().then(e=> e.close())
}

const dummyUsers = [
    {
        name: "Imtiaz Chowdhury",
        company: "Sheba Innovations Ltd",
    },
    {
        name: "Fahim Raz",
        company: "Sheba Innovations Ltd",
    },
    {
        name: "Raihan Kabir",
        company: "Sheba Innovations Ltd",
    },
    {
        name: "Fatema Chowdhury",
        company: "Sheba Innovations Ltd",
    },
    {
        name: "Tanjil Chowdhury",
        company: "Sheba Innovations Ltd",
    },
    {
        name: "Sakib Chowdhury",
        company: "Sheba Innovations Ltd",
    },
    {
        name: "Sakib Chowdhury",
        company: "Sheba Innovations Ltd",
    },
    {
        name: "Sakib Chowdhury",
        company: "Sheba Innovations Ltd",
    },
    {
        name: "Sakib Chowdhury",
        company: "Sheba Innovations Ltd",
    },
    {
        name: "Sakib Chowdhury",
        company: "Sheba Innovations Ltd",
    },
]

testSDTS()

//close connection


