import axios from "axios";
import { db } from "../models/db.js";
import { LighthouseSpec} from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";
import { Request, ResponseToolkit } from "@hapi/hapi";

export const groupController = {
  index: {
    handler: async function (request:Request, h:ResponseToolkit) {
      const group = await db.groupStore.getGroupById(request.params.id);
      const viewData = {
        title: "Lighthouses",
        group: group,
      };
      return h.view("group-view", viewData);
    },
  },

  addLighthouse: {
    validate: {
      payload: LighthouseSpec,
      options: { abortEarly: false },
      failAction: function (request:Request, h:ResponseToolkit, error:any) {
        return h.view("group-view", { title: "Add Lighthouse error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request:Request, h:ResponseToolkit) {
      const group = await db.groupStore.getGroupById(request.params.id);
      const lighthousePayload = request.payload as any;
      const newLighthouse = {
        title: lighthousePayload.title,
        towerHeight: lighthousePayload.towerHeight,
        lightHeight: lighthousePayload.lightHeight,
        character: lighthousePayload.character,
        daymark: lighthousePayload.daymark,
        range: lighthousePayload.range,
        latitude: lighthousePayload.lat,
        longitude: lighthousePayload.lng,
        image: lighthousePayload.image
      };
      await db.lighthouseStore.addLighthouse(group._id, newLighthouse);
      return h.redirect(`/group/${group._id}`);
    },
  },
  
  deleteLighthouse: {
    handler: async function (request:Request, h:ResponseToolkit) {
      const group = await db.groupStore.getGroupById(request.params.id);
      await db.lighthouseStore.deleteLighthouse(request.params.lighthouseid);
      return h.redirect(`/group/${group._id}`);
    },
  },

  uploadImage: {
    handler: async function (request:Request, h:ResponseToolkit) {
      try {
        const lighthousePayload = request.payload as any;
        const group = await db.groupStore.getGroupById(request.params.id);
        const file = lighthousePayload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(lighthousePayload.imagefile);
          group.img = url;
          await db.groupStore.updateGroup(group);
        }
        return h.redirect(`/group/${group._id}`);
      } catch (err: any) {
        // @ts-ignore
        return h.redirect(`/group/${group._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
};