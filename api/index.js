import { ApolloServer, gql } from 'apollo-server';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  # This "Book" type defines the queryable fields for every book in our data source.

  type User {
    id: Int
    nome: String
    ativo: Boolean
    email: String
    role: Int
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).

  type Query {
    users: [User]
  }
`;

// const data = {
//   "users": [
//     {
//       "id": 2,
//       "nome": "Ana Torre",
//       "ativo": true,
//       "email": "a@a.com",
//       "role": 1
//     },
//     {
//       "id": 2,
//       "nome": "Gabriel Costa",
//       "ativo": true,
//       "email": "g@g.com",
//       "role": 1
//     },
//     {
//       "id": 3,
//       "nome": "Flavia Lins",
//       "ativo": true,
//       "email": "f@f.com",
//       "role": 1
//     },
//     {
//       "id": 4,
//       "nome": "Carlos Marques",
//       "ativo": true,
//       "email": "c@c.com",
//       "role": 2
//     },
//     {
//       "id": 5,
//       "nome": "Silvia Souza",
//       "ativo": true,
//       "email": "s@s.com",
//       "role": 2
//     },
//     {
//       "id": 6,
//       "nome": "Marcia Silva",
//       "ativo": true,
//       "email": "m@m.com",
//       "role": 2
//     }
//   ],
//   "roles": [
//     {
//       "id": 1,
//       "type": "ESTUDANTE"
//     },
//     {
//       "id": 2,
//       "type": "DOCENTE"
//     },
//     {
//       "id": 3,
//       "type": "COORDENACAO"
//     }
//   ]
// }

const users = [
  {
    "id": 1,
    "nome": "Ana Torre",
    "ativo": true,
    "email": "a@a.com",
    "role": 1
  },
  {
    "id": 2,
    "nome": "Gabriel Costa",
    "ativo": true,
    "email": "g@g.com",
    "role": 1
  },
  {
    "id": 3,
    "nome": "Flavia Lins",
    "ativo": true,
    "email": "f@f.com",
    "role": 1
  },
  {
    "id": 4,
    "nome": "Carlos Marques",
    "ativo": true,
    "email": "c@c.com",
    "role": 2
  },
  {
    "id": 5,
    "nome": "Silvia Souza",
    "ativo": true,
    "email": "s@s.com",
    "role": 2
  },
  {
    "id": 6,
    "nome": "Marcia Silva",
    "ativo": true,
    "email": "m@m.com",
    "role": 2
  }
]

const resolvers = {
  Query: {
    users: () => users,
  },
};

import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  /**
   * What's up with this embed: true option?
   * These are our recommended settings for using AS;
   * they aren't the defaults in AS3 for backwards-compatibility reasons but
   * will be the defaults in AS4. For production environments, use
   * ApolloServerPluginLandingPageProductionDefault instead.
  **/
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});