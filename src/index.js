import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import schemaDirectives from './directives';
import config from './config';
import { User } from './models';
import { genNewToken } from './helper/auth';

// # RUN OUR DATABASE
require('./helper/init-mongo');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives,
    context: async ({ req, res }) => {
        let user;

        if (req.headers['x-auth-token'] && req.headers['x-refresh-token']) {
            try {
                const accessToken = req.headers['x-auth-token'];
                const { id } = await jwt.verify(accessToken, config.accessKey);
                user = await User.findById(id);
            } catch (e) {
                const refreshToken = req.headers['x-refresh-token'];
                const newToken = await genNewToken(refreshToken);
                if (newToken.accessToken && newToken.refreshToken) {
                    res.set('Access-Control-Expose-Headers', 'x-auth-token');
                    res.set('x-auth-token', newToken.accessToken);

                    return {
                        me: newToken.user,
                        req,
                        res,
                    };
                }
            }
        }

        return {
            me: user,
            req,
            res,
        };
    },
});

const app = express();

server.applyMiddleware({ app });

app.listen({ port: 8080 }, () =>
    console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
);
