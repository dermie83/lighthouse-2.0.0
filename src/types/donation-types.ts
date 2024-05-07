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
    _id: User | string;
  };
  
  export type Lighthouse = {
    title: string;
    towerHeight: number;
    lightHeight: number;
    character: string;
    daymark: string;
    range: number;
    lat: number;
    lng: number;
    groupid: Group | string;
  };