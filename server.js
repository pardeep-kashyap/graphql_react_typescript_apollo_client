import './models/Users.js';
import './models/quotes.js';
import jwt from 'jsonwebtoken';

import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import typeDefs from './schema.js';
import { connect } from './connect.js';

import resolvers from './resolvers.js';
import { JWT_SECRET } from './config.js';


connect();
const server = new ApolloServer({
    typeDefs, resolvers, context: ({ req }) => {
        const { authorization } = req.headers;
        if (authorization) {
            const { userId } = jwt.verify(authorization, JWT_SECRET);
            return { userId };
        }
    }, plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
});

server.listen().then(({ url }) => {
    console.log("Server is running at - " + url)
})