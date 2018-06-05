const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;
const UserType = require("../types/user_type");

const AuthService = require("../../services/auth");
const { signup, login } = AuthService;

const mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return signup({ email, password, req });
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return login({ email, password, req });
      }
    }
  }
});

module.exports = mutation;