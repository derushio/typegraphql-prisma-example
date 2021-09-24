import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { resolvers } from './generated/type-graphql';

const prisma = new PrismaClient();

async function main() {
    const schema = await buildSchema({
        resolvers,
        validate: true,
    });

    const server = new ApolloServer({
        schema,
        context: () => ({ prisma }),
    });

    const listen = await server.listen({
        port: 4000,
    });
    console.log(`🚀  Server ready at ${listen.url}`);
}

main();
