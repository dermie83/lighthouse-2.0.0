export const seedData = {
    users: {
      _model: "User",
      homer: {
        firstName: "Homer",
        lastName: "Simpson",
        email: "homer@simpson.com",
        password: "secret"
      },
      marge: {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@simpson.com",
        password: "secret"
      },
      bart: {
        firstName: "Bart",
        lastName: "Simpson",
        email: "bart@simpson.com",
        password: "secret"
      }
    },
    groups: {
      _model: "Group",
      myTestGroup: {
        title: "Test Group 1",
        img: "http://res.cloudinary.com/dbx8kj5x4/image/upload/v1712088094/erxlob4tqjqne8wfdjr8.jpg",
        user_id: "->users.bart"
      }
    },
    lighthouses: {
      _model : "Lighthouse",
      Lighthouse_1 : {
      title:"Lighthouse 1",
      towerHeight: 35,
      lightHeight: 46,
      character: "Fl(3) W3s",
      daymark: "Painted Black and White",
      range: 23,
      lat: 53.333,
      lng: -7.444,
        group_id: "->groups.myTestGroup"
      },
    }
  };