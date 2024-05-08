export type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    _id: string;
  };
  
  export type Group = {
    title: string;
    img: string;
    user_id: User | string;
  };
  
  export interface Lighthouse {
    title: string;
    towerHeight: number;
    lightHeight: number;
    character: string;
    daymark: string;
    range: number;
    lat: number;
    lng: number;
    group_id: Group | string;
  };

  export type Db = {
    userStore: any;
    groupStore: any;
    lighthouseStore: any;
  };