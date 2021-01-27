import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

// # RUN OUR DATABASE
require('./helper/init-mongo');

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 8080 }, () =>
    console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
);
