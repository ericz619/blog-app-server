import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import typeDefs from './typeDefs';

// # RUN OUR DATABASE
require('./helper/init-mongo');

// Provide resolver functions for your schema fields
const resolvers = {};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 8080 }, () =>
    console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
);
