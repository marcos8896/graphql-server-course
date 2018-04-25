const {
  GraphQLObjectType, GraphQLString, GraphQLInt,
  GraphQLSchema, GraphQLList, GraphQLNonNull,
} = require('graphql');


//Customer type.
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  })
});


//Hardcoded data.
const customers = [
  { id: '1', name: 'Juan Doe', email: 'juanito@gmail.com', age: 42 },
  { id: '2', name: 'Estefano Esmeraldez', email: 'estef@gmail.com', age: 32 },
  { id: '3', name: 'Sara Yiyi', email: 'sara@gmail.com', age: 22 },
];


//Root query.
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return customers.find( customer => customer.id == args.id);
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args){
        return customers;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});