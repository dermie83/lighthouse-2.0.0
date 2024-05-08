// import { userMemStore } from "./mem/user-mem-store.js";
// import { groupMemStore } from "./mem/group-mem-store.js";
// import { lighthouseMemStore } from "./mem/lighthouse-mem-store.js";
// import { userJsonStore } from "./json/user-json-store.js";
// import { groupJsonStore } from "./json/group-json-store.js";
// import { lighthouseJsonStore } from "./json/lighthouse-json-store.js";
// import { connectMongo } from "./mongo/connect.js";
// import { userMongoStore } from "./mongo/user-mongo-store.js";
// import { groupMongoStore } from "./mongo/group-mongo-store.js";
// import { lighthouseMongoStore } from "./mongo/lighthouse-mongo-store.js";
// import { Db } from "../types/donation-types.js";
import { connectMongo } from "./mongo/connect.js";
export const db = {
    userStore: null,
    groupStore: null,
    lighthouseStore: null,
};
export function connectDb(dbType) {
    switch (dbType) {
        case "mongo":
            connectMongo(db);
            break;
        default:
    }
}
