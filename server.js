import './models/Users.js';
import './models/quotes.js';
import './httpServer.js';
import jwt from 'jsonwebtoken';
import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';
import { JWT_SECRET } from './config.js';
import { connect } from './connect.js';


connect();

const apolloServer = new ApolloServer({
    typeDefs, resolvers, context: ({ req }) => {
        const { authorization } = req.headers;
        if (authorization) {
            const { userId } = jwt.verify(authorization, JWT_SECRET);
            return { userId };
        }
    }, plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
});



apolloServer.listen().then(({ url }) => {
    console.log("Apollo Server is running at - " + url)
})

