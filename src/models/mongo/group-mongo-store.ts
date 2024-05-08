import { lighthouseMongoStore } from "./lighthouse-mongo-store.js";
import { Group } from "../../types/donation-types.js";
import { GroupMongoose } from "./group.js";

export const groupMongoStore = {
  async getAllGroups(): Promise<Group[]> {
    const groups = await GroupMongoose.find().lean();
    return groups;
  },

  async getGroupById(id:string): Promise<Group | null> {
    if (id) {
      const group = await GroupMongoose.findOne({ _id: id }).lean();
      if (group) {
        group.lighthouses = await lighthouseMongoStore.getLighthousesByGroupId(group._id as any);
      }
      return group;
    }
    return null;
  },

  async addGroup(group:Group): Promise<Group | null> {
    const newGroup = new GroupMongoose(group);
    const groupObj = await newGroup.save();
    return this.getGroupById(groupObj._id);
  },

  async getUserGroups(id:string): Promise<Group[] | null> {
    const group = await GroupMongoose.find({ user_id: id }).lean();
    return this.getGroupById(group);
  },

  async deleteGroupById(id: string){
    try {
      await GroupMongoose.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllGroups() {
    await GroupMongoose.deleteMany({});
  },

  async updateGroup(updatedGroup:Group) {
    const group = await GroupMongoose.findOne({ _id: updatedGroup.user_id });
    group.title = updatedGroup.title;
    group.img = updatedGroup.img;
    await group.save();
  },
};