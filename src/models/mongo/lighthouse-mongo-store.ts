import { Lighthouse, Group } from "../../types/donation-types.js";
import { LighthouseMongoose } from "./lighthouse.js"

export const lighthouseMongoStore = {
  async getAllLighthouses(): Promise<Lighthouse[]> {
    const lighthouses = await LighthouseMongoose.find().lean();
    return lighthouses;
  },

  async getLighthousesByGroupId(id: string): Promise<Lighthouse[] | null> {
    const lighthouses = await LighthouseMongoose.find({ group_id: id as any}).lean();
    if (!lighthouses) {
      return null;
    }
    return lighthouses;
  },

  async addLighthouse(groupId: Group, lighthouse: Lighthouse): Promise<Lighthouse | null> {
    // get the group id
    lighthouse.group_id = groupId;
    // create a new lighthouse object/array
    let newLighthouse = new LighthouseMongoose(lighthouse);
    // save the new lighthouse object/array
    const lighthouseObj = await newLighthouse.save();
    // return the new lighthouse object with new id
    return this.getLighthouseById(lighthouseObj._id);
  },

  async getLighthouseById(id:string): Promise<Lighthouse | null> {
    if (id) {
      const lighthouse = await LighthouseMongoose.findOne({ _id: id }).lean();
      return lighthouse;
    }
    return null;
  },

  async deleteLighthouse(id:string) {
    try {
      await LighthouseMongoose.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllLighthouses() {
    await LighthouseMongoose.deleteMany({});
  },

  async updateLighthouse(id:string, updatedLighthouse:Lighthouse) {
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