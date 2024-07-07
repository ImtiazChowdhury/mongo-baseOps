"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./../index"));
const dbOpsSDTS = new index_1.default("user", "baseOpsTest[sdts]", "mongodb://localhost:27017", {
    softDelete: true,
    timestamps: true
});
function testSDTS() {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield dbOpsSDTS.writeMany(dummyUsers);
        console.log("Results: ", results[0], " total created length: ", results.length);
        //check type
        results[0].name, results[0].company, results[0]._id, results[0].createdAt;
        //delete first 2 users
        let res1 = yield dbOpsSDTS.removeMany([results[0]._id, results[1]._id]);
        console.log("soft deleted results count : ", res1.deletedCount);
        //2nd 2 remove hard
        let res2 = yield dbOpsSDTS.removeMany([results[2]._id, results[3]._id], true);
        console.log("hard deleted results count : ", res2.deletedCount);
        //try update soft deleted users
        const updatedResults = yield dbOpsSDTS.updateMany(results.map((r, i) => (Object.assign(Object.assign({}, r), { name: "Updated " + i }))));
        console.log("soft delete Updated Results length: ", updatedResults.modifiedCount, updatedResults);
        // try to update soft deleted users by override
        const updatedResults2 = yield dbOpsSDTS.updateMany(results.map((r, i) => ({ _id: r._id, name: "Updated " + i })), {}, true);
        console.log("hard delete Updated Results length: ", updatedResults2.modifiedCount, updatedResults2);
        //
        // paginate results with soft deleted
        const paginatedResults = yield dbOpsSDTS.paginate([], [], {});
        console.log("soft delete -> Paginated Results length: ", paginatedResults.data.length);
        // paginate results without soft deleted
        const paginatedResults2 = yield dbOpsSDTS.paginate([], [], {}, [], {}, true);
        console.log("override soft delete -> Paginated Results length: ", paginatedResults2.data.length);
        const findAndUpdateResults = yield dbOpsSDTS.findAndUpdate({}, {
            name: "Updated Name"
        });
        console.log("soft delete -> Find and Update Results length: ", findAndUpdateResults.modifiedCount);
        //finde with soft deleted
        const foundResults = yield dbOpsSDTS.find({
            deleted: {
                $ne: false
            }
        });
        console.log("soft delete -> Found Results length: ", foundResults.length);
        dbOpsSDTS.getClient().then(e => e.close());
    });
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
];
testSDTS();
//close connection
