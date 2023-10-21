const PORT = 8080;
const CLIENT = {
  MESSAGE: {
    NEW_USER: 'NEW_USER',
    NEW_MESSAGE: 'NEW_MESSAGE',
    NEW_USER_WITH_TIME:'NEW_USER_WITH_TIME'
  }
};

const SERVER ={
  BROADCAST:{
    NEW_USER_WITH_TIME:'NEW_USER_WITH_TIME',

  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = exports = {
    PORT,
    CLIENT,
    SERVER
  }
}