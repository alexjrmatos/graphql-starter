import { ApolloServer, gql } from 'apollo-server';
import fetch from 'node-fetch'

let todo
const typeDefs = gql`
  type Todo {
    userId: Int!
    id: Int!
    title: String!
    completed: Boolean
  }

  type Query {
    todos: [Todo]
  }
`;

const todos = await fetch('https://jsonplaceholder.typicode.com/todos')
todo = await todos.json()

const resolvers = {
  Query: {
    todos: () => todo,
  },
};

import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});