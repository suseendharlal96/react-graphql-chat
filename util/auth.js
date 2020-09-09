const { PubSub } = require("apollo-server");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = require("../config");

const pubSub = new PubSub();
module.exports = (context) => {
  let token;
  if (context.req && context.req.headers.authorization) {
    token = context.req.headers.authorization.split("Bearer ")[1];
  } else if (context.connection && context.connection.context.Authorization) {
    token = context.connection.context.Authorization.split("Bearer ")[1];
    // console.log(token);
  }

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
      context.loggedUser = decodedToken;
    });
  }
  context.pubSub = pubSub;
  return context;
};
