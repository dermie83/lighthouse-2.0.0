import { LighthouseMongoose } from "./lighthouse.js";
export const lighthouseMongoStore = {
    async getAllLighthouses() {
        const lighthouses = await LighthouseMongoose.find().lean();
        return lighthouses;
    },
    async getLighthousesByGroupId(id) {
        const lighthouses = await LighthouseMongoose.find({ groupid: id }).lean();
        if (!lighthouses) {
            return null;
        }
        return lighthouses;
    },
    async addLighthouse(groupId, lighthouse) {
        // get the group id
        lighthouse.groupid = groupId;
        // create a new lighthouse object/array
        let newLighthouse = new LighthouseMongoose(lighthouse);
        // save the new lighthouse object/array
        const lighthouseObj = await newLighthouse.save();
        // return the new lighthouse object with new id
        return this.getLighthouseById(lighthouseObj._id);
    },
    async getLighthouseById(id) {
        if (id) {
            const lighthouse = await LighthouseMongoose.findOne({ _id: id }).lean();
            return lighthouse;
        }
        return null;
    },
    async deleteLighthouse(id) {
        try {
            await LighthouseMongoose.deleteOne({ _id: id });
        }
        catch (error) {
            console.log("bad id");
        }
    },
    async deleteAllLighthouses() {
        await LighthouseMongoose.deleteMany({});
    },
    async updateLighthouse(id, updatedLighthouse) {
        const lighthouseDoc = await LighthouseMongoose.findOne({ _id: id });
        lighthouseDoc.title = updatedLighthouse.title;
        lighthouseDoc.lightHeight = updatedLighthouse.lightHeight;
        lighthouseDoc.character = updatedLighthouse.character;
        lighthouseDoc.daymark = updatedLighthouse.daymark;
        lighthouseDoc.range = updatedLighthouse.range;
        lighthouseDoc.lat = updatedLighthouse.lat;
        lighthouseDoc.lng = updatedLighthouse.lng;
        await lighthouseDoc.save();
    },
};
