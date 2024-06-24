import { ApolloServer } from '@apollo/server';
import { typeDefs, resolvers } from '@/schema/schema';

type ApolloServerContext = {
  token?: string;
};

const startApolloServer = async () => {
  const server = new ApolloServer<ApolloServerContext>({
    typeDefs,
    resolvers
  });
  await server.start();
  return server;
};

export default startApolloServer;
